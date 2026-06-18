// Banco de dados de perguntas do Quiz
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

// Elementos capturados do HTML
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const scoreTextElement = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Inicializa ou reinicia o Quiz com segurança
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (resultContainer) resultContainer.classList.add('hide');
    if (questionContainer) questionContainer.classList.remove('hide');
    showQuestion();
}

// Mostra a pergunta atual na tela
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('quiz-btn');
        
        // Define nativamente o valor booleano no dataset do elemento
        if (answer.correct) {
            button.dataset.correct = "true";
        } else {
            button.dataset.correct = "false";
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Limpa os botões da pergunta anterior para evitar acúmulo de nós no DOM
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Processa a escolha do usuário
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

// Exibe os resultados finais
function showResults() {
    if (questionContainer) questionContainer.classList.add('hide');
    if (resultContainer) resultContainer.classList.remove('hide');
    scoreTextElement.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
}

// Ouvinte de evento para o botão de reiniciar
if (restartButton) {
    restartButton.addEventListener('click', startQuiz);
}

// Executa automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', startQuiz);
