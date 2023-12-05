//something to track which round 
//player has 3 rolls before they have to choose which category to score in
//player can choose category before the three turns is up
//on every play, the scores that have not been made official are reset

//to fix - dice don't stop rolling when selected
//need a border to show up around selected dice
//need total to only include the categories that have been played
//started implementing that using finalScores map 
//need to make sure elements are being added to it correctly when selected
//need to edit where the total is calculated to total the finalScores map instead
import { Dice } from './dice.js';
import { calculateScore, initializeCategories, countNumber, calculateSolos,
calculatePairs, calculateThreeFourkind,calculateSmallStraight, calculateLargeStraight,
calculateFullHouse, calculateChance, calculateYatzy} from './YatzyEngine.js';

class Player {
    constructor (){
        this.categoryScores = new Map ();
        this.categoryFinal = new Map ();
        this.finalScores = new Map();
        initializeCategories (this.categoryScores, this.categoryFinal, this.finalScores);
    }

    getCategoryScores() {
       return this.categoryScores; 
    }

    getCategoryFinal() {
        return this.categoryFinal;
    }

    getFinalScores() {
        return this.finalScores;
    }
}

// Get references to the button and modal elements
const diceElements = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll-button");
const playButton = document.getElementById("play-button");
const playModal = document.getElementById("category-modal");
const endGameModal = document.getElementById("end-game-modal");
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
//initialize map to align variables
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

//const buttonClickCount =0;

// Array holding all dice
const allDice = [];
diceElements.forEach((element) => {
    const dice = new Dice(element);
    allDice.push(dice);
});

const setRollCount = 3;

let rollCount = setRollCount;
let currentRound = 1; // there are 16 rounds
const singlePlayer = new Player();


/*class YatzyGame {
    //set up game atttributes
    constructor (rollCount, playerCount){
        this.rollCount = rollCount;
        this.playerCount = playerCount;
        //create player objects
        this.players = [playerCount];
        this.players.forEach((element) => {
        const player = new Player();
        players.push(player);
        });

        //reset roll button click count
        buttonClickCount = 0;
    }
    //now we've created all players. Start game



}*/

/*function playTurn (player, rollCount){
    ++buttonClickCount;

    while (buttonClickCount % rollCount != 0){
        //display toast to roll dice


    }

}*/



//create map to store category scores
/*const categoryScores = new Map();
const categoryFinal = new Map();
initializeCategories(categoryScores, categoryFinal);*/

//create map to store all final category scores
//const finalCategoryScores = new Map();

function chooseScore(){
    playModal.style.display = "block";
    rollCount = setRollCount;
    ++currentRound;
}

/*function playRound(){
    --rollCount;
    if(rollCount == 0) {
        alert("Maximum rolls reached! Select a category to score in.");
        //force player to make a category selection
        chooseScore();
    }

}*/

// Function to start or stop spinning
function rollDice() {
    if(rollCount == 0) {
        alert("Maximum rolls reached! Select a category to score in to continue.");
        rollButton.disabled = true;
        //force player to make a category selection
        chooseScore();
    }else{
        --rollCount;
        console.log('roll count:', rollCount);
        allDice.forEach((element) => {
            element.roll();
        });
        // Calculate scores
        calculateScore (singlePlayer.getCategoryScores(), allDice);
        // Display the scores
        displayScores(singlePlayer.getCategoryScores(), singlePlayer.getCategoryFinal(), singlePlayer.getFinalScores());
    }
   // playRound();
}


// Add a click event listener to the button
rollButton.addEventListener("click", rollDice);


// Show the modal when the "Play" button is clicked
playButton.addEventListener("click", chooseScore);

// Close the modal if the close button is clicked
closeButton.addEventListener("click", () => {
    playModal.style.display = "none";
    endGameModal.style.display = "none";
});

// Handle category selection when the "Select" button is clicked
selectButton.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
      // Make the play
      alert(`You selected the category: ${selectedCategory}`);
      playModal.style.display = "none";
  
      // Get a reference to the category to remove
      const optionToRemove = categorySelect.querySelector(`option[value="${selectedCategory}"]`);
  
      // Remove the option
      if (optionToRemove) {
        categorySelect.removeChild(optionToRemove);
      }

      //update the category look on the table & finalScores
      if (elementIdMap.has(selectedCategory)) {
        const categoryId = elementIdMap.get(selectedCategory);
        const categoryElement = document.getElementById(categoryId);
        categoryElement.style.backgroundColor = '#04365B';
        //remove from available categories and add to final
        singlePlayer.getFinalScores().set (selectedCategory, singlePlayer.getCategoryScores().get(selectedCategory));
        singlePlayer.getCategoryFinal().set(selectedCategory, true);
        displayScores(singlePlayer.getCategoryScores(), singlePlayer.getCategoryFinal(), singlePlayer.getFinalScores());
        //reset selected dice
        diceElements.forEach(dice => {
            if (dice.isSelected){
                console.log('dice was selected');
                dice.isSelected = false;
                dice.element.classList.remove('selected');
            }
        });

        //re-enable roll button if disabled
        rollButton.disabled = false;

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
    playModal.style.display = "none";
  }
});

function displayScores(categoryScores, categoryFinal, finalScores) {
    console.log('inside display scores');
    if (categoryFinal.get("ones")){
    }else {onesInput.value = categoryScores.get("ones").toString();}
    if (categoryFinal.get("twos")){
    }else {twosInput.value = categoryScores.get("twos").toString();}
    if (categoryFinal.get("threes")){
    }else {threesInput.value = categoryScores.get("threes").toString();}
    if (categoryFinal.get("fours")){console.log('inside fours score');
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


    const totalScore = Array.from(finalScores.values()).reduce(
        (total, score) => total + score
    );
    categoryScores.set("total", totalScore);
    totalScoreInput.value = totalScore.toString();
}

function endGame(){
    rollCount = 3;
    currentRound = 1
    singlePlayer = new Player();
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