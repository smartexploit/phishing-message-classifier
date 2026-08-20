import os
import joblib


MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "models",
    "final_phishing_classifier.joblib"
)


model = joblib.load(MODEL_PATH)


def classify_message(message):
    """
    Classify a message as legitimate or spam.

    Returns:
        dict: prediction label and spam probability.
    """

    if not isinstance(message, str):
        raise TypeError("Message must be a string.")

    if not message.strip():
        raise ValueError("Message cannot be empty.")

    prediction = model.predict([message])[0]

    probability = model.predict_proba([message])[0][1]

    label = "SPAM" if prediction == 1 else "LEGITIMATE"

    return {
        "label": label,
        "spam_probability": float(probability)
    }