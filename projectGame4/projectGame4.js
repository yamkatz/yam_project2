let whoPlayNow;
let gameOver = false; // Initialize the game over state//

const ifEndGame = () => {
  /*
    1) check vertical
    2) check horizontal
    3) check diagonal
    4) if one of them if true
    4.1) someone won the game
    5) else if the board is full
    5.1) then tekko
  */
  let whoWonTheGame;
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  //check vertical
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      //the first column is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //check horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      //the first column is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //check diagonal
  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    //the first column is equal
    whoWonTheGame = cells[i].innerHTML;
  }
  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    //the first column is equal
    whoWonTheGame = cells[i].innerHTML;
  }
  //check if game end and someone won or tekko
  if (whoWonTheGame) {
    setTimeout(() => {
      alert(`${whoWonTheGame} won the game`);
    }, 500);
    // alert(whoWonTheGame + " won the game");
    gameOver = true;
  } else {
    let isTie = true;
    for (let cell of cells) {
      if (cell.innerHTML === "") {
        isTie = false;
        break;
      }
    }
    if (isTie) {
      setTimeout(() => {
        alert("It's a tie!");
      }, 500);
      gameOver = true;
    }
  }
};

const handleClickXO = (myE) => {
  if (gameOver) {
    return;
  }
  if (myE.target.innerHTML !== "") {
    return;
  }
  myE.target.innerHTML = whoPlayNow;
  whoPlayNow == "x" ? (whoPlayNow = "o") : (whoPlayNow = "x");
  ifEndGame();
};

const newGame = () => {
  whoPlayNow = "x"; // x start first
  gameOver = false;
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  for (let cell of cells) {
    cell.innerHTML = ""; //clear all cells
  }
};

window.addEventListener("load", () => {
  initPageLoad();
  newGame();
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    newGame();
  });
});

const initPageLoad = () => {
  let cells = document.querySelectorAll("#gamerDiv > div");
  for (let myDiv of cells) {
    myDiv.addEventListener("click", handleClickXO);
  }
};

/*
    1) who's playing now
    2) x play first
    3) before check if cell is empty
    4) check if end game and who won or tie
    5) play again
*/
