import requests


class ScamShieldError(Exception):
    """Base exception for toolkit errors."""


class ScamShieldClient:
    """Python client for the ScamShield NG REST API."""

    def __init__(self, base_url="https://scamshield-ng-api.onrender.com", timeout=60):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()

    def _post(self, endpoint, message):
        if not isinstance(message, str):
            raise TypeError("message must be a string")
        if not message.strip():
            raise ValueError("message cannot be empty")
        if len(message) > 2000:
            raise ValueError("message cannot exceed 2000 characters")

        try:
            response = self.session.post(
                f"{self.base_url}{endpoint}",
                json={"message": message},
                timeout=self.timeout,
            )
            response.raise_for_status()
        except requests.RequestException as exc:
            raise ScamShieldError(f"API request failed: {exc}") from exc

        try:
            result = response.json()
        except ValueError as exc:
            raise ScamShieldError("API returned invalid JSON") from exc

        if not isinstance(result, dict):
            raise ScamShieldError("API returned an unexpected response format")

        return result

    def predict(self, message):
        """Run the machine-learning classifier."""
        result = self._post("/predict", message)

        prediction = result.get("prediction")
        probability = result.get("spam_probability")

        if prediction not in {"SPAM", "LEGITIMATE"}:
            raise ScamShieldError("API returned an unsupported prediction")

        if (
            isinstance(probability, bool)
            or not isinstance(probability, (int, float))
            or not 0 <= probability <= 1
        ):
            raise ScamShieldError("API returned an invalid spam_probability")

        return {
            "prediction": prediction,
            "spam_probability": float(probability),
        }

    def analyze(self, message):
        """Run N-ATLaS semantic analysis through the API."""
        result = self._post("/analyze", message)
        analysis = result.get("analysis")

        if not isinstance(analysis, dict):
            raise ScamShieldError("API response is missing the analysis object")

        verdict = analysis.get("verdict")
        if verdict not in {"SCAM", "LEGITIMATE"}:
            raise ScamShieldError("API returned an unsupported analysis verdict")

        return analysis

    def close(self):
        """Close the underlying HTTP session."""
        self.session.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.close()
