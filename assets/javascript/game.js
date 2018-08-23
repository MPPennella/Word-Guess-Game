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
        // Using ` key (keyCode 192) to initialize game for testing
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

        // Checks if key was alphabetic A-Z key (keyCode range 65 to 90)
        if (65<=keyCode && keyCode<=90) {
            // Convert keycode to string representation of letter
            let letter = String.fromCharCode(keyCode);
            console.log(letter);

            // Check if letter has been guessed before - only execute if new guess
            if ( !this.letterGuessed(letter) ) {
                // Check if keypress is letter in word
                if (this.chosenWord.includes(letter)) {
                    console.log("MATCH");

                    // Find position of all matches in chosenWord and insert letter at matching indices of wordField
                    for (let i=0; i<this.chosenWord.length; ++i) {
                        if (this.chosenWord.charAt(i) == letter) {
                            // Cut off substrings before and after index and substitute letter in between
                            this.wordField = this.wordField.substring(0,i) + letter + this.wordField.substring(i+1);
                        }
                    }
                    console.log(this.wordField);

                    // If entire word is guessed, VICTORY

                } else {
                    console.log("NO MATCH");

                    // Add letter to list of wrong guesses
                    this.wrongGuesses.push(letter);
                    console.log(this.wrongGuesses.toString());

                    // Decrement number of remaining guesses by 1

                    // If no guesses left, DEFEAT
                }
            } 
            
        } 
    },

    // Determines if a letter has been guessed already
    letterGuessed(letter) {
        // Check passed letter against existing correct and incorrect guesses

        // Placeholder - always returns that letter was not previously used
        return false;
    }

}

// Takes keyboard input info and passes it into the game object
document.onkeyup = function (event) {
    game.keyHandler(event.keyCode);
    
}