// JavaScript code for the Quiz App

const quizData = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5"],
        correct: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correct: "Paris"
    },
    // 필요한 만큼 질문을 추가하세요
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    // 현재 질문 데이터 가져오기
    const currentQuiz = quizData[currentQuestion];

    // 질문 텍스트 업데이트
    document.getElementById("quiz-question").innerText = currentQuiz.question;

    // 선택지 컨테이너 가져오기
    const optionsContainer = document.getElementById("options-container");

    // 이전 선택지 제거
    optionsContainer.innerHTML = '';

    // 새로운 선택지 생성
    currentQuiz.options.forEach((optionText, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('form-check');

        const optionInput = document.createElement('input');
        optionInput.classList.add('form-check-input');
        optionInput.type = 'radio';
        optionInput.name = 'answer';
        optionInput.id = `option${index}`;
        optionInput.value = optionText;

        const optionLabel = document.createElement('label');
        optionLabel.classList.add('form-check-label');
        optionLabel.htmlFor = `option${index}`;
        optionLabel.innerText = optionText;

        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionLabel);

        optionsContainer.appendChild(optionDiv);
    });
}

function nextQuestion() {
    // 선택된 답 가져오기
    const options = document.getElementsByName("answer");
    let selectedAnswer;
    options.forEach((option) => {
        if (option.checked) {
            selectedAnswer = option.value;
        }
    });

    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    // 정답 확인
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        // 최종 점수 표시
        document.querySelector("section").innerHTML = `
            <h3>Your Score: ${score} / ${quizData.length}</h3>
            <button class="btn btn-primary mt-3" onclick="location.reload()">Restart Quiz</button>
        `;
    }
}

// 페이지 로드 시 첫 번째 질문 표시
window.onload = function() {
    loadQuestion();
};