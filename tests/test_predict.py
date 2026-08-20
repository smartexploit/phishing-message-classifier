import pytest

from src.predict import classify_message


def test_classify_message_returns_valid_label():
    result = classify_message(
        "Congratulations! You won a free prize!"
    )

    assert result["label"] in [
        "SPAM",
        "LEGITIMATE"
    ]


def test_spam_probability_is_valid():
    result = classify_message(
        "Congratulations! You won a free prize!"
    )

    assert 0 <= result["spam_probability"] <= 1


def test_empty_message_is_rejected():
    with pytest.raises(ValueError):
        classify_message("")


def test_non_string_message_is_rejected():
    with pytest.raises(TypeError):
        classify_message(123)