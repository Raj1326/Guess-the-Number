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
//function to set score
function setScore(score) {
  document.querySelector(".score").textContent = score;
}
//function to set highscore
function setHighScore(highScore) {
  document.querySelector(".highscore").textContent = highScore;
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
    setStyles("#60b347", "30rem");
    //disable the click button
    disableGame(true);
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
  disableGame(false);
  setStyles("#222", "15rem");
});
