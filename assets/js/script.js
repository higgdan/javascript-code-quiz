//define references to HTML elements; 
let headingEl = document.getElementById("heading");
let paraEl = document.getElementById("paragraph");
let divEl = document.getElementById("division");
let choiceContainer = document.querySelector("#choice-container");
let highScores = document.querySelector("#high-scores");
let timerEl = document.querySelector("#timer");
let wrongAns = document.querySelector("#wrong-answer")

// create a template for creating questions
let DefineQuest = function(questPrompt, choice1, choice2, choice3, choice4, questAnswer) {
    this.questPrompt = questPrompt;
    this.choice1 = choice1;
    this.choice2 = choice2;
    this.choice3 = choice3;
    this.choice4 = choice4;
    this.questAnswer = questAnswer;
}
// create the content for the questions, potential choices to pick from, and the correct answer
let quizQuest1 = new DefineQuest("WHO'S ON FIRST", "WHO", "WHAT", "I DON'T KNOW", "WHY", "WHO");
let quizQuest2 = new DefineQuest("WHAT'S ON SECOND", "WHO", "WHAT", "I DON'T KNOW", "WHY", "WHAT");
let quizQuest3 = new DefineQuest("I DON'T KNOW IS ON THIRD.", "WHO", "WHAT", "I DON'T KNOW", "WHY", "I DON'T KNOW");
let quizQuest4 = new DefineQuest("LEFT FIELDER'S NAME", "WHO", "WHAT", "I DON'T KNOW", "WHY", "WHY");
// its an abbott and costello joke ;)

// define the set of all questions to be asked
let questions = [quizQuest1, quizQuest2, quizQuest3, quizQuest4];

// define inital values on page 
let questionIndex = 0;
let currentQuest = questions[0];
let startTimer = 60;
let timerInterval;
let scoresArr = [];
let scoresArrDefault = [
    {name: "AAA", score: 60},
    {name: "BBB", score: 55},
    {name: "CCC", score: 50},
    {name: "DDD", score: 45},
    {name: "EEE", score: 40},
];

// pre-populates the scores array if the local storage is empty
if (localStorage.getItem("pScores") === null) {
    scoresArr = Array.from(scoresArrDefault); // copies the scoresArrDefault, not equate to
  } else {
    scoresArr = JSON.parse(localStorage.getItem("pScores"));
  }

// setup the starting page
let onLoad = function() {
    headingEl.innerText = "JAVASCRIPT CODING QUIZ";
    paraEl.innerText = "TEST YOUR KNOWLEDGE OF JAVASCRIPT IN A TIMED QUIZ. YOU LOSE TIME FOR WRONG ANSWERS!";
    let startButton = document.createElement("button");
        startButton.innerText = "START QUIZ";
        startButton.setAttribute("class", "button1");
        divEl.appendChild(startButton);
    // on click start timer and begin the questions
    startButton.addEventListener("click", function(event) {
        setTime();
        advanceQuest();
    });
}

// starts a timer and ends the quiz when timer reaches zero
let setTime = function() {
    timerEl.innerText = startTimer;
    timerInterval = setInterval(function() {
        startTimer--;
        timerEl.innerText = startTimer.toString().padStart(2, '0');
        if(startTimer === 0) {
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
}

// resets screen and start/continue question prompts
let advanceQuest = function() {
    currentQuest = questions[questionIndex];
    cleanUp();
    askQuest(currentQuest.questPrompt);
    let choiceButtons = [currentQuest.choice1, currentQuest.choice2, currentQuest.choice3, currentQuest.choice4];
    createButtons(choiceButtons);
}

let cleanUp = function() {
    headingEl.innerText = "";
    paraEl.innerText = "";
    divEl.innerHTML = "";
    choiceContainer.innerHTML = "";
    highScores.innerHTML = "";
}

// function to insert the question prompt
let askQuest  = function(questText) {
    headingEl.innerText = questText;
}

// function to insert a button for each choice
let createButtons = function(buttons) {
    for (let i = 1; i <= buttons.length; i++) {
        let insButton = document.createElement("button");
            insButton.innerText = buttons[i - 1];
            insButton.setAttribute("class", "button" + [i]);
            choiceContainer.appendChild(insButton);
    }
}

// advance question index and check if the quiz is over after each choice is made
let isGameOver = function() {
    questionIndex ++;
    if (questionIndex === questions.length) {
        clearInterval(timerInterval);
        gameOver();
    } else {
        advanceQuest();
    }
}

// resets screen content and defines after quiz event flow
let gameOver = function() {
    cleanUp();
    timerEl.innerText = "";
    headingEl.innerText = "GAME OVER";
    if (startTimer < 0) {startTimer = 0};
    paraEl.innerText = "YOUR SCORE: " + startTimer.toString().padStart(2, '0');
    let initialLabel = document.createElement("label");
        initialLabel.innerText = "ENTER INITIALS: ";
        divEl.appendChild(initialLabel);
    let initialInput = document.createElement("input");
        initialInput.setAttribute("maxlength", "3");
        initialInput.setAttribute("placeholder", "———");
        initialInput.setAttribute("size", "3");
        divEl.appendChild(initialInput);
    let submitButton = document.createElement("button");
        submitButton.innerText = "SUBMIT";
        submitButton.setAttribute("class", "button2")
        divEl.appendChild(submitButton);  

    submitButton.addEventListener("click", function() {
        if (initialInput.value === "") {
            window.alert("YOU MUST ENTER YOUR INITIALS!");
            gameOver();
        } else {
        scoresArr.push({name: initialInput.value.toUpperCase(), score: startTimer})
        sortHighScores();
        localStorage.setItem("pScores", JSON.stringify(scoresArr));
        populateHighScores();
        }
    });
}

// sort the list of high scores order decending
let sortHighScores = function() {
    scoresArr.sort( function(a, b) {
        let x = a.score;
        let y = b.score;
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0; 
    });
}

// resets screen content and creates list item for each player and their score
let populateHighScores = function() {
    cleanUp();
    headingEl.innerText = "HIGH SCORES";
    for (let i = 0; i < scoresArr.length; i ++) {
        playerScore = document.createElement("li");
        playerScore.innerText = scoresArr[i].name + " - " + scoresArr[i].score.toString().padStart(2, '0');
        highScores.appendChild(playerScore);
    }
    let retryButton = document.createElement("button");
        retryButton.innerText = "TRY AGAIN";
        retryButton.setAttribute("class", "button3");
        divEl.appendChild(retryButton);  
    let clearButton = document.createElement("button");
        clearButton.innerText = "RESET SCORES";
        clearButton.setAttribute("class", "button4");
        divEl.appendChild(clearButton); 

    retryButton.addEventListener("click", function() {
        location.reload();
    });
    clearButton.addEventListener("click", function() {
        localStorage.removeItem("pScores");
        scoresArr = scoresArrDefault;
        populateHighScores();
    });
}

// execute application
onLoad();

// answer verification using an event listener, remove time from the timer for wrong answers
choiceContainer.addEventListener("click", function(event) {
    if (event.target.innerText === currentQuest.questAnswer) {
        console.log("Correct!");
        isGameOver();
        
    } else {
        console.log("Wrong!");
        startTimer -= 4;
        wrongAns.innerText = "-5";
        setTimeout(function() {
            wrongAns.innerText = "";
            isGameOver();
        }, 500)
        
    }
});