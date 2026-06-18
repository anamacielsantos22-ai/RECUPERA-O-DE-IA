// Dados do Quiz
const quizData = [
    {
        question: "1. Qual destas opções indica um possível sinal de que um vídeo é uma Deepfake?",
        options: [
            { text: "O vídeo está em alta definição (4K).", correct: false },
            { text: "Padrões de piscada de olhos não naturais ou falta de sincronia nos lábios.", correct: true },
            { text: "O vídeo possui legendas automáticas.", correct: false }
        ]
    },
    {
        question: "2. O que você deve fazer imediatamente ao receber uma notícia alarmante em um aplicativo de mensagens?",
        options: [
            { text: "Compartilhar com todos os seus contatos para alertá-los o quanto antes.", correct: false },
            { text: "Ignorar totalmente e deletar o aplicativo.", correct: false },
            { text: "Não compartilhar e verificar a informação em canais de notícias oficiais ou agências de checagem.", correct: true }
        ]
    },
    {
        question: "3. O que define uma atitude de 'Cidadania Digital'?",
        options: [
            { text: "Usar a internet de forma ética, crítica, consciente e segura.", correct: true },
            { text: "Comentar em todas as publicações que aparecem na sua timeline.", correct: false },
            { text: "Acreditar apenas em informações publicadas por perfis com muitos seguidores.", correct: false }
        ]
    }
];

// Elementos da DOM
const questionText = document.getElementById('question-text');
const answerOptionsContainer = document.getElementById('answer-options');
const questionBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let userScore = 0;

// Inicializa o jogo
function loadQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    resultBox.classList.add('hide');
    questionBox.classList.remove('hide');
    displayQuestion();
}

// Renderiza a pergunta e seus botões correspondentes
function displayQuestion() {
    // Limpa opções anteriores de forma limpa
    answerOptionsContainer.innerHTML = "";
    
    const currentQuiz = quizData[currentQuestionIndex];
    questionText.innerText = currentQuiz.question;

    // Cria os botões dinamicamente
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('quiz-btn');
        
        // Evento de clique direto mapeado para a função de verificação
        button.onclick = () => handleAnswerSelection(option.correct);
        
        answerOptionsContainer.appendChild(button);
    });
}

// Processa o clique da resposta
function handleAnswerSelection(isCorrect) {
    if (isCorrect) {
        userScore++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        showFinalResults();
    }
}

// Apresenta pontuação final
function showFinalResults() {
    questionBox.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreText.innerHTML = `Você acertou <strong>${userScore}</strong> de <strong>${quizData.length}</strong> perguntas.`;
}

// Ouvintes
restartBtn.onclick = loadQuiz;

// Disparar o quiz assim que o documento carregar
window.onload = loadQuiz;
