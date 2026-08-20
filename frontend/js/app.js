const messageInput =
    document.getElementById("message");

const analyzeButton =
    document.getElementById("analyze-button");

const characterCount =
    document.getElementById("character-count");

const resultCard =
    document.getElementById("result-card");

const prediction =
    document.getElementById("prediction");

const probability =
    document.getElementById("probability");

const probabilityFill =
    document.getElementById("probability-fill");

const errorMessage =
    document.getElementById("error-message");


const API_URL =
    "http://127.0.0.1:8000/predict";


messageInput.addEventListener(
    "input",
    () => {

        const length =
            messageInput.value.length;

        characterCount.textContent =
            `${length} / 2000`;
    }
);


analyzeButton.addEventListener(
    "click",
    analyzeMessage
);


async function analyzeMessage() {

    const message =
        messageInput.value.trim();


    hideError();


    if (!message) {

        showError(
            "Please enter a message to analyze."
        );

        return;
    }


    analyzeButton.disabled = true;

    analyzeButton.textContent =
        "Analyzing...";


    try {

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Unable to analyze the message."
            );
        }


        displayResult(data);

    } catch (error) {

        showError(
            error.message ||
            "Something went wrong."
        );

    } finally {

        analyzeButton.disabled = false;

        analyzeButton.textContent =
            "Analyze Message";
    }
}


function displayResult(data) {

    resultCard.classList.remove(
        "hidden"
    );


    prediction.textContent =
        data.prediction;


    const percentage =
        data.spam_probability * 100;


    probability.textContent =
        `Spam probability: ${percentage.toFixed(2)}%`;


    probabilityFill.style.width =
        `${percentage}%`;
}


function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.classList.remove(
        "hidden"
    );
}


function hideError() {

    errorMessage.textContent = "";

    errorMessage.classList.add(
        "hidden"
    );
}