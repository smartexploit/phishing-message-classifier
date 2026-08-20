# Phishing Message Classifier

A machine-learning web application that classifies text messages as either **SPAM** or **LEGITIMATE**.

This project was built as a personal portfolio project while learning Machine Learning, Traditional Programming, API development, testing, and application security.

---

## Project Overview

Spam and phishing-style messages are common examples of unwanted or potentially harmful digital communication.

The goal of this project is to demonstrate how traditional rule-based programming can be compared with a machine-learning approach for text classification.

The final application allows a user to enter a message through a web interface and receive an ML-based classification.

---

## Objectives

The project was designed to:

- Explore and preprocess a real-world SMS dataset.
- Build a traditional rule-based classification baseline.
- Build a machine-learning text classifier.
- Compare traditional programming with machine learning.
- Evaluate the ML model using standard classification metrics.
- Expose the trained model through a FastAPI backend.
- Build a browser-based frontend.
- Connect the frontend to the prediction API.
- Write automated tests.
- Apply basic API security and input validation practices.

---

## Application Architecture

```text
                    USER
                      |
                      v
             +----------------+
             |    FRONTEND    |
             | HTML/CSS/JS    |
             +-------+--------+
                     |
                     | POST /predict
                     v
             +----------------+
             |    FASTAPI     |
             |    Backend     |
             +-------+--------+
                     |
                     v
             +----------------+
             | Prediction API |
             +-------+--------+
                     |
                     v
             +----------------+
             |  ML Pipeline   |
             | TF-IDF + Model |
             +-------+--------+
                     |
                     v
             SPAM / LEGITIMATE

             Dataset

The project uses the SMS Spam Collection dataset.

The dataset contains labeled SMS messages classified as spam or legitimate (ham).

The dataset was used for:

Exploratory data analysis
Text preprocessing
Model training
Model evaluation
Traditional Programming Approach

Before implementing machine learning, a rule-based baseline was developed.

The traditional approach relies on manually defined patterns and rules that attempt to identify suspicious messages.

Examples of rule signals include:

Suspicious keywords
Promotional language
Urgency
Prize/reward language
Suspicious call-to-action patterns
Limitation

Rule-based systems depend heavily on manually created rules.

A message that does not match an existing rule can easily be missed.

This motivated the machine-learning approach.

Machine Learning Approach

The machine-learning classifier treats the problem as a supervised text-classification task.

The general pipeline is:

Raw Message
     |
     v
Text Preprocessing
     |
     v
TF-IDF Vectorization
     |
     v
Machine Learning Model
     |
     v
Prediction
     |
     +----> SPAM
     |
     +----> LEGITIMATE

The project uses TF-IDF to convert text into numerical features and a classification model to make predictions.

Model Evaluation

The model was evaluated using:

Accuracy
Precision
Recall
F1-score
Confusion Matrix

These metrics were selected because accuracy alone does not provide enough information for a classification problem.

In particular, precision and recall help evaluate the consequences of incorrect classifications.

Backend

The backend was built using FastAPI.

Endpoint
POST /predict
Request
{
  "message": "Congratulations! You have won a free prize!"
}
Response
{
  "prediction": "SPAM",
  "spam_probability": 0.94
}

The exact probability returned depends on the trained model.

Frontend

The frontend was built using:

HTML
CSS
JavaScript

The interface allows users to:

Enter a message.
Submit the message for analysis.
Receive the ML classification.
View the estimated spam probability.
View an interpretation of the result.
Testing

Automated tests were written using pytest.

The test suite covers:

Prediction functionality
API availability
Valid prediction requests
Empty input validation
Message length validation
API response structure

Current test status:

7 passed
Security Considerations

The project includes basic security-oriented practices such as:

Input length validation.
Request schema validation.
Controlled CORS configuration.
Separation between frontend and backend.
Generic internal server error messages.
Avoidance of unnecessary data in API responses.
Validation of malformed requests.

CORS is restricted to the local frontend origin during development.

Limitations

This project is an educational machine-learning application and should not be treated as a definitive phishing detection system.

Potential limitations include:

False positives
False negatives
Dataset bias
Limited training data
Changing phishing techniques
Adversarial or deliberately manipulated messages
Lack of contextual information about URLs, domains, senders, and attachments

A production-grade phishing detection system would require additional signals and stronger security controls.

Project Structure
phishing-message-classifier/
│
├── app/
│   └── main.py
│
├── data/
│   ├── raw/
│   └── processed/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── models/
│
├── notebooks/
│   ├── 01_dataset_exploration.ipynb
│   ├── 02_traditional_baseline.ipynb
│   └── 03_machine_learning_baseline.ipynb
│
├── src/
│   ├── __init__.py
│   ├── predict.py
│   ├── preprocessing.py
│   └── train.py
│
├── tests/
│   ├── test_predict.py
│   └── test_api.py
│
├── .gitignore
├── README.md
└── requirements.txt
Running the Project Locally
1. Clone the repository
git clone <your-repository-url>
cd phishing-message-classifier
2. Create a virtual environment
python -m venv .venv
3. Activate the environment

Windows PowerShell:

.\.venv\Scripts\Activate.ps1
4. Install dependencies
pip install -r requirements.txt
5. Run the tests
python -m pytest
6. Start the FastAPI server
python -m uvicorn app.main:app --reload

The API will be available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs
7. Run the frontend

Open the frontend using a local development server such as VS Code Live Server.

The frontend communicates with:

http://127.0.0.1:8000/predict
Technologies
Python
Pandas
NumPy
Scikit-learn
Joblib
FastAPI
Pydantic
Uvicorn
Pytest
HTML
CSS
JavaScript
Jupyter Notebook
Git/GitHub
Future Improvements

Possible future improvements include:

Deploying the frontend and API.
Adding authentication and rate limiting.
Improving model performance.
Experimenting with additional classification algorithms.
Adding URL and domain analysis.
Adding explainable-AI features.
Adding a larger and more diverse dataset.
Adding monitoring and logging.
Building a more advanced security-analysis pipeline.
Disclaimer

This project is intended for educational and portfolio purposes.

The model's output is a machine-learning prediction and should not be considered a definitive security verdict.


Save:

```text
Ctrl + S