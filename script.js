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

// Standalone SHA-256 Hash Function (Works on all browsers, HTTP, & HTTPS)
function hashString(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }
    
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    
    var hash = hashString.h = hashString.h || [];
    var k = hashString.k = hashString.k || [];
    var primeCounter = k[lengthProperty];

    var isPrime = function(n) {
        for (var factor = 2; factor * factor <= n; factor++) {
            if (n % factor === 0) return false;
        }
        return true;
    };

    var getFractionalBits = function(n) {
        return ((n - Math.floor(n)) * maxWord) | 0;
    };

    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (isPrime(candidate)) {
            if (primeCounter < 8) hash[primeCounter] = getFractionalBits(Math.pow(candidate, 1/2));
            k[primeCounter] = getFractionalBits(Math.pow(candidate, 1/3));
            primeCounter++;
        }
    }
    
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 !== 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return;
        words[i >> 2] |= j << ((3 - i % 4) * 8);
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength | 0);
    
    var w = [], hashCopy = hash.slice(0);
    for (i = 0; i < words[lengthProperty]; i += 16) {
        for (j = 0; j < 64; j++) {
            if (j < 16) w[j] = words[i + j];
            else {
                var s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
                var s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
                w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
            }
            
            var s1 = rightRotate(hashCopy[4], 6) ^ rightRotate(hashCopy[4], 11) ^ rightRotate(hashCopy[4], 25);
            var ch = (hashCopy[4] & hashCopy[5]) ^ (~hashCopy[4] & hashCopy[6]);
            var temp1 = hashCopy[7] + s1 + ch + k[j] + w[j];
            var s0 = rightRotate(hashCopy[0], 2) ^ rightRotate(hashCopy[0], 13) ^ rightRotate(hashCopy[0], 22);
            var maj = (hashCopy[0] & hashCopy[1]) ^ (hashCopy[0] & hashCopy[2]) ^ (hashCopy[1] & hashCopy[2]);
            var temp2 = s0 + maj;
            
            hashCopy[7] = hashCopy[6];
            hashCopy[6] = hashCopy[5];
            hashCopy[5] = hashCopy[4];
            hashCopy[4] = (hashCopy[3] + temp1) | 0;
            hashCopy[3] = hashCopy[2];
            hashCopy[2] = hashCopy[1];
            hashCopy[1] = hashCopy[0];
            hashCopy[0] = (temp1 + temp2) | 0;
        }
        for (j = 0; j < 8; j++) hashCopy[j] = (hashCopy[j] + hash[j]) | 0;
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j >= 0; j--) {
            var b = (hashCopy[i] >> (j * 8)) & 255;
            result += (b < 16 ? '0' : '') + b.toString(16);
        }
    }
    return result;
}

// Stage 0: Phone Verification Logic
function verifyPhone() {
    const phoneInput = document.getElementById('phoneInput');
    const errorDiv = document.getElementById('phoneError');
    
    if (!phoneInput || !errorDiv) return;

    // Clean formatting (remove spaces/hyphens)
    const inputNumber = phoneInput.value.trim().replace(/[-\s]/g, '');
    
    // Valid SHA-256 hash (Only 1 pass authorized)
    const validHashes = [
        "42b78a9cb701bcf5a0f58ca2083ad1cddcda58a47ff7ed04e90a612eeaa30829"
    ];

    const inputHash = hashString(inputNumber);

    if (validHashes.includes(inputHash)) {
        errorDiv.style.color = "#ff1493";
        errorDiv.innerHTML = "<span class='welcome-anim'>welcome MAAM 🌸✨👑</span>";
        
        if (bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (musicToggleBtn) musicToggleBtn.classList.remove('hidden');
            }).catch(e => {
                console.warn("Autoplay blocked:", e);
                if (musicToggleBtn) musicToggleBtn.classList.remove('hidden');
            });
        }

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
    const overlay1 = document.getElementById('popupOverlay1');
    const overlay2 = document.getElementById('popupOverlay2');

    if (overlay1) overlay1.classList.add('hidden');
    if (overlay2) overlay2.classList.remove('hidden');
}

// Quiz Data
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

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
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
    
    const cryingEmoji = document.createElement('div');
    cryingEmoji.classList.add('crying-emoji');
    const emojis = ['😭', '🥺', '💧', '💔', '😭'];
    cryingEmoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    const rect = noBtn.getBoundingClientRect();
    cryingEmoji.style.left = `${rect.left + 20}px`;
    cryingEmoji.style.top = `${rect.top - 20}px`;
    
    document.body.appendChild(cryingEmoji);
    setTimeout(() => cryingEmoji.remove(), 1200);

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 80);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 80);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Final "Yes" Celebration
function handleYes() {
    if (bgMusic) bgMusic.volume = 1.0;

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

// Initialize floating tulips on page load
window.onload = createFloatingTulips;
