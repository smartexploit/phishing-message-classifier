const messageInput = document.getElementById("message");
const analyzeButton = document.getElementById("analyze-button");
const characterCount = document.getElementById("character-count");

const resultCard = document.getElementById("result-card");
const prediction = document.getElementById("prediction");
const probability = document.getElementById("probability");
const interpretation = document.getElementById("interpretation");
const probabilityFill = document.getElementById("probability-fill");
const resultIcon = document.getElementById("result-icon");

const errorMessage = document.getElementById("error-message");

const API_URL = "http://127.0.0.1:8000/predict";
const MAX_LENGTH = 2000;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCharacterCount();

    messageInput.focus();

});


/* =========================================================
   CHARACTER COUNTER
   ========================================================= */

messageInput.addEventListener("input", () => {

    updateCharacterCount();

    hideError();

});


function updateCharacterCount() {

    const length = messageInput.value.length;

    characterCount.textContent =
        `${length} / ${MAX_LENGTH}`;

    if (length >= MAX_LENGTH * 0.9) {

        characterCount.style.color = "#dc2626";

    } else {

        characterCount.style.color = "";

    }
}


/* =========================================================
   KEYBOARD SHORTCUT
   Ctrl + Enter / Cmd + Enter
   ========================================================= */

messageInput.addEventListener("keydown", (event) => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter"
    ) {

        event.preventDefault();

        analyzeMessage();

    }

});


/* =========================================================
   ANALYZE BUTTON
   ========================================================= */

analyzeButton.addEventListener(
    "click",
    analyzeMessage
);


/* =========================================================
   ANALYZE MESSAGE
   ========================================================= */

async function analyzeMessage() {

    const message =
        messageInput.value.trim();


    /* Clear previous errors */

    hideError();


    /* Validate empty message */

    if (!message) {

        showError(
            "Please enter a message to analyze."
        );

        messageInput.focus();

        return;
    }


    /* Validate maximum length */

    if (message.length > MAX_LENGTH) {

        showError(
            `Message is too long. Please keep it under ${MAX_LENGTH} characters.`
        );

        return;
    }


    /* Reset old result */

    resultCard.classList.add("hidden");

    resultCard.classList.remove(
        "spam",
        "legitimate"
    );


    /* Loading */

    setLoadingState(true);


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


        /*
         * Try to read JSON response.
         */

        let data;

        try {

            data = await response.json();

        } catch {

            throw new Error(
                "The server returned an invalid response."
            );

        }


        /*
         * Handle HTTP errors.
         */

        if (!response.ok) {

            throw new Error(
                data?.detail ||
                data?.message ||
                "Unable to analyze the message."
            );

        }


        /*
         * Validate prediction response.
         */

        if (
            !data ||
            !data.prediction
        ) {

            throw new Error(
                "The API returned an incomplete prediction."
            );

        }


        /*
         * Display result.
         */

        displayResult(data);

    }

    catch (error) {

        console.error(
            "Prediction error:",
            error
        );


        /*
         * Friendly network error.
         */

        if (
            error instanceof TypeError &&
            error.message.includes("fetch")
        ) {

            showError(
                "Unable to connect to the classifier API. Make sure your FastAPI server is running on port 8000."
            );

        } else {

            showError(
                error.message ||
                "Something went wrong while analyzing the message."
            );

        }

    }

    finally {

        setLoadingState(false);

    }

}


/* =========================================================
   DISPLAY RESULT
   ========================================================= */

function displayResult(data) {

    /*
     * Show result card
     */

    resultCard.classList.remove(
        "hidden"
    );


    /*
     * Normalize prediction
     */

    const result =
        String(data.prediction)
            .trim()
            .toUpperCase();


    prediction.textContent =
        result;


    /*
     * Convert probability to percentage
     *
     * Expected API value:
     *
     * 0.0 → 1.0
     */

    const probabilityValue =
        Number(data.spam_probability);


    const percentage =
        Number.isFinite(probabilityValue)
            ? probabilityValue * 100
            : 0;


    const safePercentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    /*
     * Display probability
     */

    probability.textContent =
        `${safePercentage.toFixed(2)}%`;


    /*
     * Animate probability bar
     */

    probabilityFill.style.width = "0%";


    requestAnimationFrame(() => {

        probabilityFill.style.width =
            `${safePercentage}%`;

    });


    /*
     * Reset state classes
     */

    resultCard.classList.remove(
        "spam",
        "legitimate"
    );


    /* =====================================================
       SPAM
       ===================================================== */

    if (result === "SPAM") {

        resultCard.classList.add(
            "spam"
        );


        resultIcon.textContent = "!";


        interpretation.textContent =
            "This message contains patterns commonly associated with spam or suspicious communication.";

    }


    /* =====================================================
       LEGITIMATE
       ===================================================== */

    else if (
        result === "LEGITIMATE" ||
        result === "HAM"
    ) {

        resultCard.classList.add(
            "legitimate"
        );


        resultIcon.textContent = "✓";


        interpretation.textContent =
            "This message appears consistent with legitimate communication.";

    }


    /* =====================================================
       UNKNOWN RESULT
       ===================================================== */

    else {

        resultCard.classList.add(
            "legitimate"
        );


        resultIcon.textContent = "?";


        interpretation.textContent =
            "The model returned a classification that the interface does not specifically recognize.";

    }


    /*
     * Scroll to result.
     */

    setTimeout(() => {

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}


/* =========================================================
   LOADING STATE
   ========================================================= */

function setLoadingState(isLoading) {

    analyzeButton.disabled =
        isLoading;


    if (isLoading) {

        analyzeButton.innerHTML = `

            <span class="loading">

                <span class="spinner"></span>

                Analyzing...

            </span>

        `;

    } else {

        analyzeButton.innerHTML = `

            <span>
                Analyze Message
            </span>

            <span class="button-arrow">
                →
            </span>

        `;

    }

}


/* =========================================================
   ERROR HANDLING
   ========================================================= */

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