from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Phishing Message Classifier API is running."


def test_predict_spam():
    response = client.post(
        "/predict",
        json={
            "message": "Congratulations! You have won a free prize. Claim now!"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "prediction" in data
    assert "spam_probability" in data

    assert data["prediction"] in ["SPAM", "LEGITIMATE"]

    assert 0 <= data["spam_probability"] <= 1


def test_predict_legitimate():
    response = client.post(
        "/predict",
        json={
            "message": "Hi, are you coming to class today?"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "prediction" in data
    assert "spam_probability" in data

    assert data["prediction"] in ["SPAM", "LEGITIMATE"]

    assert 0 <= data["spam_probability"] <= 1


def test_empty_message():
    response = client.post(
        "/predict",
        json={
            "message": ""
        }
    )

    assert response.status_code == 422


def test_missing_message_field():
    response = client.post(
        "/predict",
        json={}
    )

    assert response.status_code == 422


def test_message_too_long():
    response = client.post(
        "/predict",
        json={
            "message": "A" * 2001
        }
    )

    assert response.status_code == 422