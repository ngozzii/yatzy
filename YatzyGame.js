//something to track which round 
//player has 3 rolls before they have to choose which category to score in
//player can choose category before the three turns is up
//on every play, the scores that have not been made official are reset
import { Dice } from './dice.js';
import { calculateScore, initializeCategories, countNumber, calculateSolos,
calculatePairs, calculateThreeFourkind,calculateSmallStraight, calculateLargeStraight,
calculateFullHouse, calculateChance, calculateYatzy} from './YatzyEngine.js';

// Get references to the elements
const diceElements = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll-button");
const playButton = document.getElementById("play-button");
const modal = document.getElementById("category-modal");
const closeButton = document.querySelector(".close");
const selectButton = document.getElementById("select-category");
const categorySelect = document.getElementById("category-select");

// Get references for all elements in the table by their IDs
const onesInput = document.getElementById("ones");
const threeKindInput = document.getElementById("three-kind");
const twosInput = document.getElementById("twos");
const fourKindInput = document.getElementById("four-kind");
const threesInput = document.getElementById("threes");
const fullHouseInput = document.getElementById("full-house");
const foursInput = document.getElementById("fours");
const smallStraightInput = document.getElementById("small-straight");
const fivesInput = document.getElementById("fives");
const largeStraightInput = document.getElementById("large-straight");
const sixesInput = document.getElementById("sixes");
const chanceInput = document.getElementById("chance");
const onePairInput = document.getElementById("onePair");
const twoPairsInput = document.getElementById("twoPairs");
const yatzyInput = document.getElementById("yatzy");
const totalScoreInput = document.getElementById("total-score");

let rollCount = 3;

const elementIdMap = new Map([
    ['ones', 'ones'],
    ['twos', 'twos'],
    ['threes', 'threes'],
    ['fours', 'fours'],
    ['fives', 'fives'],
    ['sixes', 'sixes'],
    ['onePair', 'onePair'],
    ['twoPair', 'twoPairs'],
    ['threeKind', 'three-kind'],
    ['fourKind', 'four-kind'],
    ['smallStraight', 'small-straight'],
    ['largeStraight', 'large-straight'],
    ['fullHouse', 'full-house'],
    ['chance', 'chance'],
    ['yatzy', 'yatzy']
]);



//create map to store category scores
const categoryScores = new Map();
const categoryFinal = new Map();
initializeCategories(categoryScores, categoryFinal);

//create map to store all final category scores
const finalCategoryScores = new Map();


// Array holding all dice
const allDice = [];
diceElements.forEach((element) => {
    const dice = new Dice(element);
    allDice.push(dice);
});

// Function to start or stop spinning
function rollDice() {
    playRound();
    allDice.forEach((element) => {
        element.roll();
    });
    // Calculate scores
    calculateScore (categoryScores, allDice);
    // Display the scores
    displayScores(categoryScores, categoryFinal);
}

// Add a click event listener to the button
rollButton.addEventListener("click", rollDice);

function playRound(){
    --rollCount;
    if(rollCount == 0) {
        alert("Maximum rolls reached! Select a category to score in.");
        //force player to make a category selection
        modal.style.display = "block";
        rollCount = 3;
    }

}


// Show the modal when the "Play" button is clicked
playButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal if the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Handle category selection when the "Select" button is clicked
selectButton.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
      // Make the play
      alert(`You selected the category: ${selectedCategory}`);
      modal.style.display = "none";
  
      // Get a reference to the category to remove
      const optionToRemove = categorySelect.querySelector(`option[value="${selectedCategory}"]`);
  
      // Remove the option
      if (optionToRemove) {
        categorySelect.removeChild(optionToRemove);
      }

      //update the category look on the table 
      if (elementIdMap.has(selectedCategory)) {
        const categoryId = elementIdMap.get(selectedCategory);
        const categoryElement = document.getElementById(categoryId);
        categoryElement.style.backgroundColor = '#04365B';
        //remove from available categories and add to final
        categoryFinal.set(selectedCategory, true);

        } else {
            console.error('Invalid selection');
        }
    } else {
      alert("No category selected.");
    }
});
  

// Close the modal if the user clicks outside the modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function displayScores(categoryScores, categoryFinal) {
    if (categoryFinal.get("ones")){
    }else {onesInput.value = categoryScores.get("ones").toString();}
    if (categoryFinal.get("twos")){
    }else {twosInput.value = categoryScores.get("twos").toString();}
    if (categoryFinal.get("threes")){
    }else {threesInput.value = categoryScores.get("threes").toString();}
    if (categoryFinal.get("fours")){
    }else {foursInput.value = categoryScores.get("fours").toString();}
    if (categoryFinal.get("fives")){
    }else {fivesInput.value = categoryScores.get("fives").toString();}
    if (categoryFinal.get("sixes")){
    }else {sixesInput.value = categoryScores.get("sixes").toString();}
    if (categoryFinal.get("onePair")){
    }else {onePairInput.value = categoryScores.get("onePair").toString();}
    if (categoryFinal.get("twoPair")){
    }else {twoPairsInput.value = categoryScores.get("twoPair").toString();}
    if (categoryFinal.get("threeKind")){
    }else {threeKindInput.value = categoryScores.get("threeKind").toString();}
    if (categoryFinal.get("fourKind")){
    }else {fourKindInput.value = categoryScores.get("fourKind").toString();}
    if (categoryFinal.get("smallStraight")){
    }else {smallStraightInput.value = categoryScores.get("smallStraight").toString();}
    if (categoryFinal.get("largeStraight")){
    }else {largeStraightInput.value = categoryScores.get("largeStraight").toString();}
    if (categoryFinal.get("fullHouse")){
    }else {fullHouseInput.value = categoryScores.get("fullHouse").toString();}
    if (categoryFinal.get("chance")){
    }else {chanceInput.value = categoryScores.get("chance").toString();}
    if (categoryFinal.get("yatzy")){
    }else {yatzyInput.value = categoryScores.get("yatzy").toString();}


    const totalScore = Array.from(categoryScores.values()).reduce(
        (total, score) => total + score
    );
    categoryScores.set("total", totalScore);
    totalScoreInput.value = totalScore.toString();
}



/*class YatzyGame {
    constructor() {
        this.players = []; // An array to store the players
        this.currentPlayer = 0; // Index of the current player
        this.currentRound = 1; // Current round
        this.totalScore = 0; // Total score of all players
        this.winner = null; // Stores the winner at the end of the game
    }

    startNewGame(players) {
        // Function to start a new game with a given number of players
    }

    // Method to end the current player's turn
    endTurn(score) {
        // Function to end the current player's turn
    }

    // Function to determine the winner and end the game
    endGame() {
        // Function to determine the winner and end the game
    }
}}*/