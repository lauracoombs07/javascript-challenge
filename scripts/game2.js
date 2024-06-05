"use strict"

// GLOBAL VARIABLES
var flips = 0;
var turns = 0;
var symbolSet = ['!', '@', '#', '$', '%', '^', '&', '*'];
var numSymbols = 0;
var matches = 0;
var cards = []
var flippedCardsThisTurn = []
document.getElementById("startButton").addEventListener("click", startGame)


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
  // document.getElementById("startForm").remove()
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

  document.body.appendChild(gameBoard);
  document.body.appendChild(turnCounter);
  document.body.appendChild(resetButton);

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
    card.setAttribute("id", i)

    card2.classList.add("card");
    card2.setAttribute("id", i + 10)

    card2.addEventListener("click", function() {
      this.classList.add("flipped");
      flippedCardsThisTurn.push(this.id)
      flipCards()
    })

    // put symbol on card
    card.innerHTML = symbolsCurrentGame[i];
    card2.innerHTML = symbolsCurrentGame[i];

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
  // find the flipped cards
  var flipped1 = document.getElementById(flippedCardsThisTurn[0])
  var flipped2 = document.getElementById(flippedCardsThisTurn[1])
  console.log("flips ->", flips)
  console.log("turns ->", turns)

  // update turn counter
  document.getElementsByClassName("turnCounter")[0].innerHTML = "Turns: " + turns;

  // check if the cards match
  if (flipped1.innerHTML === flipped2.innerHTML) {
    // update matches counter
    matches--;

    // check for win
    if (matches === 0) {
      alert("You win!");
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



// reset game
function resetGame() {
  // remove game board
  document.getElementsByClassName("gameBoard")[0].remove();
  // remove turn counter
  document.getElementsByClassName("turnCounter")[0].remove();
  // remove reset button
  document.getElementsByClassName("resetButton")[0].remove();

  // reset all variables
  cards = []
  flippedCardsThisTurn = []
  flips = 0;
  matches = 0;
  numSymbols = 0;
  symbolSet = ['!', '@', '#', '$', '%', '^', '&', '*'];
  turns = 0;

  // show start form again
  document.getElementById("startForm").style.display = "block";
}




// =============================================== STYLE SHEET =====================================================


// create an embedded stylesheet
var style = document.createElement("style");
style.innerHTML = `
  .card {
    display: inline-block;
    border: 2px solid purple;
    width: 50px;
    height: 50px;
    margin: 5px;
    text-align: center;
    line-height: 50px;
  }
  .flipped {
    border: 4px solid white;
    background-color: pink;
  }
  .gameBoard {
    border: 4px solid black;
    background-color: aliceblue;
    height: 200px;
  }
`;

document.head.appendChild(style);
