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
        question: "Who is considered the father of modern management?",
        answers: [
          { text: "Henry Ford", correct: false },
          { text: "Peter Drucker", correct: false },
          { text: "Frederick Winslow Taylor", correct: true },
        ],
      },
      {
        question: "Which management function involves setting objectives and determining a course of action?",
        answers: [
          { text: "Planning", correct: true },
          { text: "Organizing", correct: false },
          { text: "Controlling", correct: false },
        ],
      },
      {
        question: "What is the term for the process of assigning tasks and responsibilities to employees?",
        answers: [
          { text: "Delegation", correct: true },
          { text: "Motivation", correct: false },
          { text: "Coordination", correct: false },
        ],
      },
      {
        question: "Which business structure has the advantage of limited liability for its owners?",
        answers: [
          { text: "Sole Proprietorship", correct: false },
          { text: "Partnership", correct: false },
          { text: "Corporation", correct: true },
        ],
      },
      {
        question: "A SWOT analysis identifies strengths, weaknesses, opportunities, and threats.",
        answers: [
          { text: "True", correct: true },
          { text: "False", correct: false },
        ],
      },
      {
        question: "Which type of leadership style emphasizes teamwork and collaboration?",
        answers: [
          { text: "Autocratic", correct: false },
          { text: "Democratic", correct: true },
          { text: "Laissez-faire", correct: false },
        ],
      },
      {
        question: "What is the primary goal of marketing in business management?",
        answers: [
          { text: "To improve employee satisfaction", correct: false },
          { text: "To meet customer needs profitably", correct: true },
          { text: "To reduce operational costs", correct: false },
        ],
      },
      {
        question: "The process of comparing a company’s performance with industry standards is known as benchmarking.",
        answers: [
          { text: "True", correct: true },
          { text: "False", correct: false },
        ],
      },
      {
        question: "What is the term for the distribution of authority within an organization?",
        answers: [
          { text: "Centralization", correct: false },
          { text: "Decentralization", correct: true },
          { text: "Formalization", correct: false },
        ],
      },
      {
        question: "Which economic concept describes the relationship between supply and demand?",
        answers: [
          { text: "Elasticity", correct: true },
          { text: "Economies of scale", correct: false },
          { text: "Cost-benefit analysis", correct: false },
        ],
      },
      

];