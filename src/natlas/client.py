
import json
import os

import requests


ALLOWED_VERDICTS = {"SCAM", "LEGITIMATE"}

ALLOWED_LANGUAGES = {
    "English",
    "Nigerian English",
    "Yoruba",
    "Hausa",
    "Igbo",
}


NTLAS_URL = os.getenv(
    "NTLAS_URL",
    "http://127.0.0.1:8080/v1/chat/completions",
)

NTLAS_MODEL = os.getenv(
    "NTLAS_MODEL",
    r"C:\Users\l2e\Models\N-ATLaS\N-ATLaS-GGUF-Q4_K_M.gguf",
)

SCHEMA_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "data",
    "evaluation",
    "scamshield_schema.json",
)


SYSTEM_PROMPT = """You are ScamShield NG, a Nigerian multilingual scam detection system.

Analyze the user's message for evidence of:
- phishing
- fraud
- financial scams
- credential or OTP theft
- impersonation
- malicious links
- fake prizes or rewards
- loan scams
- account takeover attempts
- threats used to obtain money or sensitive information
- other deliberate social-engineering scams

IMPORTANT CLASSIFICATION RULE:
Do NOT classify a message as SCAM merely because it:
- asks for a favor
- mentions money without deceptive intent
- contains a family or personal request
- contains an ordinary greeting
- asks someone to buy something
- expresses congratulations
- has emotional language

Classify the message as SCAM only when there is meaningful evidence of deceptive, fraudulent, malicious, or coercive intent.

Otherwise classify it as LEGITIMATE.

Identify the actual primary language of the message.
Do not guess the language from the scam category or from another language.
Use the wording and linguistic characteristics of the message itself.

Confidence MUST be a decimal number between 0 and 1.

Return only the requested structured result.
"""


def load_schema():
    with open(SCHEMA_PATH, "r", encoding="utf-8-sig") as file:
        return json.load(file)


def analyze_message(message: str) -> dict:
    if not isinstance(message, str):
        raise TypeError("Message must be a string.")

    if not message.strip():
        raise ValueError("Message cannot be empty.")

    payload = {
        "model": NTLAS_MODEL,
        "messages": [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": message,
            },
        ],
        "temperature": 0.1,
        "max_tokens": 200,
        "stream": False,
        "json_schema": load_schema(),
    }

    response = requests.post(
        NTLAS_URL,
        json=payload,
        timeout=120,
    )

    response.raise_for_status()

    data = response.json()

    content = data["choices"][0]["message"]["content"]

    result = json.loads(content)

    required_fields = {
        "verdict",
        "confidence",
        "scam_type",
        "explanation",
        "user_language",
    }

    missing_fields = required_fields - result.keys()

    if missing_fields:
        raise ValueError(
            f"N-ATLaS response is missing fields: {sorted(missing_fields)}"
        )

    if result["verdict"] not in ALLOWED_VERDICTS:
        raise ValueError(
            f"Invalid verdict: {result['verdict']}"
        )

    if not isinstance(result["confidence"], (int, float)):
        raise ValueError("Confidence must be numeric.")

    if not 0 <= result["confidence"] <= 1:
        raise ValueError(
            f"Confidence must be between 0 and 1, got {result['confidence']}"
        )

    if result["user_language"] not in ALLOWED_LANGUAGES:
        raise ValueError(
            f"Unsupported language: {result['user_language']}"
        )

    if result["verdict"] == "LEGITIMATE":
        result["scam_type"] = "NONE"

    return result
