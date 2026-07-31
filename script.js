// Floating Background Tulips
function createFloatingTulips() {
    const container = document.getElementById('tulipContainer');
    const tulipEmojis = ['🌷', '🌸', '✨', '🌷'];
    const count = 15;

    for (let i = 0; i < count; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('floating-tulip');
        tulip.innerText = tulipEmojis[Math.floor(Math.random() * tulipEmojis.length)];
        
        tulip.style.left = `${Math.random() * 100}%`;
        tulip.style.animationDuration = `${6 + Math.random() * 6}s`;
        tulip.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(tulip);
    }
}

// Audio Control Logic
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggle');

// Set initial volume to LOW (20%)
bgMusic.volume = 0.2;

function handleHajur() {
    // Hide Hello Popup, Show Helooo Bipu Popup
    document.getElementById('popupOverlay1').classList.add('hidden');
    document.getElementById('popupOverlay2').classList.remove('hidden');

    // Start background music (Beintehaa) at low volume
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggleBtn.classList.remove('hidden');
    }).catch(e => {
        console.log("Audio play failed on click:", e);
    });
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicToggleBtn.innerText = '🔇 🎶';
        isPlaying = false;
    } else {
        bgMusic.play();
        musicToggleBtn.innerText = '🔊 🎶';
        isPlaying = true;
    }
}

// Quiz Data & Logic
const quizQuestions = [
    {
        question: "1. Where did I talk to U for the first time? 💬",
        options: [
            { text: "a. Classroom 📚", correct: false },
            { text: "b. Kitchen 🍳", correct: false },
            { text: "c. Exam hall 📝", correct: true },
            { text: "d. In my mind 🧠", correct: false }
        ]
    },
    {
        question: "2. What is my date of birth?? (Think deeeply) 📅",
        options: [
            { text: "a. Baisakh 7 🌸", correct: false },
            { text: "b. Ashoj 7 🍁", correct: false },
            { text: "c. Kartik 7 🌾", correct: false },
            { text: "d. Both B and C 🤯", correct: true }
        ]
    },
    {
        question: "3. What is my fav color?? 🎨",
        options: [
            { text: "a. Violet 💜", correct: false },
            { text: "b. Black 🖤", correct: false },
            { text: "c. Blue 💙", correct: false },
            { text: "d. Kaalo 🖤", correct: true }
        ]
    },
    {
        question: "4. Who is my fav person?? 👑",
        options: [
            { text: "a. Bipuuuu 🥰", correct: true },
            { text: "b. Bipanaa 💕", correct: true },
            { text: "c. Bipana Ojhaaaaa 💖", correct: true },
            { text: "d. ALL of above 🌷", correct: true }
        ]
    }
];

let currentQuestion = 0;

function startQuiz() {
    document.getElementById('popupOverlay2').classList.add('hidden');
    document.getElementById('quizCard').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('quizProgress').innerText = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    document.getElementById('quizQuestion').innerText = q.question;
    document.getElementById('quizFeedback').innerText = "";

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = option.text;
        btn.onclick = () => selectOption(option);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(option) {
    const feedbackDiv = document.getElementById('quizFeedback');
    
    if (option.correct) {
        feedbackDiv.style.color = "#ff1493";
        feedbackDiv.innerText = "Yeahhh! you passedddd!!! 🎉🥳✨";
    } else {
        feedbackDiv.style.color = "#ff69b4";
        feedbackDiv.innerText = "Yeahhh! you passedddd!!! ...but that option was incorrect naughty Bipu! 😜🙈🤪";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            // Quiz complete, move to proposal
            document.getElementById('quizCard').classList.add('hidden');
            document.getElementById('proposalCard').classList.remove('hidden');
        }
    }, 1500);
}

// Runaway "No" Button Effect with Animated Crying Emojis
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    
    // Spawn crying emoji floating effect
    const cryingEmoji = document.createElement('div');
    cryingEmoji.classList.add('crying-emoji');
    const emojis = ['😭', '🥺', '💧', '💔', '😭'];
    cryingEmoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    const rect = noBtn.getBoundingClientRect();
    cryingEmoji.style.left = `${rect.left + 20}px`;
    cryingEmoji.style.top = `${rect.top - 20}px`;
    
    document.body.appendChild(cryingEmoji);
    
    setTimeout(() => cryingEmoji.remove(), 1200);

    // Randomize position across viewport
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 80);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 80);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Final "Yes" Celebration
function handleYes() {
    // Boost volume to MAXIMUM (100%)
    bgMusic.volume = 1.0;

    // Trigger Pink & Tulip Confetti
    confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffb6c1', '#70e000']
    });

    // Hide choices & message, reveal romantic finish
    document.querySelector('#proposalCard .content-box').style.display = 'none';
    document.querySelector('#proposalCard .button-group').style.display = 'none';
    document.getElementById('successMessage').classList.remove('hidden');
}

// Initialize floating tulips on load
window.onload = createFloatingTulips;