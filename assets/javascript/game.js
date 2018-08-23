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
    guessesRemaining: 10,

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
                    
                    // If entire word is guessed, VICTORY
                    if (this.chosenWord == this.wordField) {
                        // VICTORY
                        console.log("YOU WON");
                    }

                } else {
                    console.log("NO MATCH");

                    // Add letter to list of wrong guesses
                    this.wrongGuesses.push(letter);

                    // Decrement number of remaining guesses by 1
                    this.guessesRemaining--;

                    // If no guesses left, DEFEAT
                    if (this.guessesRemaining == 0) {
                        // DEFEAT
                        console.log("YOU LOST");
                    }
                }
            } 
            console.log("KNOWN:\t"+this.wordField);
            console.log("WRONG:\t"+this.wrongGuesses.toString());
            console.log("Guesses remaining: "+this.guessesRemaining);
            console.log("---------------------------------");

        } 
    },

    // Determines if a letter has been guessed already
    letterGuessed(letter) {
        // Check passed letter against existing correct and incorrect guesses, return true if exists in those parameters
        if (this.wrongGuesses.includes(letter) || this.wordField.includes(letter)) {
            console.log("Already guessed: "+letter);
            return true;
        }
        return false;
    }

}

// Takes keyboard input info and passes it into the game object
document.onkeyup = function (event) {
    game.keyHandler(event.keyCode);
    
}