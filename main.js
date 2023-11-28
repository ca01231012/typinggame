function shuffleArray(array) {
    var _a;
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [newArray[j], newArray[i]], newArray[i] = _a[0], newArray[j] = _a[1];
    }
    return newArray;
}
var easyWords = [
    'apple', 'banana', 'orange', 'grape', 'melon', 'cherry', 'pineapple', 'strawberry', 'blueberry',
    'peach', 'kiwi', 'mango', 'watermelon', 'pear', 'apricot', 'plum', 'lemon', 'coconut', 'fig', 'lime',
    'avocado', 'blackberry', 'raspberry', 'cranberry', 'pomegranate', 'nectarine', 'guava', 'papaya',
    'tangerine', 'persimmon', 'lychee', 'boysenberry', 'dragonfruit', 'rhubarb', 'starfruit', 'quince',
    'passionfruit', 'durian', 'mulberry', 'soursop', 'kiwano', 'jabuticaba', 'ackee', 'kumquat', 'plantain',
    'ugli fruit', 'feijoa', 'salak', 'carissa', 'carambola', 'cupuacu', 'maracuja', 'chayote', 'pawpaw',
    'rambutan', 'breadfruit', 'jackfruit', 'santol', 'mangosteen', 'longan', 'custard apple', 'cherimoya',
    'sapodilla', 'sugar apple', 'acai', 'bilimbi', 'sapote', 'lucuma', 'yuzu', 'honeydew', 'cantaloupe',
    'casaba', 'crenshaw', 'horned melon', 'persian melon', 'honeydew', 'galia', 'canary melon', 'piel de sapo'
];
var mediumWords = [
    'elephant', 'sunflower', 'guitar', 'butterfly', 'umbrella', 'piano', 'mountain', 'waterfall',
    'tiger', 'candle', 'rainbow', 'compass', 'kangaroo', 'mushroom', 'skyscraper', 'caterpillar',
    'octopus', 'fireworks', 'carousel', 'astronaut', 'helicopter', 'whale', 'dolphin', 'volcano',
    'firefly', 'dragonfly', 'avalanche', 'hurricane', 'meteor', 'blizzard', 'crystal', 'giraffe',
    'toucan', 'platypus', 'koala', 'narwhal', 'orca', 'leopard', 'panther', 'sloth', 'parrot',
    'jellyfish', 'chameleon', 'otter', 'iguana', 'rhinoceros', 'mongoose', 'armadillo', 'hyena'
];
var hardWords = [
    'onomatopoeia', 'xylophone', 'pneumonoultramicroscopicsilicovolcanoconiosis', 'antidisestablishmentarianism',
    'floccinaucinihilipilification', 'sesquipedalian', 'supercalifragilisticexpialidocious', 'hippopotomonstrosesquipedaliophobia',
    'unimaginatively', 'physiotherapist', 'paradoxical', 'sesquipedalian', 'metamorphosis', 'polysyllabic', 'unpronounceable',
    'incomprehensibility', 'indistinguishability', 'electromagnetism', 'anesthesiologist', 'antiestablishmentarian', 'circumnavigation',
    'disproportionate', 'inconsequential', 'insurmountable', 'irreconcilable', 'multiculturalism', 'oversimplification', 'personification',
    'premeditation', 'reinterpretation', 'uncharacteristically', 'counterintelligence', 'individualization', 'incontrovertible', 'indecipherable',
    'insubordination', 'irreparability', 'unsubstantiated', 'overintellectualize', 'overindustrialization', 'proletarianization', 'depersonalization',
    'electroencephalograph', 'neurotransmitter', 'pathophysiology', 'psychophysiological', 'undifferentiated', 'unpredictability', 'heterogeneousness'
];
var selectedDifficulty = easyWords;
var gameStarted = false;
var shuffledWords = selectedDifficulty;
var currentWordIndex = 0;
var score = 0;
var gameDurationSeconds = 60;
var timeRemaining = gameDurationSeconds;
var maxAttempts = 3;
var attempts = 0;
var paused = false;
var interval;
function setDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            selectedDifficulty = easyWords;
            break;
        case 'medium':
            selectedDifficulty = mediumWords;
            break;
        case 'hard':
            selectedDifficulty = hardWords;
            break;
        default:
            selectedDifficulty = easyWords;
            break;
    }
}
function changeDifficulty(value) {
    setDifficulty(value);
    resetGame();
}
function displayWord() {
    var wordElement = document.getElementById('word');
    if (wordElement) {
        wordElement.innerText = shuffledWords[currentWordIndex];
    }
}
function checkInput() {
    var inputElement = document.getElementById('input');
    var messageElement = document.getElementById('message');
    if (inputElement && messageElement) {
        inputElement.addEventListener('input', function () {
            if (!paused && gameStarted) {
                if (inputElement.value.toLowerCase() === shuffledWords[currentWordIndex]) {
                    messageElement.innerText = 'Correct!';
                    increaseScore();
                    currentWordIndex = (currentWordIndex + 1) % shuffledWords.length;
                    inputElement.value = '';
                    displayWord();
                    attempts = 0;
                }
                else {
                    messageElement.innerText = '';
                    attempts++;
                    if (attempts >= maxAttempts) {
                        endGame();
                    }
                }
            }
        });
    }
}
function startTimer() {
    var timerElement = document.getElementById('timer');
    interval = setInterval(function () {
        if (timeRemaining > 0 && !paused && gameStarted) {
            timeRemaining--;
            if (timerElement) {
                timerElement.innerText = "Time: ".concat(timeRemaining, "s");
            }
        }
        else {
            clearInterval(interval);
            if (timerElement) {
                timerElement.innerText = 'Time\'s up!';
            }
            endGame();
        }
    }, 1000);
}
function updateScore() {
    var scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.innerText = "Score: ".concat(score);
    }
}
function getRandomScore() {
    return Math.floor(Math.random() * 10 + 5);
}
function increaseScore() {
    score += getRandomScore();
    updateScore();
}
function resetGame() {
    score = 0;
    timeRemaining = gameDurationSeconds;
    updateScore();
    currentWordIndex = 0;
    attempts = 0;
    shuffledWords = shuffleArray(selectedDifficulty);
    displayWord();
    startTimer();
    paused = false;
}
function startGame() {
    gameStarted = true;
    resetGame();
    focusInput();
}
function focusInput() {
    var inputElement = document.getElementById('input');
    if (inputElement) {
        inputElement.focus();
    }
}
function togglePause() {
    paused = !paused;
    if (paused) {
        clearInterval(interval);
    }
    else {
        startTimer();
    }
}
function endGame() {
    clearInterval(interval);
    var timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerText = 'Game Over!';
    }
    // Game end logic here
}
document.addEventListener('DOMContentLoaded', function () {
    shuffledWords = shuffleArray(selectedDifficulty);
    displayWord();
    checkInput();
});
