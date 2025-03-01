"use strict";
//connection between code and ui through web api
//Dom methods and properties are not the part of js. they are part of web api that browser implement and can be accessed from js code
// web api are library written in js and available to use.
// document object is the entry point to the web page
//document.querySelector('.message').textContent = 'Correct Number !';
let secretNumber = generateRandomNumber();

let score = 20;
let highScore = 0;

//function to display message
function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}
function setScore(score) {
  document.querySelector(".score").textContent = score;
}
function setHighScore(highScore) {
  document.querySelector(".highscore").textContent = highScore;
}
function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  if (!guess) {
    displayMessage("⛔ No Number !");
    //When guess is right
  } else if (guess === secretNumber) {
    if (score > highScore) {
      highScore = score;
      setHighScore(highScore);
    }
    displayMessage("🎉 Correct Number !");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    //disable the click button
    document.querySelector(".check").disabled = true;
  } else if (guess != secretNumber) {
    if (score > 0) {
      displayMessage(guess > secretNumber ? "📈 Too High !" : "📉 Too Low !");
      score--;
      setScore(score);
    } else {
      displayMessage("💥 You lost the game !");
      setScore(0);
    }
  }
});

document.querySelector(".again").addEventListener("click", () => {
  score = 20;
  secretNumber = generateRandomNumber();
  displayMessage("Start guessing...");
  setScore(score);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
