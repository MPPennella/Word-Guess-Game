// Object that contains all of the game information and functions
var game = {

    // Array that stores all the objects to be guessed
    wordChoices: [
        {
            word: "DEFAULTA",
            name: "Default Name",
            description: "Short description about Default Name. Just a couple of sentences.",
            imgSrc: "image.png",
            soundSrc: "audio.mp3"
        },
        {
            word: "DEFAULTB"
        },
        {
            word: "LONGDEFAULT"
        },
        {
            word: "BENDER",
            name: "Bender Bending Rodriguez",
            description: "Bender is a bending robot built in Tijuana, Mexico. An unrepentant heavy drinker, smoker, gambler, and career criminal, he is somehow also the loveable scamp of the Planet Express crew.",
            imgSrc: "https://vignette.wikia.nocookie.net/en.futurama/images/4/43/Bender.png/revision/latest?cb=20150206072725",
            soundSrc: "http://futurama-madhouse.net/sounds/misc/bite_my_shiny_metal_ass.mp3"
        }
    ],

    // Values for holding important game information
    state: "interGame",
    chosenChar: {},
    chosenWord: "",
    wordField: "",
    wrongGuesses: [],
    guessesRemaining: 10,
    wins: 0,

    // function chooses a random member of wordChoices to be the target word
    chooseWord() {
        let index = Math.floor( Math.random()*this.wordChoices.length );
        this.chosenChar = this.wordChoices[index];
        this.chosenWord = this.chosenChar.word;
        console.log(this.chosenWord);
    },

    // function takes keyboard input and performs the appropriate tasks
    keyHandler(keyCode)  {

        // TESTING CODE
        // Using ` key (keyCode 192) to initialize game for testing
        if (keyCode == 192) {
           this.newGame();
            
        }

        // Run this to start a new game if any key (except F5)is pressed in the between-games state
        if (this.state == "interGame" && keyCode != 116) {
            this.newGame();
        }
        // Only run this if a word is actively being guessed
        else if (this.state == "activeGame") {
            // Checks if key was alphabetic A-Z key (keyCode range 65 to 90), ignores other keys
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
                            this.endGame(true);
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
                            this.endGame(false);
                        }
                    }
                } 

                // Push value changes to screen
                this.updateGameInfo();
            }
        } 
    },

    // Chooses a new word to be guessed and reinitializes game parameters to starting values
    newGame() {
        // Change instructions
        document.getElementById("instructions").textContent = "Press any letter key to guess that letter. If you guess wrong too many times, you lose. If you can complete the word before running out of guesses, you win!"

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

        // Reset guessesRemaining counter
        this.guessesRemaining = 10;
        console.log(this.guessesRemaining);

        // Update screen with intital game values
        this.updateGameInfo();

        // Set game state to active
        this.state = "activeGame";
    
    },

    // Ends the current game, takes a boolean to indicate victory/defeat
    endGame(victory) {
        if (victory) {
            // Add 1 to the win count and push to document
            this.wins++;
            document.getElementById("wins").textContent = this.wins;
        } else {

        }

        // Output identity information for character
        // Full Name
        document.getElementById("name").textContent = this.chosenChar.name;
        // Character description
        document.getElementById("description").textContent = this.chosenChar.description;
        // Display image
        document.getElementById("charImage").setAttribute("src", this.chosenChar.imgSrc);
        document.getElementById("charImage").setAttribute("alt", this.chosenChar.name);
        // Add and play audio from ref: this.chosenChar.soundSrc
        let audio = new Audio(this.chosenChar.soundSrc);
        audio.play();

        // Update instructions
        document.getElementById("instructions").textContent = "Press any key to play again!";

        // Changes state to inter-game
        this.state = "interGame";
    },

    // Determines if a letter has been guessed already
    letterGuessed(letter) {
        // Check passed letter against existing correct and incorrect guesses, return true if exists in those parameters
        if (this.wrongGuesses.includes(letter) || this.wordField.includes(letter)) {
            console.log("Already guessed: "+letter);
            return true;
        }
        return false;
    },

    // Updates the html document with latest game parameter values
    updateGameInfo() {
        // Placeholders for testing

        // Update word with guessed letters, wrong guesses list, guesses remaining
        document.getElementById("wordField").textContent = this.generateSpacedWord(this.wordField);
        document.getElementById("wrongGuesses").textContent = this.wrongGuesses.toString();
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
    },

    // Takes a string and adds spaces between all characters for hangman formatting - e.g. takes "_____" and returns "_ _ _ _ _ "
    generateSpacedWord(string) {
        let spacedString = "";
        for (let i=0; i<string.length; ++i) {
            spacedString += string.charAt(i)+" ";
        }
        return spacedString;
    }

}

// Takes keyboard input info and passes it into the game object
document.onkeyup = function (event) {
    game.keyHandler(event.keyCode);
    
}