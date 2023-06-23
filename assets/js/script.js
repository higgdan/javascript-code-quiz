//define references to HTML elements
let startContent = document.querySelector("#start-content"); 
let headerQuest = document.querySelector("#header-quest"); // identify area to insert question prompt
let choiceContainer = document.querySelector("#quest-container"); // identify area to create choice buttons
let endContent = document.querySelector("#end-content"); 
let highScores = document.querySelector("#high-scores");
let timerEl = document.querySelector("#timer");

// create a template for creating questions
let defineQuest = function(questPrompt, choice1, choice2, choice3, choice4, questAnswer) {
    this.questPrompt = questPrompt;
    this.choice1 = choice1;
    this.choice2 = choice2;
    this.choice3 = choice3;
    this.choice4 = choice4;
    this.questAnswer = questAnswer;
}
// create the content for the questions, potential choices to pick from, and the correct answer
let quizQuest1 = new defineQuest("what", "who", "when", "where", "why", "when");
let quizQuest2 = new defineQuest("what1", "who1", "when1", "where1", "why1", "when1");
let quizQuest3 = new defineQuest("what2", "who2", "when2", "where2", "why2", "where2");
let quizQuest4 = new defineQuest("what3", "who3", "when3", "where3", "why3", "why3");

// define the set of all questions to be asked
let questions = [quizQuest1, quizQuest2, quizQuest3, quizQuest4];

// define inital values on page 
let questionIndex = 0;
let currentQuest = questions[0];
let startTimer = 60;
let scoresArr = [];
let timerInterval;

// pre populates the scores array if the local storage is empty
if (localStorage.getItem("pScores") === null) {
    scoresArr = [
        {name: "AAA", score: 60},
        {name: "BBB", score: 55},
        {name: "CCC", score: 50},
        {name: "DDD", score: 45},
        {name: "EEE", score: 40},
    ];
  } else {
    scoresArr = JSON.parse(localStorage.getItem("pScores"));
  }
console.log(scoresArr);

// setup the starting page
let onLoad = function() {
    let startHeader = document.createElement("h1");
        startHeader.innerText = "JAVASCRIPT CODING QUIZ";
        startContent.appendChild(startHeader);
    let explainPara = document.createElement("p");
        explainPara.innerText = "TEST YOUR KNOWLEDGE OF JAVASCRIPT IN A TIMED QUIZ. YOU LOSE TIME FOR WRONG ANSWERS!";
        startContent.appendChild(explainPara);
    let startButton = document.createElement("button");
        startButton.innerText = "START QUIZ";
        startContent.appendChild(startButton);  
}

// starts a timer and ends the quiz when timer reaches zero
let setTime = function() {
    timerInterval = setInterval(function() {
      timerEl.innerText = startTimer;
      startTimer--;
      if(startTimer === 0) {
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
};

// start/continue question prompts
let advanceQuest = function() {
currentQuest = questions[questionIndex];
askQuest(currentQuest.questPrompt);
createButtons(currentQuest.choice1, currentQuest.choice2, currentQuest.choice3, currentQuest.choice4);
}

// function to insert the question prompt
let askQuest  = function(questText) {
    headerQuest.innerText = questText
}

// function to insert a button for each choice
let createButtons = function(button1, button2, button3, button4) {
    // clear previous, if any
    choiceContainer.innerHTML = "";
    // TODO: create for loop
    let insButton1 = document.createElement("button");
        insButton1.innerText = button1;
        choiceContainer.appendChild(insButton1);
    let insButton2 = document.createElement("button");
        insButton2.innerText = button2;
        choiceContainer.appendChild(insButton2);
    let insButton3 = document.createElement("button");
        insButton3.innerText = button3;
        choiceContainer.appendChild(insButton3);
    let insButton4 = document.createElement("button");
        insButton4.innerText = button4;
        choiceContainer.appendChild(insButton4);
}

// advance question index and check if the quiz is over after each choice is made
let isGameOver = function() {
    questionIndex ++;
    console.log(questionIndex);
    if (questionIndex === questions.length) {
        clearInterval(timerInterval);
        gameOver();
    } else {
        advanceQuest();
    }
}

// resets screen and defines after quiz event flow
let gameOver = function() {
    timerEl.innerText = "";
    headerQuest.innerText = "";
    choiceContainer.innerHTML = "";
    console.log("Game over!");
    let endHeader = document.createElement("h1");
        endHeader.innerText = "GAME OVER";
        endContent.appendChild(endHeader);
    let resultPara = document.createElement("p");
        resultPara.innerText = "YOUR SCORE: " + startTimer;
        endContent.appendChild(resultPara);
    let initialLabel = document.createElement("label");
        initialLabel.innerText = "ENTER INITIALS: ";
        endContent.appendChild(initialLabel);
    let initialInput = document.createElement("input");
        initialInput.setAttribute("maxlength", "3");
        endContent.appendChild(initialInput);
    let submitButton = document.createElement("button");
        submitButton.innerText = "SUBMIT";
        endContent.appendChild(submitButton);  

    submitButton.addEventListener("click", function() {
        scoresArr.push({name: initialInput.value.toUpperCase(), score: startTimer})
        sortHighScores();
        localStorage.setItem("pScores", JSON.stringify(scoresArr));
        populateHighScores();
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
    endContent.innerHTML = "";
    headerQuest.innerText = "HIGH SCORES";
    for (let i = 0; i < scoresArr.length; i ++) {
        playerScore = document.createElement("li");
        playerScore.innerText = scoresArr[i].name + " - " + scoresArr[i].score;
        console.log(playerScore.innerText);
        highScores.appendChild(playerScore);
    }
    let retryButton = document.createElement("button");
        retryButton.innerText = "TRY AGAIN";
        endContent.appendChild(retryButton);  

    retryButton.addEventListener("click", function() {
        location.reload()
    });
}

// execute application
onLoad();

// on click empty the start screen content and begin the questions
startContent.addEventListener("click", function(event) {
    startContent.innerHTML = "";
    setTime();
    advanceQuest();
});

// answer verification using an event listener
choiceContainer.addEventListener("click", function(event) {
    if (event.target.innerText === currentQuest.questAnswer) {
        console.log("Correct!");
        isGameOver();
        
    } else {
        console.log("Wrong!");
        startTimer -= 5;
        isGameOver();
    }
});