const questions = [
    {
        question: "Kui vana oli Walter White, kui teda diagnoositi?",
        image: "walter.jpg",
        answers: [
            {text: "49", correct: false},
            {text: "50", correct: true},
            {text: "45", correct: false},
            {text: "52", correct: false},
        ]
    },
    {
        question: "Mis oli lennuki nimi, mis lendas teise lennukiga kokku?",
        image: "plane.jpg",
        answers: [
            {text: "737", correct: true},
            {text: "473", correct: false},
            {text: "747", correct: false},
            {text: "803", correct: false},
        ]
    },
    {
        question: "Kas Mike valis täis või poolik valiku?",
        image: "mike.jpg",
        answers: [
            {text: "Poolik", correct: true},
            {text: "Täis", correct: false},
        ]
    },
    {
        question: "Miks tahtis Gus cartellile kattemaksu teha?",
        image: "saul.jpg",
        answers: [
            {text: "Nad varastasid tema sobra", correct: false},
            {text: "Piinasid teda mitu paeva", correct: false},
            {text: "Joid tema joogi ara", correct: false},
            {text: "Tapsid tema sobra", correct: true},
        ]
    },
    {
        question: "Mis on episoodi nimi, millel on IMDb-s perfektne (10/10)?",
        image: "ozy.jpg",
        answers: [
            {text: "Felina", correct: false},
            {text: "Buyout", correct: false},
            {text: "Ozymandias", correct: true},
            {text: "Mandala", correct: false},
        ]
    },
    {
        question: "Kuidas kutsuti Tuco abuelitat kahe rulasoitja poolt?",
        image: "skater.jpg",
        answers: [
            {text: "Pendejo", correct: false},
            {text: "Puto", correct: false},
            {text: "Mama", correct: false},
            {text: "Biznatch", correct: true},
        ]
    },
    {
        question: "Mis oli Jimmy juriidilise juhtumi nimi?",
        image: "sandpiper.jpg",
        answers: [
            {text: "Sandpiper", correct: true},
            {text: "Mesa Verde", correct: false},
            {text: "Blue Sky", correct: false},
            {text: "A1A", correct: false},
        ]
    },
    {
        question: "Mis juhtus Better Call Sauli kolmanda hooaja lopus?",
        image: "s3finale.jpg",
        answers: [
            {text: "Chuck tegi enesetapu", correct: true},
            {text: "Saul parandas enda auto", correct: false},
            {text: "Kim jai auto alla", correct: false},
            {text: "Kim pani enda maja kogemata polema", correct: false},
        ]
    },
    {
        question: "Kus kais Jimmy tootamas 1 aasta?",
        image: "1aasta.jpg",
        answers: [
            {text: "Prostituudina", correct: false},
            {text: "Koolis opetajana", correct: false},
            {text: "Telefoni muujana", correct: true},
            {text: "Advokaadina", correct: false},
        ]
    },
    {
        question: "Kelleks vahetas Jimmy McGill oma nime?",
        image: "saulgoodman.jpeg",
        answers: [
            {text: "Saul Bueno", correct: false},
            {text: "Saul Goodman", correct: true},
            {text: "Saul McGill", correct: false},
            {text: "Saul Takovic", correct: false},
        ]
    },
    {
        question: "Mis on Better Call Saul viimase episoodi nimi?",
        image: "saulgone.jpg",
        answers: [
            {text: "Finale", correct: false},
            {text: "Felina", correct: false},
            {text: "The Last Hearing", correct: false},
            {text: "Saul Gone", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Järgmine";
    nextButton.style.display = 'none'; 
    showQuestion();
}

function showQuestion() {
    resetState();  
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    
    const imgContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.src = currentQuestion.image;
    imgElement.alt = "Question Image";
    imgElement.style.maxWidth = "75%";  
    imgContainer.style.textAlign = "center";  
    imgContainer.appendChild(imgElement);    

    questionElement.appendChild(imgContainer);

    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function checkAnswer(answer) {
    if (answer.correct) {
        score++;  
    }
    nextButton.style.display = 'block';  
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.style.display = 'none';  
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.innerHTML = `Teie skoor: ${score} / ${questions.length}`;
    answerButtons.innerHTML = '';  
}

nextButton.addEventListener("click", nextQuestion);

function resetState() {
    nextButton.style.display = "none";  
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);  
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    
    const allButtons = answerButtons.querySelectorAll("button");
    allButtons.forEach(button => button.disabled = true);

    if (isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
        
        const correctButton = Array.from(allButtons).find(button => button.dataset.correct === "true");
        correctButton.classList.add("correct");
    }

    
    checkAnswer({correct: isCorrect});
    nextButton.style.display = 'block';  
}

startQuiz();