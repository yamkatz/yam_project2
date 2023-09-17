window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".card");
  const timeTag = document.querySelector(".time b");
  const flipsTag = document.querySelector(".flips b");
  const refreshBtn = document.querySelector(".details button");

  let maxTime = 30;
  let timeLeft = maxTime;
  let flips = 0;
  let matchedCards = 0;
  let disableDeck = false;
  let isPlaying = false;
  let firstCard;
  let secondCard;
  let timer;

  //1)start the game timer
  //2)handle card flips
  //3)check if two flipped cards match
  //4)shuffle and reset the cards for a new game

  const startTimer = () => {
    if (timeLeft <= 0) {
      return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
  };

  const flip = ({ target: clickedCard }) => {
    if (!isPlaying) {
      isPlaying = true;
      timer = setInterval(startTimer, 1000);
    }
    if (clickedCard !== firstCard && !disableDeck && timeLeft > 0) {
      flips++;
      flipsTag.innerText = flips;
      clickedCard.classList.add("flip");
      if (!firstCard) {
        return (firstCard = clickedCard);
      }
      secondCard = clickedCard;
      disableDeck = true;
      let firstCardImg = firstCard.querySelector(".back-view img").src,
        secondCardImg = secondCard.querySelector(".back-view img").src;
      matchCards(firstCardImg, secondCardImg);
    }
  };

  const matchCards = (card1, card2) => {
    if (card1 === card2) {
      matchedCards++;
      if (matchedCards === 6 && timeLeft > 0) {
        return clearInterval(timer);
      }
      firstCard.removeEventListener("click", flip);
      secondCard.removeEventListener("click", flip);
      firstCard = secondCard = "";
      disableDeck = false;
    } else {
      setTimeout(() => {
        firstCard.classList.add("shake");
        secondCard.classList.add("shake");
      }, 400);

      setTimeout(() => {
        firstCard.classList.remove("shake", "flip");
        secondCard.classList.remove("shake", "flip");
        firstCard = secondCard = "";
        disableDeck = false;
      }, 1200);
    }
  };

  const shuffleCards = () => {
    timeLeft = maxTime;
    flips = matchedCards = 0;
    firstCard = secondCard = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let order = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    order.sort(() => (Math.random() > 0.5 ? 1 : -1));

    cards.forEach((card, index) => {
      card.classList.remove("flip");
      let imgTag = card.querySelector(".back-view img");
      setTimeout(() => {
        imgTag.src = `./assets/img-${order[index]}.jpg`;
      }, 500);
      card.addEventListener("click", flip);
    });
  };

  shuffleCards();

  refreshBtn.addEventListener("click", shuffleCards);

  cards.forEach((card) => {
    card.addEventListener("click", flip);
  });
});
