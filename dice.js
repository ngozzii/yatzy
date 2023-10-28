class dice {
    constructor (numberOfDice, diceValues){
        this.numberOfDice = numberOfDice; //set the number of dice in the game to what is given
        this.diceValues = new Array(numberOfDice).fill(6); // create array to track dice values and initialise all to 1
    }


    roll (){
        const value = Math.floor(Math.random() * 6); // Generates a random number between 0 and 5
        return value + 1; // Return the random number value
    }

}