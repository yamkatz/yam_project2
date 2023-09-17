const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "Mount Everest", correct: true },
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Makalu", correct: false },
    ],
  },
  {
    question: "Which is the largest ocean on Earth?",
    answers: [
      { text: "Arctic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "whic place did Noa Kirel came in at the eurovision?",
    answers: [
      { text: "first", correct: false },
      { text: "fifth", correct: false },
      { text: "ninth", correct: false },
      { text: "third", correct: true },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "Which Disney movie is based on a true story?",
    answers: [
      { text: "101 Dalmatians", correct: false },
      { text: "Lion king", correct: false },
      { text: "Mulan", correct: true },
      { text: "The hunchback of Notredame", correct: false },
    ],
  },
  {
    question: "What animal is 'Sandy' from SphongeBob?",
    answers: [
      { text: "Squirrel", correct: true },
      { text: "Crocodile", correct: false },
      { text: "Starfish", correct: false },
      { text: "Hamster", correct: false },
    ],
  },
  {
    question: "What is the largest species of shark?",
    answers: [
      { text: "Great White Shark", correct: false },
      { text: "Whale Shark", correct: true },
      { text: "Tiger Shark", correct: false },
      { text: "Hammerhead Shark", correct: false },
    ],
  },
  {
    question: "which of the following is not a DC superhero?",
    answers: [
      { text: "Batman", correct: false },
      { text: "Superman", correct: false },
      { text: "Spiderman", correct: true },
      { text: "Aquaman", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};
const resetState = () => {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};
const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
