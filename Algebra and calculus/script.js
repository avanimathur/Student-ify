const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainerElement = document.getElementById("score-container");
const scoreElement = document.getElementById("right-answer");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  scoreContainerElement.classList.remove("hide");
  setNextQuestion();
  quizScore = 0;
  scoreElement.innerText = `Score: ${quizScore}`;
  scoreElement.classList.remove("correct");
  scoreElement.classList.remove("wrong");
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;  // Disable the button after an answer is selected
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
  if (correct) {
    quizScore++;
    scoreElement.innerText = `Correct! Score: ${quizScore}`;
    scoreElement.classList.add("correct");
    scoreElement.classList.remove("wrong");
  } else {
    scoreElement.innerText = `Wrong! Score: ${quizScore}`;
    scoreElement.classList.add("wrong");
    scoreElement.classList.remove("correct");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the solution to the equation 2𝑥+3=7?",
    answers: [
      { text: " 4", correct: false },
      { text: " 3", correct: false },
      { text: "2", correct: true },
        ],
  },
  {
    question: "What is the value of 𝑥 if 𝑥2=25?",
    answers: [
      { text: "4", correct: false },
      { text: "5", correct: true },
    ],
  },
  {
    question: "What is the derivative of 𝑓(𝑥)=𝑥2?",
    answers: [
      { text: "𝑥", correct: false },
      { text: "2𝑥", correct: true },
      { text: "2𝑥2", correct: false },
    ],
  },

  {
    question: "What is the integral of 𝑓(𝑥)=3𝑥2?",
    answers: [
      { text: "𝑥3+C", correct: true },
      { text: "x3", correct: false },
      { text:"3x3", correct: false },
    ],
  },

  {
    question: "What is the limit of 𝑓(𝑥)=1/𝑥 as 𝑥 approaches 0?.",
    answers: [
      { text: "∞", correct: true },
      { text: "0", correct: false },
    ],
  },

];
