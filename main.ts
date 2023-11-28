function shuffleArray(array: any[]): any[] {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const easyWords: string[] = [
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

const mediumWords: string[] = [
  'elephant', 'sunflower', 'guitar', 'butterfly', 'umbrella', 'piano', 'mountain', 'waterfall', 
  'tiger', 'candle', 'rainbow', 'compass', 'kangaroo', 'mushroom', 'skyscraper', 'caterpillar', 
  'octopus', 'fireworks', 'carousel', 'astronaut', 'helicopter', 'whale', 'dolphin', 'volcano', 
  'firefly', 'dragonfly', 'avalanche', 'hurricane', 'meteor', 'blizzard', 'crystal', 'giraffe', 
  'toucan', 'platypus', 'koala', 'narwhal', 'orca', 'leopard', 'panther', 'sloth', 'parrot', 
  'jellyfish', 'chameleon', 'otter', 'iguana', 'rhinoceros', 'mongoose', 'armadillo', 'hyena'
];


const hardWords: string[] = [
  'onomatopoeia', 'xylophone', 'pneumonoultramicroscopicsilicovolcanoconiosis', 'antidisestablishmentarianism', 
  'floccinaucinihilipilification', 'sesquipedalian', 'supercalifragilisticexpialidocious', 'hippopotomonstrosesquipedaliophobia', 
  'unimaginatively', 'physiotherapist', 'paradoxical', 'sesquipedalian', 'metamorphosis', 'polysyllabic', 'unpronounceable', 
  'incomprehensibility', 'indistinguishability', 'electromagnetism', 'anesthesiologist', 'antiestablishmentarian', 'circumnavigation', 
  'disproportionate', 'inconsequential', 'insurmountable', 'irreconcilable', 'multiculturalism', 'oversimplification', 'personification', 
  'premeditation', 'reinterpretation', 'uncharacteristically', 'counterintelligence', 'individualization', 'incontrovertible', 'indecipherable', 
  'insubordination', 'irreparability', 'unsubstantiated', 'overintellectualize', 'overindustrialization', 'proletarianization', 'depersonalization', 
  'electroencephalograph', 'neurotransmitter', 'pathophysiology', 'psychophysiological', 'undifferentiated', 'unpredictability', 'heterogeneousness'
];


let selectedDifficulty: string[] = easyWords;
let gameStarted = false;
let shuffledWords: string[] = selectedDifficulty;
let currentWordIndex: number = 0;
let score = 0;
const gameDurationSeconds = 60;
let timeRemaining = gameDurationSeconds;
const maxAttempts = 3;
let attempts = 0;
let paused = false;
let interval: NodeJS.Timeout;

function setDifficulty(difficulty: string): void {
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

function changeDifficulty(value: string): void {
  setDifficulty(value);
  resetGame();
}

function displayWord(): void {
  const wordElement: HTMLElement | null = document.getElementById('word');
  if (wordElement) {
    wordElement.innerText = shuffledWords[currentWordIndex];
  }
}

function checkInput(): void {
  const inputElement: HTMLInputElement | null = document.getElementById('input') as HTMLInputElement;
  const messageElement: HTMLElement | null = document.getElementById('message');

  if (inputElement && messageElement) {
    inputElement.addEventListener('input', () => {
      if (!paused && gameStarted) {
        if (inputElement.value.toLowerCase() === shuffledWords[currentWordIndex]) {
          messageElement.innerText = 'Correct!';
          increaseScore();
          currentWordIndex = (currentWordIndex + 1) % shuffledWords.length;
          inputElement.value = '';
          displayWord();
          attempts = 0;
        } else {
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

function startTimer(): void {
  const timerElement: HTMLElement | null = document.getElementById('timer');
  interval = setInterval(() => {
    if (timeRemaining > 0 && !paused && gameStarted) {
      timeRemaining--;
      if (timerElement) {
        timerElement.innerText = `Time: ${timeRemaining}s`;
      }
    } else {
      clearInterval(interval);
      if (timerElement) {
        timerElement.innerText = 'Time\'s up!';
      }
      endGame();
    }
  }, 1000);
}

function updateScore(): void {
  const scoreElement: HTMLElement | null = document.getElementById('score');
  if (scoreElement) {
    scoreElement.innerText = `Score: ${score}`;
  }
}

function getRandomScore(): number {
  return Math.floor(Math.random() * 10 + 5);
}

function increaseScore(): void {
  score += getRandomScore();
  updateScore();
}

function resetGame(): void {
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

function startGame(): void {
  gameStarted = true;
  resetGame();
  focusInput();
}

function focusInput(): void {
  const inputElement: HTMLInputElement | null = document.getElementById('input') as HTMLInputElement;
  if (inputElement) {
    inputElement.focus();
  }
}

function togglePause(): void {
  paused = !paused;
  if (paused) {
    clearInterval(interval);
  } else {
    startTimer();
  }
}

function endGame(): void {
  clearInterval(interval);
  const timerElement: HTMLElement | null = document.getElementById('timer');
  if (timerElement) {
    timerElement.innerText = 'Game Over!';
  }
  // Game end logic here
}

document.addEventListener('DOMContentLoaded', () => {
  shuffledWords = shuffleArray(selectedDifficulty);
  displayWord();
  checkInput();
});
