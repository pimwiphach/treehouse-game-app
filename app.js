//Get the element with the ID of qwerty and save it to a variable.

var qwerty = document.getElementById("qwerty");

//Get the element with the ID of phrase and save it to a variable.

var phrase = document.getElementById("phrase");

//Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed

var missed = 0;

const phraseUl = document.getElementsByTagName("ul")[0];
// phraseUl.innerHTML = "";

//Attach a event listener to the “Start Game” button to hide the start screen overlay.

document.querySelector(".btn__reset").addEventListener("click", function() {
  document.querySelector(".start").style.display = "none";
  missed = 0;
});

//Create a phrases array that contains at least 5 different phrases as strings.

//-----------------------------Phrase array

var phrases = [
  // "JavaScript is fun",
  // "JavaScript is awesome",
  // "Make JavaScript great again",
  // "Coffee and Code",
  // "This is JavaScript"
  "hi"
];

//Create a getRandomPhraseAsArray function.
function getRandomPhraseAsArray(arr) {
  //randomly choose a phrase from the phrases array
  var i = Math.floor(Math.random() * arr.length);
  // split that phrase into a new array of characters.
  var letterArray = arr[i].split("");
  return letterArray;
  console.log(randomPhrase);
}

//-----------------------------Set the game display.
//Create an addPhraseToDisplay function that loops through an array of characters.

//To use the function, you’ll get the value returned by the getRandomPhraseAsArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
// addPhraseToDisplay(['H','e', 'l','l', 'o'])

function addPhraseToDisplay(arr) {
  // const splitArr = arr.split("");
  for (var i = 0; i < arr.length; i++) {
    var createLi = document.createElement("li");
    var character = document.createTextNode(arr[i]);

    createLi.appendChild(character);
    if (arr[i] == " ") {
      createLi.className = "space";
    } else {
      createLi.className = "letter";
    }
    document.getElementsByTagName("ul")[0].appendChild(createLi);
  }
}

//-----------------------------Create a checkLetter function

//-----------------------------Listen for the onscreen keyboard to be clicked
//Start by creating an event listener for the qwerty element that listens for the “click” event.

var found = false;

function checkLetter() {
  var buttons = document.getElementsByTagName("button");
  // var letterFound = null;
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      if (missed < 5) {
        const key = this.innerText;
        // console.log(randomPhrase.toLowerCase(), split('').indexOf(key))
        // console.log(randomPhrase.toLowerCase().split(""));
        const lis = document.getElementsByTagName("li");

        for (j = 0; j < lis.length; j++) {
          const liText = lis[j].innerText;

          if (key == liText.toLocaleLowerCase()) {
            found = true;
            lis[j].classList.add("show");
          }
        }

        if (!found) {
          missed = missed + 1;
          var div = document.getElementById("scoreboard");
          const ol = div.getElementsByTagName("ol")[0];
          const li = ol.getElementsByTagName("li")[0];
          ol.removeChild(li);
        }

        found = false;
        // checkWin();
      } else {
        console.log("no credits");
        // const overlay = document.getElementById("overlay");
        // overlay.classList.add("lose");
        // overlay.style = "display: flex;";
      }
      checkWin();
    });
  }
}

window.addEventListener("load", function() {
  checkLetter();
});

//-----------------------------Create a checkWin function
function checkWin() {
  console.log("checkWin");
  var letter = document.getElementsByClassName("letter").length;
  var show = document.getElementsByClassName("show").length;
  console.log(letter, show);
  const overlay = document.getElementById("overlay");

  if (letter == show) {
    console.log("winner!");

    overlay.classList.add("win");
    overlay.style = "display: flex;";
  }

  if (missed >= 5) {
    console.log("lose !!!");
    overlay.classList.add("lose");
    overlay.style = "display: flex;";
  }
}
