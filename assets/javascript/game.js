// Object that contains all of the game information and functions
var game = {

    // Array that stores all the objects to be guessed
    wordChoices: [
        {
            word: "DEFAULTA"
        },
        {
            word: "DEFAULTB"
        },
        {
            word: "LONGDEFAULT"
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

        // TESTING CODE
        // Using ` key to initialize game for testing
        if (keyCode == 192) {
            // Choose a new word to be guessed
            this.chooseWord();

            // Setup wordField of proper length with underscores
            this.wordField = ""
            for (let i=0; i<this.chosenWord.length; ++i) {
                this.wordField += "_";
            }
            console.log(this.wordField);

            // Empty wrongGuesses array
            this.wrongGuesses = [];
            console.log(this.wrongGuesses);
            
        }

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