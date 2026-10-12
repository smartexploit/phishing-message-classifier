import unittest
from unittest.mock import Mock, patch

import requests

from scamshield_client import ScamShieldClient, ScamShieldError


class ScamShieldClientTests(unittest.TestCase):
    def setUp(self):
        self.client = ScamShieldClient(base_url="https://example.test")

    def tearDown(self):
        self.client.close()

    @patch("scamshield_client.requests.Session.post")
    def test_predict_success(self, mock_post):
        response = Mock()
        response.json.return_value = {
            "prediction": "SPAM",
            "spam_probability": 0.87,
        }
        mock_post.return_value = response

        result = self.client.predict("Suspicious message")

        self.assertEqual(result["prediction"], "SPAM")
        self.assertEqual(result["spam_probability"], 0.87)
        mock_post.assert_called_once()
        self.assertTrue(mock_post.call_args.args[0].endswith("/predict"))

    @patch("scamshield_client.requests.Session.post")
    def test_analyze_success(self, mock_post):
        response = Mock()
        response.json.return_value = {
            "analysis": {
                "verdict": "SCAM",
                "confidence": 0.9,
                "explanation": "Requests sensitive information",
            }
        }
        mock_post.return_value = response

        result = self.client.analyze("Suspicious message")

        self.assertEqual(result["verdict"], "SCAM")
        self.assertTrue(mock_post.call_args.args[0].endswith("/analyze"))

    def test_rejects_empty_message(self):
        with self.assertRaises(ValueError):
            self.client.predict("   ")

    def test_rejects_non_string_message(self):
        with self.assertRaises(TypeError):
            self.client.analyze(123)

    def test_rejects_message_over_limit(self):
        with self.assertRaises(ValueError):
            self.client.predict("x" * 2001)

    @patch("scamshield_client.requests.Session.post")
    def test_rejects_invalid_prediction(self, mock_post):
        response = Mock()
        response.json.return_value = {
            "prediction": "UNKNOWN",
            "spam_probability": 0.5,
        }
        mock_post.return_value = response

        with self.assertRaises(ScamShieldError):
            self.client.predict("Example")

    @patch("scamshield_client.requests.Session.post")
    def test_handles_http_error(self, mock_post):
        mock_post.side_effect = requests.Timeout("timed out")

        with self.assertRaises(ScamShieldError):
            self.client.predict("Example")


if __name__ == "__main__":
    unittest.main()
