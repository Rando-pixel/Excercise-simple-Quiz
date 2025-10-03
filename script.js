const questions = [
    {
        question: "Band mana yang dikenal dengan lagu 'Bohemian Rhapsody'?",
        answers: [
            "The Beatles",
            "Queen", // Jawaban Benar
            "Led Zeppelin",
            "Pink Floyd"
        ],
        correctAnswer: "Queen"
    },
    {
        question: "Instrumen apa yang umumnya digunakan untuk memberikan ritme dasar dalam musik Pop?",
        answers: [
            "Biola (Violin)",
            "Drum", // Jawaban Benar
            "Seruling (Flute)",
            "Harmonika"
        ],
        correctAnswer: "Drum"
    },
    {
        question: "Siapakah 'King of Pop'?",
        answers: [
            "Elvis Presley",
            "Prince",
            "Michael Jackson", // Jawaban Benar
            "Bruno Mars"
        ],
        correctAnswer: "Michael Jackson"
    },
    {
        question: "Genre musik yang berasal dari Amerika Serikat pada akhir abad ke-19, dicirikan oleh improvisasi dan ritme *swing*, adalah...",
        answers: [
            "Reggae",
            "Classical",
            "Jazz", // Jawaban Benar
            "Heavy Metal"
        ],
        correctAnswer: "Jazz"
    },
    {
        question: "Lagu 'Imagine' adalah salah satu karya paling terkenal dari musisi...",
        answers: [
            "Paul McCartney",
            "George Harrison",
            "Ringo Starr",
            "John Lennon" // Jawaban Benar
        ],
        correctAnswer: "John Lennon"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const quizArea = document.getElementById('quiz-area');
const nextButton = document.getElementById('next-btn');


function loadQuestion() {
    nextButton.classList.add('hide'); 
    
    // Hapus konten sebelumnya
    quizArea.innerHTML = ''; 

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        // Teks Pertanyaan
        const questionText = document.createElement('p');
        questionText.id = 'question-text';
        questionText.textContent = currentQuestion.question;
        quizArea.appendChild(questionText);

        // Daftar Jawaban
        const answerList = document.createElement('ul');
        answerList.className = 'answer-list';

        currentQuestion.answers.forEach(answer => {
            const answerItem = document.createElement('li');
            answerItem.className = 'answer-item';
            answerItem.textContent = answer;
            // Menambahkan event listener ke setiap jawaban
            answerItem.addEventListener('click', () => selectAnswer(answer, answerItem, currentQuestion.correctAnswer));
            answerList.appendChild(answerItem);
        });

        quizArea.appendChild(answerList);
        
        // Area Feedback
        const feedback = document.createElement('p');
        feedback.id = 'feedback';
        quizArea.appendChild(feedback);

    } else {
        // Tampilkan Skor Akhir
        showFinalScore();
    }
}

// Fungsi untuk menangani pilihan jawaban
function selectAnswer(selectedAnswer, answerElement, correctAnswer) {
    // Nonaktifkan semua jawaban setelah pengguna memilih
    document.querySelectorAll('.answer-item').forEach(item => {
        item.classList.add('disabled');
    });

    const feedbackElement = document.getElementById('feedback');
    
    if (selectedAnswer === correctAnswer) {
        score++;
        answerElement.classList.add('correct');
        feedbackElement.textContent = "✅ Correct!";
    } else {
        answerElement.classList.add('wrong');
        feedbackElement.textContent = "❌ Wrong!";
        
        // Highlight jawaban yang benar
        document.querySelectorAll('.answer-item').forEach(item => {
            if (item.textContent === correctAnswer) {
                item.classList.add('correct');
            }
        });
    }

    // Tampilkan tombol Next setelah dijawab
    nextButton.classList.remove('hide');
}

// Fungsi untuk menampilkan skor akhir
function showFinalScore() {
    quizArea.innerHTML = `
        <p style="text-align: center; font-size: 1.2em;">Quiz Completed!</p>
        <p style="text-align: center; font-size: 1.5em; font-weight: bold;">Your score: ${score} out of ${questions.length}</p>
    `;
    nextButton.classList.add('hide'); 
}

// Event listener untuk tombol Next
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

// Mulai kuis saat halaman dimuat
loadQuestion();