let startButton = document.getElementById('start-button');
let userInput = document.getElementById('user-input');
let timeDisplay = document.getElementById('time');
let resultDiv = document.getElementById('result');
let wpmDisplay = document.getElementById('wpm');
let starsDisplay = document.getElementById('stars');
let promptText = document.getElementById('prompt-text');
let timer = 0;
let interval;
let testStarted = false;

// List of random sentences
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "The five boxing wizards jump quickly.",
    "Jinxed wizards pluck zany quills."
];

startButton.addEventListener('click', startTest);

function startTest() {
    if (testStarted) return;

    testStarted = true;
    startButton.disabled = true;
    userInput.disabled = false;
    userInput.value = '';
    userInput.focus();
    resultDiv.classList.add('hidden');
    timer = 0;
    timeDisplay.textContent = timer;

    // Choose a random sentence
    let randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    promptText.textContent = randomSentence;

    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer++;
    timeDisplay.textContent = timer;

    if (userInput.value === promptText.textContent) {
        calculateWPM();
    }
}

function calculateWPM() {
    clearInterval(interval);

    let wordsTyped = userInput.value.trim().split(/\s+/).length;
    let timeInMinutes = timer / 60;
    let wpm = Math.round(wordsTyped / timeInMinutes);

    wpmDisplay.textContent = wpm;
    showStars(wpm);
    resultDiv.classList.remove('hidden');
}

function showStars(wpm) {
    let starCount = 0;
    if (wpm >= 100) starCount = 5;
    else if (wpm >= 60) starCount = 4;
    else if (wpm >= 40) starCount = 3;
    else if (wpm >= 20) starCount = 2;
    else if (wpm >= 10) starCount = 1;

    starsDisplay.innerHTML = '';
    for (let i = 0; i < starCount; i++) {
        starsDisplay.innerHTML += `<img src="https://img.icons8.com/ios-filled/50/ffd700/star.png" alt="star">`;
    }
}

function restartTest() {
    timer = 0;
    timeDisplay.textContent = timer;
    resultDiv.classList.add('hidden');
    userInput.value = '';
    startButton.disabled = false;
    testStarted = false;
}
