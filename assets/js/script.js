//define references to HTML elements
let choiceContainer = document.querySelector("#quest-container"); // identify area to create choice buttons
let headerQuest = document.querySelector("#header-quest"); // identify area to insert question prompt

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

// start/continue question prompts
let advanceQuest = function() {
currentQuest = questions[questionIndex];
askQuest(currentQuest.questPrompt);
createButtons(currentQuest.choice1, currentQuest.choice2, currentQuest.choice3, currentQuest.choice4);
}

// advance question index and check if the quiz is over after each choice is made
let isGameOver = function() {
    questionIndex ++;
    console.log(questionIndex);
    if (questionIndex === questions.length) {
        gameOver();
    } else {
        advanceQuest();
    }
}

// define after quiz event flow
let gameOver = function() {
    headerQuest.innerText = "";
    choiceContainer.innerHTML = "";
    console.log("game over!");
}

// function to isert the question prompt
let askQuest  = function(questText) {
    headerQuest.innerText = questText
}

// function to insert a button for each choice
let createButtons = function(button1, button2, button3, button4) {
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
 advanceQuest();

// Answer verification using an event listener
choiceContainer.addEventListener("click", function(event) {
    if (event.target.innerText === currentQuest.questAnswer) {
        console.log("Correct!");
        isGameOver();
        
    } else {
        console.log("Wrong!");
        isGameOver();
    }
});