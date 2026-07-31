// Floating Background Tulips
function createFloatingTulips() {
    const container = document.getElementById('tulipContainer');
    if (!container) return;
    
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

if (bgMusic) {
    bgMusic.volume = 0.2; // Initial low volume
}

// Stage 0: Phone Verification Logic (Fixed for Live Domains)
function verifyPhone() {
    const phoneInput = document.getElementById('phoneInput');
    const errorDiv = document.getElementById('phoneError');
    
    if (!phoneInput || !errorDiv) return;

    const inputNumber = phoneInput.value.trim();
    const validNumbers = ["9764509238", "9814127071"];

    if (validNumbers.includes(inputNumber)) {
        errorDiv.style.color = "#ff1493";
        errorDiv.innerHTML = "<span class='welcome-anim'>welcome MAAM 🌸✨👑</span>";
        
        // Safely attempt to play background music without blocking execution
        if (bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (musicToggleBtn) musicToggleBtn.classList.remove('hidden');
            }).catch(e => {
                console.warn("Autoplay blocked or file missing on live domain:", e);
                if (musicToggleBtn) musicToggleBtn.classList.remove('hidden');
            });
        }

        // Proceed to unlock overlay after 2 seconds regardless of audio status
        setTimeout(() => {
            const phoneOverlay = document.getElementById('phoneOverlay');
            const popup1 = document.getElementById('popupOverlay1');
            
            if (phoneOverlay) phoneOverlay.classList.add('hidden');
            if (popup1) popup1.classList.remove('hidden');
        }, 2000);

    } else {
        errorDiv.style.color = "#e63946";
        errorDiv.innerText = "Sorry, this site is not for you!";
    }
}

function handleHajur() {
    // Switch from Popup 1 to Popup 2
    const overlay1 = document.getElementById('popupOverlay1');
    const overlay2 = document.getElementById('popupOverlay2');

    if (overlay1) overlay1.classList.add('hidden');
    if (overlay2) overlay2.classList.remove('hidden');
}

function toggleMusic() {
    if (!bgMusic) return;

    if (isPlaying) {
        bgMusic.pause();
        if (musicToggleBtn) musicToggleBtn.innerText = '🔇 🎶';
        isPlaying = false;
    } else {
        bgMusic.play().then(() => {
            if (musicToggleBtn) musicToggleBtn.innerText = '🔊 🎶';
            isPlaying = true;
        }).catch(e => console.log("Audio play failed:", e));
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
    const popup2 = document.getElementById('popupOverlay2');
    const quizCard = document.getElementById('quizCard');

    if (popup2) popup2.classList.add('hidden');
    if (quizCard) quizCard.classList.remove('hidden');
    
    loadQuestion();
}

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    const progress = document.getElementById('quizProgress');
    const question = document.getElementById('quizQuestion');
    const feedback = document.getElementById('quizFeedback');
    const optionsContainer = document.getElementById('quizOptions');

    if (progress) progress.innerText = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    if (question) question.innerText = q.question;
    if (feedback) feedback.innerText = "";

    if (optionsContainer) {
        optionsContainer.innerHTML = "";
        q.options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.innerText = option.text;
            btn.onclick = () => selectOption(option);
            optionsContainer.appendChild(btn);
        });
    }
}

function selectOption(option) {
    const feedbackDiv = document.getElementById('quizFeedback');
    
    if (feedbackDiv) {
        if (option.correct) {
            feedbackDiv.style.color = "#ff1493";
            feedbackDiv.innerText = "Yeahhh! you passedddd!!! 🎉🥳✨";
        } else {
            feedbackDiv.style.color = "#ff69b4";
            feedbackDiv.innerText = "Yeahhh! you passedddd!!! ...but that option was incorrect naughty Bipu! 😜🙈🤪";
        }
    }

    // Displays feedback message for 3 seconds before moving to next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            // Quiz complete, move to proposal card
            const quizCard = document.getElementById('quizCard');
            const proposalCard = document.getElementById('proposalCard');
            
            if (quizCard) quizCard.classList.add('hidden');
            if (proposalCard) proposalCard.classList.remove('hidden');
        }
    }, 3000);
}

// Runaway "No" Button Effect
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;
    
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

    // Randomize position across screen
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 80);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 80);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Final "Yes" Celebration
function handleYes() {
    if (bgMusic) bgMusic.volume = 1.0; // Boost volume to 100%

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 160,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ff1493', '#ffb6c1', '#70e000']
        });
    }

    const contentBox = document.querySelector('#proposalCard .content-box');
    const buttonGroup = document.querySelector('#proposalCard .button-group');
    const successMsg = document.getElementById('successMessage');

    if (contentBox) contentBox.style.display = 'none';
    if (buttonGroup) buttonGroup.style.display = 'none';
    if (successMsg) successMsg.classList.remove('hidden');
}

// Initialize floating elements on page load
window.onload = createFloatingTulips;