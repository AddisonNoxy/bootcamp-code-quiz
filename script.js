//add timer interval
//add function for local storage of scores
//add array list of questions and answers
//add section for possible clickable answers
//add section for correct or incorrect results

//assign various HTML elements to variables
var startButton = document.querySelector("#start-button");
var quizMain = document.querySelector("#quiz-field");
var timerDisplay = document.querySelector("#text-timer");
var highScoreButton = document.querySelector("#highscore-button");
var questionDisplay = document.querySelector("#question-field");
var scoreDisplay = document.querySelector("#score-display");

var allQuestionSlots = document.querySelectorAll("li");

//var answer1 = allQuestionSlots[0];

//console.log(allQuestionSlots[0]);

var currentQuestion = 0;
var numberOfOptions = 4;
var score = 0;

var quizPlaying = false;

//create the list of questions
var questions = ["What does the DOM stand for?",
                "What does the setInterval method do?",
                "How many items can fit in an array?",
                "Which of the following methods can be used to query a specific element?"];

//create the list of answers
var answers = [
    ["Document Object Model", "Data Oriented Mindset", "Document Over Matter", "Don't Overwrite Me"],
    ["Changes how the code defines a second.", "Calls a function at specific intervals.", "Shows how much time is left in the day.", "Prevents a method from being called more often than a defined amount."],
    ["12", "100", "Infinite", "None"],
    ["getElementById", "querySelector", "querySelectorAll", "Only A and B"]
];

var timerLength = 40;

//if the quiz is not currently going, begin the quiz
function startGame() {
    if (quizPlaying) {
        return;
    } else {
        quizPlaying = true;        
        var timer = setInterval(function() {
            scoreDisplay.textContent = "SCORE: " + score;
            timerLength--;
            timerDisplay.textContent = "Time: " + timerLength;

            if (timerLength <= 0) {
                clearInterval(timer);
                timerLength = 40;
                quizPlaying = false;
                gameOver();
            }

        }, 1000);
        quizMain.setAttribute("style", "display: inline");

        showQuestion();
    }
}

//show the current question and answers
function showQuestion() {
    console.log("Current question: " + currentQuestion);

    questionDisplay.textContent = questions[currentQuestion];

    for (var i = 0; i < numberOfOptions; i++) {
        allQuestionSlots[i].textContent = answers[currentQuestion][i];
    }

    console.log(allQuestionSlots[0]);
    assignQuestionValues();

    //allQuestionSlots.forEach(assignQuestionValues);
}

//determines whether each answer is right or wrong and adds the correct listener
function assignQuestionValues() {
    for (var i = 0; i < numberOfOptions; i++) {
        if (i === currentQuestion) {
            console.log(questions[currentQuestion] + "||" + allQuestionSlots[i].textContent);
            allQuestionSlots[i].addEventListener("click", rightAnswer);
        } else {
            allQuestionSlots[i].addEventListener("click", wrongAnswer);
        }
     }
}

function rightAnswer() {
    console.log("Right answer!");
    score += 50;
    currentQuestion++;
    if (currentQuestion >= 4) {
        gameOver();
        return;
    }
    allQuestionSlots.forEach(removeListeners);
    showQuestion();
}

function wrongAnswer() {
    console.log("Wrong answer!");
    timerLength -= 5;
    currentQuestion++;
    if (currentQuestion >= 4) {
        gameOver();
        return;
    }
    allQuestionSlots.forEach(removeListeners);
    showQuestion();
}

//remove event listeners from questions
function removeListeners(item) {
    item.removeEventListener("click", rightAnswer);
    item.removeEventListener("click", wrongAnswer);
    console.log("Removed listeners!");
}

function showHighScores() {
    
}

function gameOver() {
    
}

startButton.addEventListener("click", startGame);