
import json
import os

import requests


SPACE_URL = os.getenv(
    "NTLAS_SPACE_URL",
    "https://smartroyal-scamshield-natlas-test.hf.space",
).rstrip("/")

HF_TOKEN = os.getenv("HF_TOKEN", "")

ALLOWED_VERDICTS = {"SCAM", "LEGITIMATE"}

ALLOWED_LANGUAGES = {
    "English",
    "Nigerian English",
    "Yoruba",
    "Hausa",
    "Igbo",
}

LANGUAGE_ALIASES = {
    "english": "English",
    "nigerian english": "Nigerian English",
    "nigerian pidgin": "Nigerian English",
    "pidgin": "Nigerian English",
    "yoruba": "Yoruba",
    "hausa": "Hausa",
    "igbo": "Igbo",
}

# These are proxy scores for the model's verbal confidence labels,
# not calibrated probabilities.
CONFIDENCE_SCORES = {
    "high": 0.90,
    "medium": 0.65,
    "low": 0.40,
}


def _headers():
    headers = {"Content-Type": "application/json"}

    if HF_TOKEN:
        headers["Authorization"] = f"Bearer {HF_TOKEN}"

    return headers


def _get_space_result(message: str) -> dict:
    if not HF_TOKEN:
        raise RuntimeError(
            "HF_TOKEN is not configured for the API service."
        )

    headers = _headers()

    # Submit the message and selected-language input to the Space.
    submit_url = (
        f"{SPACE_URL}/gradio_api/call/v2/analyze_message"
    )

    response = requests.post(
        submit_url,
        headers=headers,
        json={"data": [message, "English"]},
        timeout=30,
    )
    response.raise_for_status()

    event_id = response.json().get("event_id")

    if not event_id:
        raise RuntimeError(
            "The N-ATLaS Space did not return an event ID."
        )

    # Read the queued job's server-sent events.
    result_url = (
        f"{SPACE_URL}/gradio_api/call/"
        f"analyze_message/{event_id}"
    )

    with requests.get(
        result_url,
        headers=headers,
        stream=True,
        timeout=(30, 240),
    ) as result_response:
        result_response.raise_for_status()

        event_name = None

        for raw_line in result_response.iter_lines(
            decode_unicode=True
        ):
            if not raw_line:
                event_name = None
                continue

            if raw_line.startswith("event:"):
                event_name = raw_line.split(":", 1)[1].strip()
                continue

            if not raw_line.startswith("data:"):
                continue

            data_text = raw_line.split(":", 1)[1].strip()

            if event_name == "error":
                raise RuntimeError(
                    f"N-ATLaS Space reported an error: {data_text}"
                )

            if event_name != "complete":
                continue

            output = json.loads(data_text)

            # Gradio commonly returns the component outputs as a list.
            if isinstance(output, list) and output:
                output = output[0]

            # Some Spaces return the JSON result as a string.
            if isinstance(output, str):
                output = json.loads(output)

            if not isinstance(output, dict):
                raise ValueError(
                    "The N-ATLaS Space returned an unexpected result."
                )

            return output

    raise TimeoutError(
        "The N-ATLaS Space finished without returning a complete result."
    )


def analyze_message(message: str) -> dict:
    if not isinstance(message, str):
        raise TypeError("Message must be a string.")

    if not message.strip():
        raise ValueError("Message cannot be empty.")

    model_result = _get_space_result(message)

    raw_verdict = str(
        model_result.get("verdict", "")
    ).strip().upper()

    # Never silently label an uncertain result as legitimate.
    if raw_verdict == "UNCERTAIN":
        raise ValueError(
            "N-ATLaS could not confidently classify this message. "
            "Please review it carefully and try again."
        )

    if raw_verdict not in ALLOWED_VERDICTS:
        raise ValueError(
            f"N-ATLaS returned an unsupported verdict: {raw_verdict}"
        )

    raw_language = str(
        model_result.get("language", "")
    ).strip()

    language = LANGUAGE_ALIASES.get(raw_language.lower())

    if language not in ALLOWED_LANGUAGES:
        raise ValueError(
            "N-ATLaS returned an unsupported or unidentified language."
        )

    raw_confidence = model_result.get("confidence")

    if isinstance(raw_confidence, (int, float)):
        confidence = float(raw_confidence)
        if not 0 <= confidence <= 1:
            raise ValueError(
                "N-ATLaS confidence must be between 0 and 1."
            )
    else:
        confidence = CONFIDENCE_SCORES.get(
            str(raw_confidence).strip().lower()
        )

        if confidence is None:
            raise ValueError(
                "N-ATLaS returned an unrecognized confidence value."
            )

    reason = str(
        model_result.get("reason", "")
    ).strip()

    risk_signals = model_result.get("risk_signals", [])

    if not isinstance(risk_signals, list):
        risk_signals = []

    risk_signals = [
        str(signal).strip()
        for signal in risk_signals
        if str(signal).strip()
    ]

    if raw_verdict == "LEGITIMATE":
        scam_type = "NONE"
    else:
        scam_type = (
            "; ".join(risk_signals)
            if risk_signals
            else "Potential scam or phishing"
        )

    explanation = reason or (
        "N-ATLaS completed the message analysis."
    )

    return {
        "verdict": raw_verdict,
        "confidence": confidence,
        "scam_type": scam_type,
        "explanation": explanation,
        "user_language": language,
    }
