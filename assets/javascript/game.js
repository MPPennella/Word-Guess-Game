// Object that contains all of the game information and functions
var game = {

    // Array that stores all the objects to be guessed
    wordChoices: [
        {
            word: "DEFAULT1"
        },
        {
            word: "DEFAULT2"
        }
    ],

    // Values for holding important game information
    chosenWord: "",
    wordField: "",
    wrongGuesses: [],
    guessesRemaining: 0,

    // function chooses a random member of wordChoices to be the target word
    chooseWord() {
        let index = Math.floor( Math.random()*this.wordChoices.length );
        this.chosenWord = this.wordChoices[index].word;
        console.log(this.chosenWord);
    },

    // function takes keyboard input and performs the appropriate tasks
    keyHandler(keyCode)  {
        // Checks if key was alphabetic A-Z key
        if (65<=keyCode && keyCode<=90) {
            console.log(String.fromCharCode(keyCode));
        } 
    },

}

// Takes keyboard input info and passes it into the game object
document.onkeyup = function (event) {
    game.keyHandler(event.keyCode);
    
}