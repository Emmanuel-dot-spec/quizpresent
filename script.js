var questions = [{
    question: "What is the population of Ghana?",
    choices: ["145 million", "30 million", "182 million", "205 million"],
    correctAnswer: 1
}, {
    question: "What is 27*14?",
    choices: ["485", "634", "378", "528"],
    correctAnswer: 2
}, {
    question: "Who was the first president of Ghana?",
    choices: ["Albert", "Falila", "Dr. Nkrumah", "Paa Bobo"],
    correctAnswer: 2
}, {
    question: "What is 2+2 ?",
    choices: ["1", "2", "4", "5"],
    correctAnswer: 2
}, {
    question: "Which continent does Ghana form part of?",
    choices: ["Africa", "Asia", "Europe", "America"],
    correctAnswer: 0
}, {
    question: "How many Enyata participants do you have from Ghana?",
    choices: ["3", "4", "8", "2"],
    correctAnswer: 1
}, {
    question: "How many days do we have in a week?",
    choices: ["4", "5", "6", "7"],
    correctAnswer: 3
}, {
    question: "Who is your instructor for jQuery?",
    choices: ["Mr. Albert", "Mr. Akinpelumi", "Miss Falila", "Miss Sali"],
    correctAnswer: 1
}, {
    question: "Which is the longest river?",
    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: 0
}, {
    question: "Where did you learn web  development?",
    choices: ["Enyata", "University", "Self", "Youtube"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers * 10 + "%" + " out of: " + questions.length * 10 + "%");
    $(document).find(".quizContainer > .result").show();
    var zoom = $(".result");
    zoom.animate({ height: '100px' }, "slow");
    zoom.animate({ fontSize: '30px' }, "slow");
}

function hideScore() {
    $(document).find(".result").hide();
}

// My additions

// End