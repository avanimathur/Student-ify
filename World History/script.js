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
    question: "Which ancient civilization is considered the cradle of Western civilization?",
    answers: [
      { text: "Mesopotamia", correct: false },
      { text: "Ancient Egypt", correct: false },
      { text: "Ancient Greece", correct: true },
        ],
  },
  {
    question: "Who was the first emperor of China?",
    answers: [
      { text: "Wu Zetian", correct: false },
      { text: "Qin Shi Huang", correct: true },
    ],
  },
  {
    question: "Which empire was known as the Land of the Rising Sun?",
    answers: [
      { text: "Ottoman Empire", correct: false },
      { text: "Japanese Empire", correct: true },
      { text: "Persian Empire", correct: false },
    ],
  },

  {
    question: "What was the main cause of the fall of the Western Roman Empire?",
    answers: [
      { text: "Barbarian invasions", correct: true },
      { text: "Economic collapse", correct: false },
      { text: "Civil war", correct: false },
    ],
  },

  {
    question: "Who was the famous explorer that discovered America in 1492?",
    answers: [
      { text: "Christopher Columbus", correct: true },
      { text: "Vasco da Gama", correct: false },
      { text: "Marco Polo", correct: false },
      { text: "Ferdinand Magellan", correct: false },
    ],
  },

];
