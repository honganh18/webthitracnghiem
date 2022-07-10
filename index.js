// Functions
function buildQuiz() {
    const output = []; // for each question... 
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = []; // and for each available answer... 
        for (letter in currentQuestion.answers) { // ...add an HTML radio button 
            answers.push(`<label> <input type="radio" name="question${questionNumber}" value="${letter}"> ${letter} : ${currentQuestion.answers[letter]} </label>`);
        }
        // add this question and its answers to the output 
        output.push(`<div class="slide"> <div class="question"> ${currentQuestion.question} </div> <div class="answers"> ${answers.join("")} </div> </div>`
        );

    });
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}
function showResults() {// gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers'); // keep track of user's answers
    let numCorrect = 0;
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => { // find selected answer const 
        answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value; // if answer is correct 
        if (userAnswer === currentQuestion.correctAnswer) { // add to the number of correct answers numCorrect++; // color the answers green 
            answerContainers[questionNumber].style.color = 'lightgreen';
        } // if answer is wrong or blank
        else { // color the answers red 
            answerContainers[questionNumber].style.color = 'red';
        }
        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    });

} // Variables

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n; if (currentSlide === 0) { previousButton.style.display = 'none'; }
    else { previousButton.style.display = 'inline-block'; }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
} function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
      question: 'Javascript is _________ language.',
      answers: {
        a: 'Programming',
        b: 'Application',
        c: 'None of These',
        d: 'Scripting'
      },
      multi: false,
      correctAnswer: 'a'
    },
    {
      question:
        'Which of the following is a valid type of function javascript supports?',
      answers: {
        a: 'named function',
        b: 'anonymous function',
        c: 'both of the above',
        d: 'none of the above'
      },
      multi: false,
      correctAnswer: 'c'
    },
    {
      question:
        'Which built-in method returns the index within the calling String object of the first occurrence of the specified value?',
      answers: {
        a: 'getIndex()',
        b: 'location()',
        c: 'indexOf()',
        d: 'getLocation()'
      },
      multi: false,
      correctAnswer: 'c'
    },
    {
      question: 'Which one of the following is valid data type of JavaScript',
      answers: {
        a: 'number',
        b: 'void',
        c: 'boolean',
        d: 'nothing'
      },
      multi: false,
      correctAnswer: 'a'
    }
  ]; // Kick things off
buildQuiz(); 
// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
submitButton.addEventListener('click', showResults);
showSlide(currentSlide);
// Event listeners
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


