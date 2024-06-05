"use strict"


// TODO: (5 points) Setup your JavaScript accordingly
//    All of your JavaScript should go in an external file (game.js)
//    All of your JavaScript, with the exception of adding an event listener for the first click, should be within functions
//      (global variables can be used to keep track of the matches/wins and number of card flips).

// GLOBAL VARIABLES
var matches = 0;
var flips = 0;

// add listener for 'Start Game' button
document.getElementById("startButton").addEventListener("click", startGame)

// TODO:  (10 points) Start with a form that allows the user to pick the number of symbols to be used
//    - Add an event listener to listen for clicks on the startButton
//    - When the "Play Now" button is pressed, the event listener should:
//      - Determine the value of the input field (you can use whatever method you like to retrieve this value)
//      - The number of symbols should have a max value of 8 (though no error will show up, the game will just start with the max number of symbols if the input is over 8)
//      - The symbols can be any character set you'd like (I used !@#$%^&*)
//      - The startForm division should be removed (or hidden if you're comfortable manipulating style sheets)
//      - The game board should be displayed

function startGame() {
  var numSymbols = document.getElementById("numSymbols").value;

  if (numSymbols > 8) {
    numSymbols = 8;
  }
  var numCards = numSymbols * 2;
  document.getElementById("startForm").style.display = "none";
  generateGameBoard(numSymbols);
}


// TODO: (10 points) Generate a game board
//    - Based on the number submitted, generate a game board
//    - The number of cards should be equal to 2 x the number of symbols (you'll need matching pairs, of course!)
//    - The cards should be arranged as a square if possible (for example, 8 symbols means 16 cards, which means a 4 x 4 grid)
//    - If they cannot be a square (there aren't an equal number of columns and rows), arrange them in any way you like
//    - Regardless of the number of cards, the arrangement must be in a grid. Consider using:
//      - display: inline-block;
//      - a table
//      - floated elements

function generateGameBoard(numSymbols) {
  var numCards = numSymbols * 2;
  var symbols = generateSymbols(numSymbols);
  // create 1 game board
  var gameBoard = document.createElement("div");
  gameBoard.style.border = "4px solid black";
  gameBoard.style.backgroundColor = "lightblue";
  document.body.appendChild(gameBoard);

  createCards(numSymbols, symbols, gameBoard);
}


function createCards(numSymbols, symbols, gameBoard) {
  // create 2 cards for each symbol
  for (var i = 0; i < numSymbols; i++) {
    var card = document.createElement("div");
    card.style.border = "2px solid purple";
    card.style.width = "50px";
    card.classList.add("card");
    card.innerHTML = symbols[0];
    gameBoard.appendChild(card);
  }
}
// TODO: (10 points) Assign a random symbol to each card
//    - Find a way to assign a symbol from the set of available symbols to each card
//    - The symbol assignment should be randomized!
//    - The symbol should not appear in the user interface at the beginning of the game
//    - However, it does not matter if the symbol is viewable in the source code
//    - Some potential solutions for associating a symbol with a card may include:
//      - An object that serves as a lookup table
//      - Setting the value as a custom attribute
//      - Perhaps creating an object model that drives your game
//      - Or… any other scheme that you can come up with

function generateSymbols(numSymbols) {
  var symbols = "!@#$%^&*";
  var symbolArray = symbols.split("");
  var gameSymbols = [];
  for (var i = 0; i < numSymbols; i++) {
    var symbol = symbolArray[i];
    gameSymbols.push(symbol);
    gameSymbols.push(symbol);
  }
  return gameSymbols;
}


// TODO:  (5 points) Allow the user to click on cards
//    - Assign an event listener to each card
//    - When a card is clicked show the card's symbol
//      - Either add a text node to the card
//      - Or use CSS
//        - If you're using CSS, only manipulate the classes, don't assign styles directly
//        - Some options for toggling classes include:
//          - classListLinks to an external site.
//          - setAttributeLinks to an external site.
//    - Do not allow more than two flipped cards at once


// TODO: (5 points) Handle two consecutive clicks / two flipped cards
//    - If there are two cards flipped after two clicks
//      - If they don't match, flip them back so that the symbols don't show
//      - If they do match, leave them around so that the symbols remain revealed
//    - If there's only one card flipped, allow another card to be flipped
//    - Again there are matches that are already flipped, don't unflip them


// TODO: (5 points) Keep track of the number of flip pairs
//    - Create an element that shows you the number of guesses
//    - Add a guess after every two cards are flipped

// TODO: (5 points) Determine when someone wins
//    - If all of the revealed cards are matches, end the game
//    - Clear the board and show a thank you message
//    - Add a play again button
