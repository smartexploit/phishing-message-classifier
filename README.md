# ScamShield NG - Multilingual Scam & Phishing Detection

**ScamShield NG** is a multilingual scam and phishing message analysis system designed to explore how traditional machine-learning classification can be combined with local-language semantic analysis for Nigerian communication contexts.

The project began as a conventional SMS spam classifier and has evolved into a security-focused prototype combining:

- Traditional machine learning
- TF-IDF text representation
- Logistic Regression
- FastAPI
- N-ATLaS multilingual semantic analysis
- Local GGUF model inference through llama.cpp
- Structured JSON model outputs
- Controlled multilingual evaluation
- Reproducible evaluation artifacts

> **Important:** ScamShield NG is a research and portfolio prototype. Its evaluation results are not production-level security guarantees.

---

## 1. Why ScamShield NG?

Traditional SMS spam classifiers can perform well on datasets similar to their training data but may struggle with:

- Nigerian English expressions
- Yoruba messages
- Hausa messages
- Igbo messages
- Context-dependent scam language
- Credential and OTP theft attempts
- Financial impersonation
- Fake rewards and prize messages
- Social-engineering language

ScamShield NG therefore explores a two-layer approach:

```text
                    USER MESSAGE
                         |
                         v
                 +---------------+
                 |   FastAPI API  |
                 +-------+-------+
                         |
             +-----------+-----------+
             |                       |
             v                       v
      /predict                  /analyze
             |                       |
             v                       v
       ML Baseline             N-ATLaS
             |                  Semantic
             |                  Analysis
             v                       |
      Spam Probability              v
             |              Structured Result
             |                       |
             +-----------+-----------+
                         |
                         v
                Security Analysis
```

---

# 2. System Architecture

## Machine-Learning Baseline

The original classifier uses a supervised text-classification pipeline:

```text
Raw Message
     |
     v
TF-IDF Vectorization
     |
     v
Logistic Regression
     |
     v
SPAM / LEGITIMATE
     |
     v
Spam Probability
```

The saved model is:

```text
models/final_phishing_classifier.joblib
```

The pipeline uses:

- `TfidfVectorizer`
- Unigram and bigram features
- `LogisticRegression`
- Balanced class weighting

The baseline remains important because it provides a measurable reference point for evaluating the multilingual semantic layer.

---

# 3. N-ATLaS Semantic Layer

ScamShield NG integrates **N-ATLaS**, a multilingual Llama-3-based model supporting:

- English
- Hausa
- Igbo
- Yoruba

The model is served locally using:

```text
llama.cpp
    |
    v
GGUF Q4_K_M
    |
    v
N-ATLaS
```

The quantized model makes local CPU-based experimentation possible on hardware where loading the full-precision 8B model would be impractical.

The N-ATLaS integration analyzes:

- Phishing
- Fraud
- Financial scams
- OTP or credential theft
- Impersonation
- Malicious links
- Fake prizes or rewards
- Loan scams
- Account takeover attempts
- Coercive financial requests
- Other social-engineering patterns

---

# 4. Structured Model Output

The semantic analysis endpoint uses a JSON schema to enforce a predictable response structure.

Example structure:

```json
{
  "verdict": "SCAM",
  "confidence": 0.9,
  "scam_type": "credential or OTP theft",
  "explanation": "The message requests an OTP in connection with a claimed financial reward.",
  "user_language": "Yoruba"
}
```

The schema requires:

```text
verdict
confidence
scam_type
explanation
user_language
```

The schema controls the **format and allowed value types**. It does not guarantee that the model's semantic judgment is correct.

---

# 5. API

## `GET /`

Returns service information and the available analysis services.

## `POST /predict`

Runs the traditional machine-learning classifier.

Request:

```json
{
  "message": "Congratulations! You have won a free prize!"
}
```

Example response:

```json
{
  "prediction": "SPAM",
  "spam_probability": 0.94
}
```

## `POST /analyze`

Runs the N-ATLaS multilingual semantic analysis.

Request:

```json
{
  "message": "E ku oriire! O ti gba owo eye. Fi OTP re ranse lati gba owo naa."
}
```

The endpoint returns a structured security analysis containing the verdict, confidence, scam type, explanation, and detected language.

Interactive API documentation is available through the FastAPI `/docs` endpoint when the application is running.

---

# 6. Controlled Multilingual Evaluation

A controlled evaluation was created to compare the original ML baseline against ScamShield NG.

The evaluation contains:

- English
- Nigerian English
- Yoruba
- Hausa
- Igbo

Each language contains scam and legitimate control examples.

### Results

| System | Correct | Accuracy |
|---|---:|---:|
| Original ML baseline | 7 / 10 | 70% |
| ScamShield NG | 9 / 10 | 90% |

This represents a:

**20 percentage-point improvement**

on this particular controlled evaluation.

An especially important observation was that the original baseline missed all three non-English scam examples in the controlled set, while ScamShield NG detected all three.

These results should **not** be interpreted as production accuracy because the evaluation set is intentionally small and controlled.

Detailed evidence is available in:

```text
data/evaluation/SCAMSHIELD_CONTROLLED_EVALUATION.md
```

Results:

```text
data/evaluation/baseline_controlled_results.csv
data/evaluation/scamshield_controlled_results.csv
```

---

# 7. Independent ExAIS Evaluation

The project also includes an independent evaluation using the ExAIS SMS Spam Dataset.

The evaluation process includes:

```text
External Dataset
       |
       v
Normalization
       |
       v
Baseline Inference
       |
       v
Performance Analysis
       |
       v
Error Analysis
```

The normalized evaluation data and benchmark results are stored under:

```text
data/evaluation/
```

The original downloaded archive and extracted raw source files are intentionally excluded from Git.

This separation helps keep the repository lightweight and distinguishes external source material from project-generated evaluation artifacts.

---

# 8. Important Evaluation Distinction

ScamShield NG uses the term **SCAM** for messages exhibiting meaningful evidence of deceptive, fraudulent, malicious, or coercive intent.

The original ML dataset primarily represents **SPAM versus HAM**.

These concepts overlap but are not identical.

For example:

```text
SPAM
 |
 +-- promotional messages
 +-- unsolicited advertising
 +-- bulk messages
 +-- suspicious marketing

SCAM
 |
 +-- credential theft
 +-- OTP theft
 +-- impersonation
 +-- financial fraud
 +-- fake rewards
 +-- malicious social engineering
```

Therefore, benchmark results must be interpreted according to the dataset and task being evaluated.

---

# 9. Known Limitations

The current prototype has several known limitations.

### Nigerian English false positive

A legitimate Nigerian English financial-transfer message was incorrectly classified as `SCAM` during the controlled evaluation.

### Igbo language identification

One legitimate Igbo message received the correct `LEGITIMATE` verdict but was incorrectly identified as Yoruba.

This demonstrates an important distinction between:

```text
Correct security verdict
```

and:

```text
Correct language identification
```

Both need to be evaluated independently.

### Dataset size

The controlled multilingual benchmark contains only 10 messages.

It is useful for demonstrating system behavior but is not large enough to establish production performance.

### Language coverage

The current N-ATLaS integration focuses on:

- English
- Nigerian English
- Yoruba
- Hausa
- Igbo

Other Nigerian languages are not currently covered by the semantic layer.

### Model limitations

LLM-based analysis can produce incorrect interpretations, especially when messages are ambiguous, abbreviated, deliberately obfuscated, or outside the model's strongest linguistic capabilities.

### Security limitations

The system does not currently perform comprehensive:

- URL reputation analysis
- Domain analysis
- Sender identity verification
- Attachment analysis
- Device intelligence
- Threat-intelligence correlation
- Real-time fraud intelligence

---

# 10. Evaluation Philosophy

ScamShield NG is intentionally being developed around measurable evidence rather than a single accuracy number.

The evaluation strategy is:

```text
Baseline
   |
   v
Controlled Multilingual Tests
   |
   v
Independent Dataset Evaluation
   |
   v
Error Analysis
   |
   v
Identify Weaknesses
   |
   v
Improve Dataset / Architecture
   |
   v
Re-evaluate
```

This makes it possible to distinguish between:

- Model improvement
- Dataset effects
- Language limitations
- False positives
- False negatives
- Semantic failures
- Language-identification failures

---

# 11. Project Structure

```text
phishing-message-classifier/
â”‚
â”œâ”€â”€ app/
â”‚   â””â”€â”€ main.py
â”‚
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ raw/
â”‚   â”œâ”€â”€ processed/
â”‚   â””â”€â”€ evaluation/
â”‚       â”œâ”€â”€ README.md
â”‚       â”œâ”€â”€ SCAMSHIELD_ARCHITECTURE.md
â”‚       â”œâ”€â”€ SCAMSHIELD_CONTROLLED_EVALUATION.md
â”‚       â”œâ”€â”€ scamshield_schema.json
â”‚       â”œâ”€â”€ baseline_controlled_results.csv
â”‚       â”œâ”€â”€ scamshield_controlled_results.csv
â”‚       â”œâ”€â”€ exais_normalized.csv
â”‚       â”œâ”€â”€ exais_baseline_results.json
â”‚       â”œâ”€â”€ parse_exais.py
â”‚       â”œâ”€â”€ run_exais_baseline.py
â”‚       â””â”€â”€ analyze_exais_errors.py
â”‚
â”œâ”€â”€ frontend/
â”‚
â”œâ”€â”€ models/
â”‚   â””â”€â”€ final_phishing_classifier.joblib
â”‚
â”œâ”€â”€ notebooks/
â”‚
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ predict.py
â”‚   â””â”€â”€ natlas/
â”‚       â””â”€â”€ client.py
â”‚
â”œâ”€â”€ tests/
â”‚
â”œâ”€â”€ baseline_check.py
â”œâ”€â”€ requirements.txt
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md
```

---

# 12. Running Locally

## Create an environment

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the project dependencies:

```powershell
pip install -r requirements.txt
```

Run the tests:

```powershell
python -m pytest
```

Start the FastAPI application:

```powershell
python -m uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 13. Running N-ATLaS Locally

ScamShield NG's semantic analysis requires the N-ATLaS model server.

The local architecture is:

```text
ScamShield FastAPI
       |
       | HTTP
       v
llama.cpp server
       |
       v
N-ATLaS GGUF model
```

The model server runs independently from the FastAPI application.

Example:

```text
127.0.0.1:8080
```

The ScamShield API then exposes the semantic analysis through:

```text
POST /analyze
```

The N-ATLaS model files are not stored in this repository.

---

# 14. Technology Stack

## AI / Machine Learning

- Python
- scikit-learn
- NumPy
- Pandas
- TF-IDF
- Logistic Regression
- N-ATLaS
- Llama-3 architecture
- GGUF
- llama.cpp

## Backend

- FastAPI
- Uvicorn
- Pydantic
- Requests

## Frontend

- HTML5
- CSS3
- JavaScript

## Testing

- Pytest
- Controlled multilingual evaluation
- Independent dataset evaluation
- Error analysis

## Development

- Git
- GitHub
- Jupyter Notebook
- PowerShell

## Deployment

The original application is deployed using separate frontend and FastAPI backend services.

---

# 15. Development Evolution

The project evolved through several stages:

```text
Traditional Rule-Based Detection
             |
             v
SMS Spam Machine Learning
             |
             v
FastAPI Deployment
             |
             v
Independent Evaluation
             |
             v
Nigerian Multilingual Evaluation
             |
             v
N-ATLaS Integration
             |
             v
ScamShield NG
```

The goal is not simply to replace the original classifier with an LLM.

Instead, the original model is retained as a measurable baseline while the multilingual semantic layer is evaluated against it.

---

# 16. Future Improvements

Planned improvements include:

1. Build a larger verified Nigerian multilingual evaluation dataset.
2. Add a dedicated language-identification component.
3. Improve Nigerian English handling.
4. Develop hybrid decision logic between the ML baseline and semantic model.
5. Evaluate additional Nigerian languages.
6. Introduce URL and domain intelligence.
7. Add explainable security indicators.
8. Add model and evaluation versioning.
9. Add monitoring and audit logging.
10. Evaluate LoRA or QLoRA fine-tuning after sufficient high-quality multilingual data becomes available.
11. Add larger independent test sets.
12. Evaluate precision, recall, F1, confusion matrices, and per-language performance.

---

# 17. Responsible Use

ScamShield NG is intended for:

- Research
- Education
- Cybersecurity experimentation
- Multilingual AI evaluation
- Portfolio demonstration
- Community-oriented security research

It should not be treated as an autonomous authority for determining whether a communication is safe.

Security decisions should consider additional evidence and, where appropriate, human review.

---

# 18. Author

**Ogunlade Faith Kayode**

AI â€¢ Cybersecurity â€¢ Machine Learning â€¢ Digital Solutions

GitHub: `smartexploit`

---

## Disclaimer

This project is an experimental AI and cybersecurity system.

The reported evaluation results come from specific datasets and controlled tests. They do not represent guaranteed real-world detection performance.

The system may produce false positives and false negatives and should not be used as the sole mechanism for making high-impact security or financial decisions.
