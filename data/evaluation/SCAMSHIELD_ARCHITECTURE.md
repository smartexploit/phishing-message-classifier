# ScamShield NG Architecture

## 1. Overview
ScamShield NG is a multilingual scam and phishing detection system designed for Nigerian communication contexts.
It combines a traditional machine-learning baseline with N-ATLaS semantic analysis.

## 2. High-Level Architecture
User message
    |
    v
FastAPI API
    |
    +---- POST /predict ----> TF-IDF + Logistic Regression
    |                              |
    |                              +--> spam probability
    |
    +---- POST /analyze ----> N-ATLaS via llama.cpp
                                   |
                                   +--> verdict
                                   +--> confidence
                                   +--> scam type
                                   +--> explanation
                                   +--> detected language

## 3. Machine-Learning Baseline
- TF-IDF vectorization with unigram and bigram features.
- Logistic Regression classifier.
- Balanced class weighting.
- Existing trained model: models/final_phishing_classifier.joblib
- The baseline provides a lightweight reference point for comparison.

## 4. N-ATLaS Semantic Layer
N-ATLaS is a multilingual Llama-3-based model supporting English, Hausa, Igbo and Yoruba.
The model is served locally through llama.cpp using a Q4_K_M GGUF quantized model.
Structured JSON output is enforced through a JSON schema.

## 5. API Endpoints
- GET / : service information.
- POST /predict : traditional ML classification.
- POST /analyze : multilingual semantic scam analysis.

## 6. Technology Stack
- Python
- FastAPI
- Pydantic
- scikit-learn
- TF-IDF
- Logistic Regression
- N-ATLaS
- llama.cpp
- GGUF Q4_K_M quantization
- Requests

## 7. Evaluation
Controlled evaluation used 10 messages across English, Nigerian English, Yoruba, Hausa and Igbo.
The baseline achieved 70% accuracy.
ScamShield NG achieved 90% accuracy.
This represents a 20 percentage-point improvement on the controlled evaluation.

## 8. Known Limitations
- The controlled evaluation is small and is not a production accuracy estimate.
- One Nigerian English legitimate message was incorrectly classified as SCAM.
- One legitimate Igbo message received an incorrect language label while its verdict remained LEGITIMATE.
- Scam and spam are related but are not identical concepts.
- Larger verified Nigerian multilingual datasets are required for stronger evaluation.

## 9. Future Improvements
- Build a larger verified Nigerian multilingual evaluation dataset.
- Add a dedicated language-identification layer.
- Introduce hybrid decision logic between the baseline and semantic model.
- Evaluate fine-tuning only after sufficient high-quality multilingual data is available.
- Add monitoring, audit logging and stronger production safeguards.
