const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answersButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}


function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    currentQuestionIndex++
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answersButtonsElement.appendChild(button)
    });

}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answersButtonsElement.firstChild){
        answersButtonsElement.removeChild
        (answersButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    if (selectedButton.attributes['data-correct']){
        score++;
    }
    
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = `Your score is ${score}`
        startButton.classList.remove('hide')
    }
   
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: 'Inside which HTML element do we put the Javascript?',
        answers: [
            { text: '<js>', correct: false},
            {text: '<javascript>', correct:false},
            {text: '<scripting>', correct:false},
            {text: '<script>', correct:true}
        ]

    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            { text: 'Both the <head> section and the <body> section are correct', correct: false},
            {text: 'The <head> section', correct:false},
            {text: 'The <body> section', correct:true},
            {text: 'The <title> section', correct:false}
        ]

    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.jx"',
        answers: [
            { text: '<script href="xxx.js">', correct: false},
            {text: '<script name="xxx.js">', correct:false},
            {text: 'The <script src="xxx.js>', correct:true},
            {text: 'The <script type="xxx.js>', correct:false}
        ]

    },
    {
        question: 'External JavaScript file must contain the <script> tag',
        answers: [
            {text: 'True', correct: false},
            {text: 'False', correct:true},
            {text: 'False and True', correct:false},
            {text: 'True and False', correct:false},
        ]

    },

]