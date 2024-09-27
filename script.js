const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const words = [
  "APPLE",
  "BANANA",
  "CHERRY",
  "DOLPHIN",
  "ELEPHANT",
  "FLOWER",
  "GIRAFFE",
  "HAMBURGER",
  "ICECREAM",
  "JACKET",
  "KANGAROO",
  "LEMON",
  "MANGO",
  "NOODLE",
  "OCEAN",
  "PENGUIN",
  "QUILT",
  "RAINBOW",
  "STRAWBERRY",
  "TIGER",
  "UMBRELLA",
  "VIOLIN",
  "WATERMELON",
  "XYLOPHONE",
  "YOGURT",
  "ZEBRA",
];

let randomWord = "";

const letters = document.querySelector(".letters");
const word = document.querySelector(".word");
const hangman = document.querySelector(".hangman");
const head = document.querySelector(".head");
const body = document.querySelector(".body");
const leftArm = document.querySelector(".left-arm");
const rightArm = document.querySelector(".right-arm");
const leftLeg = document.querySelector(".left-leg");
const rightLeg = document.querySelector(".right-leg");
const leftEye = document.querySelector(".left-eye");
const rightEye = document.querySelector(".right-eye");
const wordSpaces = document.querySelector(".word-spaces");
const restart = document.querySelector(".restart");
const message = document.querySelector(".message");

function resetGame() {
  head.style.display = "none";
  body.style.display = "none";
  leftArm.style.display = "none";
  rightArm.style.display = "none";
  leftLeg.style.display = "none";
  rightLeg.style.display = "none";
  leftEye.style.display = "none";
  rightEye.style.display = "none";
  alphabet.forEach((letter) => {
    const p = document.createElement("p");
    letters.appendChild(p);
    p.innerText = letter;
    p.addEventListener("click", (e) => {
      checkLetter(e, p.innerText);
    });
  });
}

function checkLetter(e, letter) {
  const wordLetters = document.querySelectorAll(".letter");
  if (
    e.target.style.color === "green" ||
    e.target.style.color === "red" ||
    rightEye.style.display === "block"
  ) {
    return;
  }
  if (randomWord.includes(letter)) {
    console.log("Correct");
    randomWord.split("").forEach((char, index) => {
      if (char === letter) {
        wordLetters[index].style.opacity = "1";
        e.target.style.color = "green";
        if (
          Array.from(wordLetters).every(
            (letter) => letter.style.opacity === "1"
          )
        ) {
          message.innerText = "You Won!";
        }
      }
    });
  } else {
    console.log("Incorrect");
    hangmanParts();
    e.target.style.color = "red";
  }
}

function hangmanParts() {
  const parts = [
    head,
    body,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    leftEye,
    rightEye,
  ];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].style.display === "none") {
      parts[i].style.display = "block";
      if (parts[parts.length - 1].style.display === "block") {
        message.innerText = "You Lost!";
      }
      return;
    }
  }
}

function setup(randomWord) {
  const wordLength = randomWord.length;
  for (let i = 0; i < wordLength; i++) {
    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    const span = document.createElement("span");
    const spaceText = document.createElement("p");
    wordSpaces.appendChild(letterContainer);
    letterContainer.appendChild(spaceText);
    letterContainer.appendChild(span);
    span.classList.add("space");
    spaceText.classList.add("letter");
    spaceText.innerText = randomWord[i];
    console.log(randomWord[i]);
  }
}

function startGame() {
  resetGame();
  randomWord = words[Math.floor(Math.random() * words.length)];
  setup(randomWord);
  restart.addEventListener("click", () => {
    location.reload();
  });
}

startGame();
