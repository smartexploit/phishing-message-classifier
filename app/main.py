from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.predict import classify_message


app = FastAPI(
    title="Phishing Message Classifier API",
    description="Machine-learning API for classifying messages as spam or legitimate.",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MessageRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Message to classify"
    )


@app.get("/")
def root():
    return {
        "message": "Phishing Message Classifier API is running."
    }


@app.post("/predict")
def predict(request: MessageRequest):

    try:
        result = classify_message(request.message)

        return {
    "prediction": result["label"],
    "spam_probability": result["spam_probability"]
}

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="An internal prediction error occurred."
        )