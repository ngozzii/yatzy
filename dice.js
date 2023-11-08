

export class Dice {


    constructor (element){
        this.value = 1; //set the number of dice in the game to what is given
        this.isSelected = false;
        this.element = element;
        this.diceImages = [
            'dice1.png',
            'dice2.png',
            'dice3.png',
            'dice4.png',
            'dice5.png',
            'dice6.png'
        ]
    }

    roll (){
        if (!this.isSelected) {
            this.element.style.animation = "roll 1s linear"; // Start the animation
            setTimeout(() => {
                this.element.style.animation = "none"; // Reset the animation after 1 second
                this.value = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
            }, 1000); // 1000 milliseconds (1 second)

            this.element.src = this.diceImages[this.value-1];
        }
    }

    click (){
        if (this.isSelected) {
            this.isSelected = false;
            this.element.classList.remove('selected');}
        else {
            this.isSelected= true;
            this.element.classList.add('selected');
        }
    }

}