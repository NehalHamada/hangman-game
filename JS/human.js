// let gameName = "Hangman Game";
// document.title = gameName;
// Letters
const letter = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
let lettersArray = Array.from(letter);
// Select Letters Container
let lettersContainer = document.querySelector(".letters");
// generate letters
lettersArray.forEach((letter) => {
  // Create span element
  let span = document.createElement("span");
  // Create letter text node
  let letterText = document.createTextNode(letter);
  // Append the letter text to the span
  span.appendChild(letterText);
  // Add class to the span
  span.className = "letter-box";
  // Append the span to the letters container
  lettersContainer.appendChild(span);
});
// Object of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortan",
    "r",
    "mysql",
    "python"
  ],
  movies: [
    "Prestige",
    "Inception",
    "parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up"
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Gandhi"
  ],
  countries: ["Syria", "Palestine", "Yamen", "Egypt", "Bahrain", "Qatar"]
};
// Get Random Property From Object
let allKeys = Object.keys(words); // bring all keys in object
// Random Number depend on the length of the keys
let randomPropNumber = Math.floor(Math.random() * allKeys.length); // get random number between 0 and the length of the keys
// Category
let randomPropName = allKeys[randomPropNumber];
// Category words
let randomPropValue = words[randomPropName];
// random number depend on words length
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length); // bring random number
// the choosen woed
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letter guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert the choosen word to array
let lettersAndSpace = Array.from(randomValueValue);

//  create spans depend on the choosen word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement("span");
  //  if the letter is space
  if (letter === " ") {
    // Add class to empty span
    emptySpan.className = "with-space"; // add class to the empty span
  }
  // add the empty span to the letters guess container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select the guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// Set Wrong Attempts
let wrongAttemps = 0;
// Select draw element
let theDraw = document.querySelector(".hangman-draw");
// Handle Click on letters
document.addEventListener("click", (e) => {
  // set the choose statue
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked"); // add class to the clicked letter
    // Get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase(); // get the letter in lower case
    // The choosen word
    let theChoosenWord = Array.from(randomValueValue.toLowerCase()); // convert the choosen word to array in lower case
    theChoosenWord.forEach((wordLetter, wordIndex) => {
      // if clicked letter === one of the choosen letter
      if (clickedLetter === wordLetter) {
        // set the status to true
        theStatus = true;
        //  loop on the guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    // check if the letter is not found in the choosen word
    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttemps++;
      // add class wrong to the draw
      theDraw.classList.add(`wrong-${wrongAttemps}`);
      // play fail sound
      document.getElementById("fail").play();
      // check if the wrong attempts is equal to 8
      if (wrongAttemps === 8) {
        endGame();
        // add class finished to the letters container
        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
      if (theStatus === true) {
        // check if the choosen word is completed
        let theChoosenWordSpans = Array.from(
          document.querySelectorAll(".letters-guess span")
        );
        let success = true; // set success to true
        theChoosenWordSpans.forEach((span) => {
          if (span.innerHTML === "") {
            success = false; // set success to false
          }
        });
        // check if the choosen word is completed
        if (success === true) {
          // add class finished to the letters container
          lettersContainer.classList.add("finished");
          // create popup div
          winGame();
        }
      }
    }
  }
});
// Win Game Function
function winGame() {
  // create popup div
  let div = document.createElement("div");
  // create text
  let divText = document.createTextNode(
    `Congratulations You Win, The Word Is ${randomValueValue}`
  );
  // append the text to the div
  div.appendChild(divText);
  // add class to the div
  div.className = "popup";
  // append the div to the body
  document.body.appendChild(div);
}
// End Game Function
function endGame() {
  // create popup div
  let div = document.createElement("div");
  // create text
  let divText = document.createTextNode(
    `Game Over , The Word Is ${randomValueValue}`
  );
  // append the text to the div
  div.appendChild(divText);
  // add class to the div
  div.className = "popup";
  // append the div to the body
  document.body.appendChild(div);
}
