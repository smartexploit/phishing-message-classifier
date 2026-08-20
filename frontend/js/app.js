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

    const interpretation =
    document.getElementById("interpretation");

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
    
    resultCard.classList.add("hidden");



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
    "Analyzing message...";
    }
}


function displayResult(data) {

    resultCard.classList.remove(
        "hidden"
    );


    const percentage =
        data.spam_probability * 100;


    prediction.textContent =
        data.prediction;


    probability.textContent =
        `${percentage.toFixed(2)}%`;


    probabilityFill.style.width =
        `${percentage}%`;


    if (data.prediction === "SPAM") {

        interpretation.textContent =
            "This message shows characteristics commonly associated with spam.";

    } else {

        interpretation.textContent =
            "This message appears consistent with legitimate messages.";
    }
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