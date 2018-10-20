var gameObject = {
    currentLetter: "",

    allGuesses: [],
    incorrectGuesses: [],
    correctGuesses: [],
    correctGuessesInOrder: [],

    showArray: ["DRAPER", "PEGGY", "LUCKYSTRIKE", "STERLINGCOOPER", "MADMEN", "BETTY", "GLEN", "NEWYORK", "JOAN","PETE"],
    randomWord: "",
    showLetters: [],

    isMatch: null,
    isRepeat: null,

    guessesRemaining: 15,
    loseCount: 0,
    winCount: 0,

    generateWord: function () {
        var random_num = Math.random() * 9;
        random_num = Math.floor(random_num);

        this.randomWord = this.showArray[random_num];
        this.showLetters = this.randomWord.split("");
        console.log(this.randomWord + " " + this.showLetters);

        this.allGuesses = [];
        this.incorrectGuesses = [];
        this.correctGuesses = [];
        this.correctGuessesInOrder = [];
        this.guessesRemaining = 15;
    },

    checkRepeat: function () {
        var repeatCounter = -1;
        for (var i = 0; i < this.allGuesses.length; i++) {
            if (this.currentLetter == this.allGuesses[i]) {
                repeatCounter++;
            }

        }
        if (repeatCounter == 0) {
            this.isRepeat = false;
        }
        else {
            this.isRepeat = true;
        }
    },
    checkMatch: function () {
        var matchCounter = 0;

        for (var i = 0; i < this.showLetters.length; i++) {
            if (this.currentLetter == this.showLetters[i]) {
                matchCounter++;
            }
        }

        if (matchCounter == 0) {
            this.isMatch = false;
        }
        else {
            this.isMatch = true;
        }
    },
    match_repeatComparison: function () {
        if (this.isRepeat == true) {
            return;
        }

        if (this.isRepeat == false && this.isMatch == false) {
            this.incorrectGuesses.push(this.currentLetter);
            this.guessesRemaining--;
        }
        else if (this.isRepeat == false && this.isMatch == true) {
            this.correctGuesses.push(this.currentLetter);
        }
    },

    revealShow: function () {
        if (this.correctGuesses.length == 0) {
            for (var i = 0; i < this.showLetters.length; i++) {
                this.currentGuessesInOrder.push(this.currentLetter)

            }
        }
        else {
            for (var i = 0; i < this.showLetters.length; i++) {
                if (this.correctGuessesInOrder[i] != this.showLetters[i]) {

                    for (var j = 0; j < this.correctGuesses.length; j++) {

                        if (this.correctGuesses[j] == this.showLetters[i]) {
                            this.correctGuessesInOrder[i] = this.showLetters[i];
                        }
                        else {
                            this.correctGuessesInOrder[i] = "_";
                        }
                    }


                }
            }
        }
        document.getElementById("current-word").innerHTML = this.correctGuessesInOrder.join(" ");
        document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
        document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
        document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
    },
    checkProgress: function () {
        var counter = 0;



        for (var i = 0; i < this.showLetters.length; i++) {
            if (this.correctGuessesInOrder[i] == this.showLetters[i]) {
                counter++;
            }
        }


        if (counter == this.showLetters.length && this.showLetters.length != 0) {
            alert("You win");
            this.winCount++;
            this.generateWord();
        }

        if (this.guessesRemaining == 0) {
            alert("You lose!");
            this.loseCount++;
            this.generateWord();
        }



        var userStartedGameOnce = false;
    }
}



document.onkeyup = function (q) {



    gameObject.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();


    if (gameObject.currentLetter == " " && userStartedGameOnce == false) {


        gameObject.generateWord();

        userStartedGameOnce = true;

    }

    gameObject.allGuesses.push(gameObject.currentLetter);

    console.log("Current Letter: " + gameObject.currentLetter + "\n" + "Show Letters: " + gameObject.showLetters + "\n" + "All Guesses: " + gameObject.allGuesses);

    gameObject.checkRepeat();
    gameObject.checkMatch();



    gameObject.match_repeatComparison();

    console.log("Correct Guesses: " + gameObject.correctGuesses);
    console.log("Incorrect Guesses: " + gameObject.incorrectGuesses);
    console.log("Guesses Remaining:" + gameObject.guessesRemaining);


    gameObject.revealShow();
    console.log(gameObject.correctGuessesInOrder);


    gameObject.checkProgress();
}