"use strict"

// GLOBAL VARIABLES
var flips = 0;
var turns = 0;
var animalSet = ['Cat', 'Dog', 'Bat', 'Mouse', 'Owl', 'Fish', 'Turtle', 'Sloth'];
document.createElement("img");

var symbolSet = ['!', '@', '#', '$', '%', '^', '&', '*'];
var numSymbols = 0;
var matches = 0;
var cards = []
var flippedCardsThisTurn = []


window.addEventListener("load", function() {
  // create and hide winning screen on load
  var winningScreen = document.createElement("div")
  var winningScreen2 = document.createElement("div")
  winningScreen.classList.add("winningScreen")
  winningScreen2.classList.add("winningScreenButton")
  winningScreen.setAttribute("id", "winningScreen")
  winningScreen.innerHTML = `You Won!`
  var playAgainButton = document.createElement("button")
  playAgainButton.innerHTML = "Play Again"
  playAgainButton.addEventListener("click", resetGame)
  winningScreen2.appendChild(playAgainButton)
  winningScreen.style.display = "none";
  winningScreen2.style.display = "none";
  winningScreen2.setAttribute("id", "winningScreenButton")

  document.body.appendChild(winningScreen)
  document.body.appendChild(winningScreen2)

  // add button
  var animalsButton = document.createElement("button");
  animalsButton.innerHTML = "Match Animals";
  animalsButton.addEventListener("click", function() {
    symbolSet = animalSet;
    startGame()
  })

  var symbolsButton = document.getElementById("startButton");
  symbolsButton.innerHTML = "Match Symbols";
  symbolsButton.addEventListener("click", function() {
    symbolSet = ['!', '@', '#', '$', '%', '^', '&', '*'];
    startGame()
  })

  document.getElementById("startForm").appendChild(animalsButton)
})


// =============================================== START GAME LOGIC ===============================================

function startGame() {

  // get user input
  numSymbols = document.getElementById("numSymbols").value;
  matches = document.getElementById("numSymbols").value;

  if (numSymbols > 8) {
    numSymbols = 8;
  }

  // hide start form
  document.getElementById("startForm").style.display = "none";
  generateGameBoard(numSymbols);
}


// =============================================== CREATE GAME BOARD ===============================================

function generateGameBoard(numSymbols) {
  var symbolsCurrentGame = generateSymbolsForCurrentGame(numSymbols);

  var gameBoard = document.createElement("div");
  gameBoard.classList.add("gameBoard");

  var turnCounter = document.createElement("div");
  turnCounter.classList.add("turnCounter");

  var resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset Game";
  resetButton.classList.add("resetButton");
  resetButton.addEventListener("click", resetGame);

  document.getElementsByClassName("turnCounter").innerHTML = "Turns: " + turns;
  turnCounter.innerHTML = "Turns: " + turns;

  var headerContainer = document.createElement("div");
  headerContainer.classList.add("headerContainer");
  headerContainer.appendChild(turnCounter);
  headerContainer.appendChild(resetButton);

  document.body.appendChild(headerContainer);
  document.body.appendChild(gameBoard);

  createCards(numSymbols, symbolsCurrentGame);
  var shuffledCards = shuffleCards(cards);
  shuffledCards.forEach((item) => gameBoard.appendChild(item))

}

function generateSymbolsForCurrentGame(numSymbols) {
  var tempSymbols = [];

  // get random symbol and push it onto tempSymbols list
  for (var i = 0; i < numSymbols; i++) {
    var symbolToAdd = getRandomSymbolFromSet(symbolSet)
    tempSymbols.push(symbolToAdd);

    // remove the symbol from the list so each symbol is only used once
    symbolSet.splice(symbolSet.indexOf(symbolToAdd), 1);
  }
  return tempSymbols;
}

// get random symbol
function getRandomSymbolFromSet (list) {
  return list[Math.floor((Math.random()*list.length))];
}

function createCards(numSymbols, symbolsCurrentGame) {
  // create 2 cards for each symbol using each symbol only once
  for (var i = 0; i < numSymbols; i++) {
    var card = document.createElement("div");
    var card2 = document.createElement("div");

    // add class to card
    card.classList.add("card");
    // add listener to card
    card.addEventListener("click", function() {
      this.classList.add("flipped");
      flippedCardsThisTurn.push(this.id)
      flipCards()
    })

    card2.classList.add("card");

    // do I care about ids?
    card.setAttribute("id", i)
    card2.setAttribute("id", i + 10)

    card2.addEventListener("click", function() {
      this.classList.add("flipped");
      flippedCardsThisTurn.push(this.id)
      flipCards()
    })

    var pElement = document.createElement("p")
    var pElement2 = document.createElement("p")
    // put symbol on card
    pElement.innerHTML = symbolsCurrentGame[i];
    // pElement.classList.add(symbolsCurrentGame[i])
    pElement2.innerHTML = symbolsCurrentGame[i];
    card.appendChild(pElement)
    card2.appendChild(pElement2)

    // add cards to array
    cards.push(card);
    cards.push(card2);
  }

}

// shuffle cards
function shuffleCards(cards) {
  var shuffledCards = [];

  while (cards.length > 0) {
    var randomIndex = Math.floor(Math.random() * cards.length);
    shuffledCards.push(cards[randomIndex]);
    cards.splice(randomIndex, 1);
  }

  return shuffledCards
}

// =============================================== MANAGE GAME LOGIC ===============================================

// Each turn, user flips 2 cards. On second flip, check for match. If match, keep cards flipped. If no match, flip cards back over.
// If all cards are flipped, user wins.
function flipCards() {
  // increment flips each time called
  flips++
  // check if 2 cards are flipped
  if (flips === 2) {
    turns++
    checkForMatch();

    // reset flips
    flips = 0;
  }
}

// check for match
function checkForMatch(card1, card2) {
  // find the flipped card elements
  var flipped1 = document.getElementById(flippedCardsThisTurn[0])
  var flipped2 = document.getElementById(flippedCardsThisTurn[1])

  // update turn counter
  document.getElementsByClassName("turnCounter")[0].innerHTML = "Turns: " + turns;

  // check if the cards match
  if ((flipped1.firstChild.textContent === flipped2.firstChild.textContent) && (flipped1.id !== flipped2.id)) {

    // update matches counter
    matches--;

    // check for win
    if (matches === 0) {
      document.getElementsByClassName("gameBoard")[0].style.display = "none";
      document.getElementById("winningScreen").style.display = "block";
      document.getElementById("winningScreenButton").style.display = "block";
      document.getElementsByClassName("headerContainer")[0].remove();

      // confirm("You Win! Would you like to play again?")
    }
  } else {
    setTimeout(function() {
      flipped1.classList.remove("flipped");
      flipped2.classList.remove("flipped");
    }, 500)
  }

  // reset flipped cards each turn
  flippedCardsThisTurn = []
}

function resetGame() {
  // reset all variables
  cards = []
  flippedCardsThisTurn = []
  flips = 0;
  matches = 0;
  numSymbols = 0;
  symbolSet = ['!', '@', '#', '$', '%', '^', '&', '*'];
  turns = 0;

  // show start form again
  if (document.getElementsByClassName("headerContainer")[0] !== undefined) {
    document.getElementsByClassName("headerContainer")[0].remove();
  }

  // remove game board
  document.getElementsByClassName("gameBoard")[0].remove();
  document.getElementById("startForm").style.display = "block";
  document.getElementById("winningScreen").style.display = "none";
  document.getElementById("winningScreenButton").style.display = "none";
}




// =============================================== STYLE SHEET =====================================================


// create an embedded stylesheet
var style = document.createElement("style");
style.innerHTML = `
  body {
    font-family: Arial, sans-serif;
    background-color: lightsteelblue;
  }
  
  #game {
    text-align: center;
  }
  
  #startForm button {
    margin: 10px 40px;
    background-color: steelblue;
    border: 1px solid steelblue;
    padding: 10px 10px;
    color: white;
  }
  
  #startForm input {
    width: 40px;
    margin: 0 10px;
  }
  
  h1 {
    text-align: center;
    font-style: italic;
    padding: 20px 0;
    background-color: white;
    width: 70%;
    margin: 20px auto;
  }
  
  .card {
    display: inline-block;
    border: 2px solid steelblue;
    background-color: steelblue;
    border-radius: 10px;
    width: 80px;
    height: 80px;
    margin: 5px 12px;
    text-align: center;
    vertical-align: top;
  }
  
  .flipped {
    border: 2px solid dodgerblue;
    background-color: white;
  }
  
  .card p {
    display: none;
  }
  
  .flipped p {
    display: block;
    text-align: center;
    font-size: 20px;
  }
  
  .gameBoard {
    width: 70%;
    margin: auto;
    padding: 20px 0;
    border: 2px solid darkblue;
    background-color: rgba(192,192,192, .7);
    border-radius: 7px;
    text-align: center;
  }
  
  .headerContainer {
    text-align: center;
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  
  .winningScreen {
    text-align: center;
    font-size: 40px;
    font-style: italic;
    padding: 20px 0;
  }
  
  .winningScreenButton {
    text-align: center;
    margin: 20px 0;
  }
`;

document.head.appendChild(style);
