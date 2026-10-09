
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.predict import classify_message
from src.natlas.client import analyze_message


app = FastAPI(
    title="ScamShield NG API",
    description=(
        "Multilingual scam and phishing analysis API combining "
        "a machine-learning baseline with N-ATLaS semantic analysis."
    ),
    version="2.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://phishing-message-classifier-1.onrender.com",
],
    
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MessageRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Message to analyze",
    )


@app.get("/")
def root():
    return {
        "message": "ScamShield NG API is running.",
        "version": "2.0.0",
        "services": [
            "machine-learning-baseline",
            "N-ATLaS multilingual analysis",
        ],
    }


@app.post("/predict")
def predict(request: MessageRequest):
    """
    Existing machine-learning classification endpoint.
    Preserved for backward compatibility.
    """

    try:
        result = classify_message(request.message)

        return {
            "prediction": result["label"],
            "spam_probability": result["spam_probability"],
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="An internal prediction error occurred.",
        )


@app.post("/analyze")
def analyze(request: MessageRequest):
    """
    N-ATLaS multilingual semantic scam analysis endpoint.
    """

    try:
        result = analyze_message(request.message)

        return {
            "analysis": result,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error),
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="An internal N-ATLaS analysis error occurred.",
        )
