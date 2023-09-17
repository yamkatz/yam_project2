const Board = document.querySelector(".Board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highScore");
const ctrlBtns = document.querySelectorAll(".ctrlBtns i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5;
let snakeY = 5;
let speedX = 0;
let speedY = 0;
let snakelength = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
//getting the high score from the local storage//

const food = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}; //placing the food in a random place on the board//

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over 🙁🐛 Press OK to play again");
  location.reload();
};

const direction = (e) => {
  if (e.key === "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.key === "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.key === "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.key === "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}; //changes the speed based on which key have been pressed//

ctrlBtns.forEach((button) =>
  button.addEventListener("click", () => direction({ key: button.dataset.key }))
);

const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  //if snake eats the food//
  if (snakeX === foodX && snakeY === foodY) {
    food();
    snakelength.push([foodY, foodX]); //adding the food to the snake's body length//
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("highScore", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }
  snakeX += speedX;
  snakeY += speedY;

  for (let i = snakelength.length - 1; i > 0; i--) {
    snakelength[i] = snakelength[i - 1];
  }
  snakelength[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  } //checks if the snake's head hits the wall, if so setting gameOver to true//

  for (let i = 0; i < snakelength.length; i++) {
    html += `<div class="head" style="grid-area: ${snakelength[i][1]} / ${snakelength[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakelength[0][1] === snakelength[i][1] &&
      snakelength[0][0] === snakelength[i][0]
    ) {
      gameOver = true;
    }
  } //checks if the snake eat's his body, if so set gameOver to true//
  Board.innerHTML = html;
};

food();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", direction);
