# Phishing Message Classifier

A machine-learning web application that classifies text messages as either **SPAM** or **LEGITIMATE**.

This project was built as a personal portfolio project while learning Machine Learning, Traditional Programming, API development, testing, and application security.

---

## 🚀 Live Demo

### Live Frontend

**https://phishing-message-classifier-1.onrender.com**

The production web interface allows users to enter a message and receive a machine-learning classification directly from the browser.

### Live Backend API

**https://phishing-message-classifier.onrender.com**

### Interactive API Documentation

**https://phishing-message-classifier.onrender.com/docs**

The deployed FastAPI backend provides interactive Swagger documentation for testing the API.

### Source Code

**https://github.com/smartexploit/phishing-message-classifier**

---

## 📌 Project Overview

Spam and phishing-style messages are common examples of unwanted or potentially harmful digital communication.

The goal of this project is to demonstrate how traditional rule-based programming can be compared with a machine-learning approach for text classification.

The final application allows a user to enter a message through a web interface and receive an ML-based classification.

---

## 🎯 Objectives

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
- Deploy the frontend and backend to the cloud.

---

## 🏗️ Application Architecture

```text
                         USER
                           |
                           v
              +-------------------------+
              |     RENDER FRONTEND     |
              |    HTML / CSS / JS      |
              +------------+------------+
                           |
                           | HTTPS
                           | POST /predict
                           v
              +-------------------------+
              |      RENDER BACKEND     |
              |         FastAPI         |
              +------------+------------+
                           |
                           v
              +-------------------------+
              |    Prediction Pipeline  |
              |     TF-IDF + ML Model   |
              +------------+------------+
                           |
                           v
                    SPAM / LEGITIMATE

🎬 Demo

The application provides a browser-based interface for submitting messages and receiving machine-learning classifications.

Spam Classification

Legitimate Classification

FastAPI Documentation

Automated Tests

📊 Dataset

The project uses the SMS Spam Collection dataset.

The dataset contains labeled SMS messages classified as spam or legitimate (ham).

The dataset was used for:

Exploratory data analysis
Text preprocessing
Model training
Model evaluation
Traditional programming baseline development
🧠 Traditional Programming Approach

Before implementing machine learning, a rule-based baseline was developed.

The traditional approach relies on manually defined patterns and rules that attempt to identify suspicious messages.

Examples of rule signals include:

Suspicious keywords
Promotional language
Urgency
Prize or reward language
Suspicious call-to-action patterns
Limitation

Rule-based systems depend heavily on manually created rules.

A message that does not match an existing rule can easily be missed.

This motivated the machine-learning approach.

🤖 Machine Learning Approach

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

The trained model is saved as:

models/final_phishing_classifier.joblib
📈 Model Evaluation

The model was evaluated using:

Accuracy
Precision
Recall
F1-score
Confusion Matrix

These metrics were selected because accuracy alone does not provide enough information for a classification problem.

In particular, precision and recall help evaluate the consequences of incorrect classifications.

⚙️ Backend

The backend was built using FastAPI.

API Endpoint
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

API Base URL
https://phishing-message-classifier.onrender.com
Interactive Documentation
https://phishing-message-classifier.onrender.com/docs
🌐 Frontend

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
Receive validation and error messages.

The production frontend communicates with the deployed FastAPI backend through HTTPS.

🧪 Testing

Automated tests were written using pytest.

The test suite covers:

Prediction functionality
API availability
Valid prediction requests
Empty input validation
Message length validation
API response structure
Current Test Status
7 passed

Tests can be executed locally with:

python -m pytest
🔐 Security Considerations

The project includes basic security-oriented practices such as:

Input length validation.
Request schema validation.
Controlled CORS configuration.
Separation between frontend and backend.
Generic internal server error messages.
Avoidance of unnecessary data in API responses.
Validation of malformed requests.

The API restricts accepted frontend origins through CORS configuration.

The application is intended as an educational project and does not claim to provide production-grade phishing protection.

⚠️ Limitations

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

📁 Project Structure
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
│   └── final_phishing_classifier.joblib
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
💻 Running the Project Locally
1. Clone the Repository
git clone https://github.com/smartexploit/phishing-message-classifier.git
cd phishing-message-classifier
2. Create a Virtual Environment
python -m venv .venv
3. Activate the Environment
Windows PowerShell
.\.venv\Scripts\Activate.ps1
4. Install Dependencies
pip install -r requirements.txt
5. Run the Tests
python -m pytest
6. Start the FastAPI Server
python -m uvicorn app.main:app --reload

The API will be available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs
7. Run the Frontend

Open the frontend/index.html file using a local development server such as VS Code Live Server.

During local development, the frontend communicates with:

http://127.0.0.1:8000/predict
☁️ Deployment

The application is deployed as two separate Render services:

A Static Site for the frontend.
A Web Service for the FastAPI backend.
🌐 Live Frontend
https://phishing-message-classifier-1.onrender.com

The frontend provides the user interface for submitting messages and displaying classification results.

🔌 Live Backend API
https://phishing-message-classifier.onrender.com
Prediction Endpoint
POST https://phishing-message-classifier.onrender.com/predict
API Documentation
https://phishing-message-classifier.onrender.com/docs
🏗️ Production Architecture
                         USER
                           |
                           v
              +-------------------------+
              |     Render Frontend     |
              | HTML / CSS / JavaScript |
              +------------+------------+
                           |
                           | HTTPS
                           | POST /predict
                           v
              +-------------------------+
              |     Render Backend      |
              |         FastAPI         |
              +------------+------------+
                           |
                           v
              +-------------------------+
              |   Prediction Pipeline   |
              |   TF-IDF + ML Model     |
              +------------+------------+
                           |
                           v
                    SPAM / LEGITIMATE
⚙️ Deployment Configuration
Frontend

The frontend is deployed as a Render Static Site.

Service Type: Static Site
Root Directory: frontend
Build Command: None
Publish Directory: .
Backend

The backend is deployed as a Render Web Service.

Service Type: Web Service
Root Directory: .
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

The backend uses the trained model stored at:

models/final_phishing_classifier.joblib

The production frontend communicates with the deployed API rather than the local development server.

🔄 Production API Flow
Browser
   |
   | HTTPS POST /predict
   | { "message": "..." }
   v
FastAPI
   |
   v
classify_message()
   |
   v
Trained ML Model
   |
   v
Prediction + Spam Probability
   |
   v
Frontend Result

The deployed application was tested end-to-end to verify communication between the frontend, FastAPI backend, and machine-learning model.

🛠️ Technologies Used
Machine Learning
Python
Scikit-learn
NumPy
Pandas
Joblib
TF-IDF Vectorization
Backend
FastAPI
Uvicorn
Pydantic
Frontend
HTML5
CSS3
JavaScript
Testing
Pytest
Deployment
Render
GitHub
Development
Jupyter Notebook
Git
GitHub
🚀 Future Improvements

Possible future improvements include:

Adding authentication and rate limiting.
Improving model performance.
Experimenting with additional classification algorithms.
Adding URL and domain analysis.
Adding explainable-AI features.
Adding a larger and more diverse dataset.
Adding monitoring and logging.
Building a more advanced security-analysis pipeline.
Adding confidence thresholds for classification.
Improving the frontend with richer security insights.
Adding model versioning and performance monitoring.
Integrating additional phishing indicators such as suspicious URLs, domains, and sender information.
📚 Learning Outcomes

This project provided practical experience in:

Data exploration and preprocessing.
Supervised machine learning.
Text classification.
TF-IDF feature engineering.
Model evaluation.
Traditional rule-based programming.
REST API development.
FastAPI application development.
Frontend and backend integration.
API validation.
CORS configuration.
Automated testing.
Git and GitHub workflows.
Cloud deployment.
Basic application security practices.
⚖️ Disclaimer

This project is intended for educational and portfolio purposes.

The model's output is a machine-learning prediction and should not be considered a definitive security verdict.

Users should not rely solely on this classifier when determining whether a message is safe, malicious, or fraudulent.

👤 Author

Ogunlade Faith Kayode

Machine Learning • AI • Cybersecurity • Digital Solutions

GitHub:

https://github.com/smartexploit

Project Repository:

https://github.com/smartexploit/phishing-message-classifier