// GAME RULES:
// Guess the phrase by selecting a letter on the screen's keyboard
// You get 5 chances.
// Guess the phrase before you run out of turns!
// Guess 5 wrong letters and you lose the game.

// =================
// Global variables
// =================
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const overlay = document.querySelector("#overlay");
const startButton = document.querySelector(".btn__reset");

const ul = phrase.firstElementChild;
const li = ul.children; // letters in the phrase
const phrasesArr = [
  "javascript is fun",
  "javascript is awesome",
  "make javascript great again",
  "coffee and code",
  "i love javascript"
];

const win = document.createElement("p");
win.classList.add("message");
win.textContent = "Congratulations!!";

const lose = document.createElement("p");
lose.classList.add("message");
lose.textContent = "Bummer! You lost this round. Play again?";

let guessesMissed, letterFound;

// =================================================
// Hide the overlay when the start button is clicked
// =================================================
startButton.addEventListener("click", function() {
  // Game states for overlay
  if (overlay.className === "start") {
    // 1: Start
    overlay.classList.remove("start");
    overlay.style.display = "none";
  } else if (overlay.className === "win") {
    // 2: Win
    overlay.removeChild(win);
    overlay.classList.remove("win");
    overlay.style.display = "none";
  } else if (overlay.className === "lose") {
    // 3: Lose
    overlay.removeChild(lose);
    overlay.classList.remove("lose");
    overlay.style.display = "none";
  }
  // Initialize the game
  init();
});

// ========================
// Generate a random phrase
// ========================
function getRandomPhraseAsArray(arr) {
  // Remove 1 from the array length to get the max number (inclusive)
  const length = arr.length - 1;
  // Generate a random number between 0 and length
  const choose = getRandomNumber(0, length);
  const currentPhrase = arr[choose];
  // Split the phrase into array of individual characters
  const letters = currentPhrase.split("");
  return letters;
}

// ========================
// Generate a random number
// ========================
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ====================
// Set the game display
// ====================
function addPhraseToDisplay(arr) {
  // loop through array of characters
  for (let i = 0; i < arr.length; i++) {
    const letter = arr[i];
    // For each character, create a list item
    const item = document.createElement("li");
    // Put each character inside the list item
    item.textContent = letter;

    // Add the appropriate class to the list items
    if (letter !== " ") {
      item.className = "letter";
    } else {
      item.className = "space";
    }

    // Append the list item to the DOM (specifically to the #phrase ul )
    ul.appendChild(item);
  }
}

// ==========================================================
// Check if the letter chosen matches a letter in the phrase
// ==========================================================
function checkLetter(guessBtn) {
  // Loop through the characters in the phrase
  for (let i = 0; i < li.length; i++) {
    // Make sure a letter is chosen
    if (li[i].classList.contains("letter")) {
      // Check the textContent of the button to see if there's a match
      if (li[i].textContent === guessBtn) {
        // Add the 'show' class
        li[i].classList.add("show");
        // Save the correct guess
        letterFound = guessBtn;
      }
    }
  }

  // Return the matching letter guessed correct;
  // Otherwise, return null for incorrect guess
  return letterFound;
}

// ===============================================
// Check if the number of letters with class “show”
// is equal to the number of letters with class “letters”.
// ===============================================
function checkWin() {
  // Initialize the counters
  // Counter 1 - 'show' class:
  const listItemArray = document.querySelector("ul").children;

  let counterShow = 0;
  for (let i = 0; i < listItemArray.length; i++) {
    // check for the 'show' class
    if (listItemArray[i].classList.contains("show")) {
      counterShow += 1;
    }
  }

  // Counter 2 - 'letter' class:
  let counterLetters = 0;
  for (let i = 0; i < listItemArray.length; i++) {
    // count the number of letters (exclude spaces) in the phrase
    if (listItemArray[i].classList.contains("letter")) {
      counterLetters += 1;
    }
  }
  // console.log(guessesMissed);

  // Check for a win
  if (counterShow === counterLetters) {
    // Wait for the animation to complete
    setTimeout(function() {
      // Display win overlay
      overlay.style.display = "flex";
      overlay.classList.add("win");
      overlay.appendChild(win);
    }, 2000);
  } else {
    // keep playing
    // console.log('checking to see if you won...');
    // console.log(guessesMissed);

    if (guessesMissed < 10) {
      // keep playing
      // console.log('letters shown: ' + counterShow);
      // console.log('letters in phrase: ' + counterLetters);
    } else if (guessesMissed === 10) {
      // Give animation time to finish
      // Disable the rest of the buttons in meantime
      const buttons = document.querySelectorAll("#qwerty button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("disabled", "");
      }

      setTimeout(function() {
        // Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class
        overlay.style.display = "flex";
        overlay.classList.add("lose");
        overlay.appendChild(lose);
      }, 2000);
    }
  }
}

// ==================================
// Listen for clicks to the keyboard
// ==================================
qwerty.addEventListener("click", function(evt) {
  if (evt.target.tagName === "BUTTON") {
    let character = evt.target.textContent;
    evt.target.setAttribute("disabled", "");
    evt.target.classList.add("chosen");
    checkLetter(character);
    if (letterFound === character) {
      // console.log('good job!');
      checkWin();
    } else {
      // remove a try
      // 1: increment the guessesMissed variable
      guessesMissed++;

      // 2: update the DOM - remove a try
      // get the OL
      const scoreboard = document.querySelector("#scoreboard")
        .firstElementChild;

      // get all list items with class 'tries'
      const tries = document.querySelectorAll(".tries");
      scoreboard.removeChild(tries[0]);

      checkWin();
    }
  }
});

// ===============
// Start new game
// ================
function init() {
  guessesMissed = 0;
  // Reset hearts
  const scoreboard = document.querySelector("#scoreboard").firstElementChild;
  const old = document.querySelectorAll(".tries");

  // clear screen
  for (let i = 0; i < old.length; i++) {
    scoreboard.removeChild(old[i]);
  }

  const listItem = document.createElement("li");
  const img = document.createElement("img");
  listItem.classList.add("tries");
  img.style.repeat = "norepeat";
  img.src = "images/liveHeart.png";
  listItem.appendChild(img);

  for (let i = 0; i < 10; i++) {
    scoreboard.appendChild(listItem.cloneNode(true));
  }

  // Reset the keyboard
  const buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled");
    buttons[i].removeAttribute("class", "chosen");
  }

  // Remove the old phrase
  const oldLetters = ul.querySelectorAll("li");
  // Clear old phrase from screen
  for (let i = 0; i < oldLetters.length; i++) {
    ul.removeChild(oldLetters[i]);
  }

  // Generate a random phrase from the array and save the result
  let currentPhraseChar = getRandomPhraseAsArray(phrasesArr);
  // Call the function to add the new random phrase to the DOM
  addPhraseToDisplay(currentPhraseChar);
}

/*---------- Older Version ----------*/

// //Get the element with the ID of qwerty and save it to a variable.

// var qwerty = document.getElementById("qwerty");

// //Get the element with the ID of phrase and save it to a variable.

// var phrase = document.getElementById("phrase");

// //Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed

// var missed = 0;

// const phraseUl = document.getElementsByTagName("ul")[0];
// // phraseUl.innerHTML = "";

// //Attach a event listener to the “Start Game” button to hide the start screen overlay.

// document.querySelector(".btn__reset").addEventListener("click", function() {
//   document.querySelector(".start").style.display = "none";
//   missed = 0;
// });

// //Create a phrases array that contains at least 5 different phrases as strings.

// //-----------------------------Phrase array

// var phrases = [
//   // "JavaScript is fun",
//   // "JavaScript is awesome",
//   // "Make JavaScript great again",
//   // "Coffee and Code",
//   // "This is JavaScript"
//   "hi"
// ];

// //Create a getRandomPhraseAsArray function.
// function getRandomPhraseAsArray(arr) {
//   //randomly choose a phrase from the phrases array
//   var i = Math.floor(Math.random() * arr.length);
//   // split that phrase into a new array of characters.
//   var letterArray = arr[i].split("");
//   return letterArray;
//   console.log(randomPhrase);
// }

// //-----------------------------Set the game display.
// //Create an addPhraseToDisplay function that loops through an array of characters.

// //To use the function, you’ll get the value returned by the getRandomPhraseAsArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:

// const phraseArray = getRandomPhraseAsArray(phrases);
// addPhraseToDisplay(phraseArray);
// // addPhraseToDisplay(['H','e', 'l','l', 'o'])

// function addPhraseToDisplay(arr) {
//   // const splitArr = arr.split("");
//   for (var i = 0; i < arr.length; i++) {
//     var createLi = document.createElement("li");
//     var character = document.createTextNode(arr[i]);

//     createLi.appendChild(character);
//     if (arr[i] == " ") {
//       createLi.className = "space";
//     } else {
//       createLi.className = "letter";
//     }
//     document.getElementsByTagName("ul")[0].appendChild(createLi);
//   }
// }

// //-----------------------------Create a checkLetter function

// //-----------------------------Listen for the onscreen keyboard to be clicked
// //Start by creating an event listener for the qwerty element that listens for the “click” event.

// var found = false;

// function checkLetter() {
//   var buttons = document.getElementsByTagName("button");
//   // var letterFound = null;
//   for (i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", function() {
//       if (missed < 5) {
//         const key = this.innerText;
//         // console.log(randomPhrase.toLowerCase(), split('').indexOf(key))
//         // console.log(randomPhrase.toLowerCase().split(""));
//         const lis = document.getElementsByTagName("li");

//         for (j = 0; j < lis.length; j++) {
//           const liText = lis[j].innerText;

//           if (key == liText.toLocaleLowerCase()) {
//             found = true;
//             lis[j].classList.add("show");
//           }
//         }

//         if (!found) {
//           missed = missed + 1;
//           var div = document.getElementById("scoreboard");
//           const ol = div.getElementsByTagName("ol")[0];
//           const li = ol.getElementsByTagName("li")[0];
//           ol.removeChild(li);
//         }

//         found = false;
//         // checkWin();
//       } else {
//         console.log("no credits");
//         // const overlay = document.getElementById("overlay");
//         // overlay.classList.add("lose");
//         // overlay.style = "display: flex;";
//       }
//       checkWin();
//     });
//   }
// }

// window.addEventListener("load", function() {
//   checkLetter();
// });

// //-----------------------------Create a checkWin function
// function checkWin() {
//   console.log("checkWin");
//   var letter = document.getElementsByClassName("letter").length;
//   var show = document.getElementsByClassName("show").length;
//   console.log(letter, show);
//   const overlay = document.getElementById("overlay");

//   if (letter == show) {
//     console.log("winner!");

//     overlay.classList.add("win");
//     overlay.style = "display: flex;";
//   }

//   if (missed >= 5) {
//     console.log("lose !!!");
//     overlay.classList.add("lose");
//     overlay.style = "display: flex;";
//   }
// }
