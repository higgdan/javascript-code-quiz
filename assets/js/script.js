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

console.log(quizQuest1.choice1);
console.log(quizQuest1.choice2 === quizQuest1.questAnswer);

//define the set of all questions to be asked
let questions = [quizQuest1, quizQuest2, quizQuest3, quizQuest4];
let currentQuest = questions[0];

console.log(currentQuest.questPrompt);
console.log(currentQuest.choice2 === currentQuest.questAnswer);