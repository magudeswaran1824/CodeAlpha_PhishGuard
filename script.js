
const questions = [
    {
        question: "1. What is phishing?",
        options: [
            "A programming language",
            "A cyber attack that tricks users",
            "A computer component",
            "An antivirus program"
        ],
        answer: 1,
        explanation: "Phishing tricks people into revealing sensitive information."
    },
    {
        question: "2. What should you do with a suspicious email?",
        options: [
            "Click all its links",
            "Share your password",
            "Verify the sender and report it",
            "Forward it to everyone"
        ],
        answer: 2,
        explanation: "Always verify unexpected messages before taking action."
    },
    {
        question: "3. What does OTP stand for?",
        options: [
            "One-Time Password",
            "Online Transfer Protocol",
            "Open Text Program",
            "Only Trusted Person"
        ],
        answer: 0,
        explanation: "OTP means One-Time Password. Never share it with others."
    },
    {
        question: "4. Which is a common phishing warning sign?",
        options: [
            "Unexpected urgent requests",
            "Normal communication",
            "Expected messages",
            "Regular software updates"
        ],
        answer: 0,
        explanation: "Attackers often use urgency to pressure their victims."
    },
    {
        question: "5. How can you improve account security?",
        options: [
            "Reuse passwords everywhere",
            "Share passwords",
            "Disable security settings",
            "Enable multi-factor authentication"
        ],
        answer: 3,
        explanation: "Multi-factor authentication adds another layer of protection."
    }
];

let currentQuestion = 0;
let totalScore = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextBtn");
const restartButton = document.getElementById("restartBtn");
const resultElement = document.getElementById("result");

function loadQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    document.getElementById("progressText").textContent =
        Math.round(progress) + "%";

    feedbackElement.textContent = "";
    nextButton.hidden = true;
    resultElement.hidden = true;

    answersElement.innerHTML = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    if (selected === current.answer) {
        totalScore++;

        feedbackElement.textContent =
            "✓ Correct! " + current.explanation;

        feedbackElement.style.color = "#4ade80";

    } else {
        feedbackElement.textContent =
            "✗ Incorrect. " + current.explanation;

        feedbackElement.style.color = "#f87171";
    }

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === current.answer) {
            button.style.borderColor = "#22c55e";
            button.style.background = "#14532d";
        } else if (index === selected) {
            button.style.borderColor = "#ef4444";
        }
    });

    nextButton.hidden = false;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "View Results →"
        : "Next Question →";
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = "Quiz Completed! 🎉";

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.hidden = true;

    resultElement.hidden = false;

    document.getElementById("finalScore").textContent =
        `Your Score: ${totalScore}/${questions.length}`;

    let message;

    if (totalScore === 5) {
        message = "Excellent! You have strong phishing awareness.";
    } else if (totalScore >= 3) {
        message = "Good work! Keep improving your cybersecurity knowledge.";
    } else {
        message = "Keep learning! Review the awareness tips and try again.";
    }

    document.getElementById("resultMessage").textContent = message;

    document.getElementById("questionNumber").textContent =
        "Quiz Finished";

    document.getElementById("progressText").textContent = "100%";

    document.getElementById("progressBar").style.width = "100%";
}

function restartQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    loadQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

loadQuestion();
