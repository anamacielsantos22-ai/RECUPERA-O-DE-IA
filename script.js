const questions = [
    {
        question: "1. Qual destas opções indica um possível sinal de que um vídeo é uma Deepfake?",
        answers: [
            { text: "O vídeo está em alta definição (4K).", correct: false },
            { text: "Padrões de piscada de olhos não naturais ou falta de sincronia nos lábios.", correct: true },
            { text: "O vídeo possui legendas automáticas.", correct: false }
        ]
    },
    {
        question: "2. O que você deve fazer imediatamente ao receber uma notícia alarmante em um aplicativo de mensagens?",
        answers: [
            { text: "Compartilhar com todos os seus contatos para alertá-los o quanto antes.", correct: false },
            { text: "Ignorar totalmente e deletar o aplicativo.", correct: false },
            { text: "Não compartilhar e verificar a informação em canais de notícias oficiais ou agências de checagem.", correct: true }
        ]
    },
    {
        question: "3. O que define uma atitude de 'Cidadania Digital'?",
        answers: [
            { text: "Usar a internet de forma ética, crítica, consciente e segura.", correct: true },
            { text: "Comentar em todas as publicações que aparecem na sua timeline.", correct: false },
            { text: "Acreditar apenas em informações publicadas por perfis com muitos seguidores.", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const scoreTextElement = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('quiz-btn');
        
        if (answer.correct) {
            button.dataset.correct = "true";
        } else {
            button.dataset.correct = "false";
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    
    if (isCorrect) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreTextElement.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas!<br><br>Continue praticando a navegação segura!`;
}

restartButton.addEventListener('click', startQuiz);

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', startQuiz);
