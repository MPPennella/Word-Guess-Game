// Object that contains all of the game information and functions
var game = {

    // Array that stores all the objects to be guessed
    wordChoices: [
        {
            word: "FRY",
            name: "Philip J. Fry",
            description: "Fry is the delivery boy for Planet Express. Originally from the 20th century, due to an accident in a cryogenics lab he was frozen for 1,000 years. He's not very bright, but will stick by his friends at Planet Express.",
            imgSrc: "https://theinfosphere.org/images/thumb/9/9c/Frozen_Fry.jpg/338px-Frozen_Fry.jpg",
            soundSrc: ""// no sound
        },
        {
            word: "LEELA",
            name: "Turanga Leela",
            description: "Leela is the captain and pilot of the Planet Express ship. Orphaned as a child, she grew up believing she was an alien, but she's actually a mutant human. Tough and no-nonsense, she's the most capable fighter of the crew.",
            imgSrc: "http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/turanga-leela-futurama-benders-game-90.9.jpg",
            soundSrc: ""// no sound
        },
        {
            word: "BENDER",
            name: "Bender Bending Rodriguez",
            description: "Bender is a bending robot built in Tijuana, Mexico. An unrepentant heavy drinker, smoker, gambler, and career criminal, he is somehow also the loveable scamp of the Planet Express crew.",
            imgSrc: "https://i.kym-cdn.com/photos/images/original/000/250/024/e61.jpg",
            soundSrc: "http://futurama-madhouse.net/sounds/misc/bite_my_shiny_metal_ass.mp3"
        },
        {
            word: "PROFESSOR",
            name: "Professor Hubert J. Farnsworth",
            description: "Professor Farnsworth is the founder and owner of Planet Express. He is extremely old, and occasionally senile. He is also Fry's last living relative. He often sends the Planet Express crew on dangerous missions with no regard for their safety.",
            imgSrc: "https://www.geeksofdoom.com/GoD/img/2014/11/professor-farnsworth-futurama-530x310.jpg",
            soundSrc: "http://futurama-madhouse.net/sounds/misc/goodnewseveryone.mp3"
        },
        {
            word: "ZOIDBERG",
            name: "Dr. John Zoidberg",
            description: "Dr. Zoidberg is Planet Express's staff doctor, an alien from the planet Decapod 10. However, he's completely inept when it comes to medical practice. He's also penniless, smells awful, and lives in a dumpster.",
            imgSrc: "https://comedycentral.mtvnimages.com/images/shows/Futurama/Videos/web_exclusives/futurama_mashup_zoidberg_v6.jpg?quality=0.85&width=480&height=271&crop=true",
            soundSrc: "https://www.myinstants.com/media/sounds/zoidberg.mp3"
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

   
    // function takes keyboard input and performs the appropriate tasks
    keyHandler(keyCode)  {

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
                            this.endGame(true);
                        }

                    } else {
                        // Add letter to list of wrong guesses
                        this.wrongGuesses.push(letter);

                        // Decrement number of remaining guesses by 1
                        this.guessesRemaining--;

                        // If no guesses left, DEFEAT
                        if (this.guessesRemaining == 0) {
                            // DEFEAT
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

        // Empty wrongGuesses array
        this.wrongGuesses = [];

        // Reset guessesRemaining counter
        this.guessesRemaining = 10;

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

     // function chooses a random member of wordChoices to be the target word
     chooseWord() {
        let index = Math.floor( Math.random()*this.wordChoices.length );
        this.chosenChar = this.wordChoices[index];
        this.chosenWord = this.chosenChar.word;
    },

    // Determines if a letter has been guessed already
    letterGuessed(letter) {
        // Check passed letter against existing correct and incorrect guesses, return true if exists in those parameters
        if (this.wrongGuesses.includes(letter) || this.wordField.includes(letter)) {
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