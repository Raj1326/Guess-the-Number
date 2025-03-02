"use strict";

let secretNumber = generateRandomNumber();
let score1 = 20;
let score2 = 20;
let highScore = 0;
let highScoreName = "";
let guessNumber = 0;
//default player names
let player1 = "";
let player2 = "";
let currentPlayer = 1;

//function to display message
function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

//function to set score
function setScore(score) {
  if (currentPlayer === 1) {
    document.querySelector(".score1").textContent = score;
  } else {
    document.querySelector(".score2").textContent = score;
  }
}

//function to generate random number
function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

//function to set styles
function setStyles(bodyColor, numberWidth) {
  document.querySelector("body").style.backgroundColor = bodyColor;
  document.querySelector(".number").style.width = numberWidth;
}

//function to disable game
function disableGame(disable) {
  document.querySelector(".check").disabled = disable;
  document.querySelector(".guess").disabled = disable;
}

// Show modal
function showModal() {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  document.querySelector("main").classList.add("blurred");
}

// Hide modal
function hideModal() {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  document.querySelector("main").classList.remove("blurred");
}

function setPlayerNames() {
  player1 = document.querySelector(".player1").value;
  player2 = document.querySelector(".player2").value;
  document.querySelector(".player1-name").textContent = player1;
  document.querySelector(".player2-name").textContent = player2;
  document.querySelector(".current-player-name").textContent = player1;
}

document.querySelector(".start").addEventListener("click", () => {
  setPlayerNames();
  if (player1 === "" || player2 === "") {
    document.querySelector(".error").textContent = "⛔ Enter player names !";
    return;
  } else {
    hideModal();
  }
});

// Add event listeners to input fields to remove error message when names are typed
document.querySelector(".player1").addEventListener("input", () => {
  if (
    document.querySelector(".player1").value !== "" &&
    document.querySelector(".player2").value !== ""
  ) {
    document.querySelector(".error").textContent = "";
  }
});

document.querySelector(".player2").addEventListener("input", () => {
  if (
    document.querySelector(".player1").value !== "" &&
    document.querySelector(".player2").value !== ""
  ) {
    document.querySelector(".error").textContent = "";
  }
});

function updateScoreAndMessage(guess) {
  if (currentPlayer === 1) {
    if (score1 > 0) {
      displayMessage(guess > secretNumber ? "📈 Too High !" : "📉 Too Low !");
      score1--;
      setScore(score1);
    } else {
      displayMessage("💥 You lost the game !");
      setScore(0);
    }
  } else {
    if (score2 > 0) {
      displayMessage(guess > secretNumber ? "📈 Too High !" : "📉 Too Low !");
      score2--;
      setScore(score2);
    } else {
      displayMessage("💥 You lost the game !");
      setScore(0);
    }
  }
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    displayMessage("⛔ No Number !");
  } else if (guess === secretNumber) {
    if (currentPlayer === 1 && score1 > highScore) {
      highScore = score1;
      highScoreName = player1;
    } else if (currentPlayer === 2 && score2 > highScore) {
      highScore = score2;
      highScoreName = player2;
    }
    setHighScore(highScore);
    displayMessage("🎉 Correct Number !");
    document.querySelector(".number").textContent = secretNumber;
    setStyles("#60b347", "30rem");
    disableGame(true);
  } else {
    if (guess === guessNumber) {
      displayMessage("⚠️ You already guessed that number!");
    } else {
      updateScoreAndMessage(guess);
      guessNumber = guess;
    }
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.querySelector(".current-player-name").textContent =
    currentPlayer === 1 ? player1 : player2;
  document.querySelector(".guess").value = "";
});

function setHighScore(highScore) {
  document.querySelector(".highscore").textContent = highScore;
  document.querySelector(".highscore-name").textContent = highScoreName;
}

document.querySelector(".again").addEventListener("click", () => {
  score1 = 20;
  score2 = 20;
  secretNumber = generateRandomNumber();
  displayMessage("Start guessing...");
  setScore(score1);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  disableGame(false);
  setStyles("#222", "15rem");
  guessNumber = 0; // Reset the last guessed number
  showModal(); // Show modal to get player names
});

// Prevent clicks inside the modal content from closing the modal
document
  .querySelector(".modal-content")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

// Show modal when the page loads
showModal();
