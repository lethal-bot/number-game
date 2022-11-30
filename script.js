"use strict";
// variables
const player1 = document.querySelector("#player-1");
const player2 = document.querySelector("#player-2");
const play = document.querySelector(".new-game");
const diceRoll = document.querySelector(".roll-dice");
const diceHold = document.querySelector(".hold");
const diceImg = document.querySelector(".dice");
const recentScore1 = document.querySelector(".current-1");
const recentScore2 = document.querySelector(".current-2");
play.addEventListener("click", function () {
  play.textContent = "🔄️ NEW GAME";
});

// rolling of dice
let currentScore = 0;
let activePlayer = 1;
let playing = true;
const scores = [0, 0];
diceRoll.addEventListener("click", function () {
  if (playing) {
    const random = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `./dice ${random}.png`;
    if (random != 1) {
      currentScore += random;
      document.querySelector(`.current-${activePlayer}`).textContent =
        currentScore;
    } else {
      document.querySelector(`.current-${activePlayer}`).textContent = 0;
      activePlayer = activePlayer == 1 ? 2 : 1;
      currentScore = 0;
      player1.classList.toggle("overlay");
      player2.classList.toggle("overlay");
    }
  }
});

diceHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer - 1] += currentScore;
    document.querySelector(`.score-${activePlayer}`).textContent =
      scores[activePlayer - 1];
    document.querySelector(`.current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    if (scores[activePlayer - 1] >= 20) {
      playing = false;
      document.querySelector(`#player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`#player-${activePlayer}`)
        .classList.remove("overlay");
    } else {
      activePlayer = activePlayer == 1 ? 2 : 1;
      player1.classList.toggle("overlay");
      player2.classList.toggle("overlay");
    }
  }
});
