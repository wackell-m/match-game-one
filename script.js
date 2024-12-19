const grid = document.querySelector('.grid');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let timeLeft = 90;

const images = [
  'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg',
  'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg'
];

const cards = [...images, ...images]
  .sort(() => Math.random() - 0.5);

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.style.backgroundImage = `url(${image})`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  
  card.addEventListener('click', () => flipCard(card));

  return card;
}

function flipCard(card) {
  if (lockBoard || card === firstCard) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.querySelector('.card-back').style.backgroundImage ===
                  secondCard.querySelector('.card-back').style.backgroundImage;

  if (isMatch) {
    matches++;
    resetBoard();
    if (matches === images.length) {
      setTimeout(() => alert('You won! Now go find the Swedish Chef. I hear he was looking for lobsters...'), 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startGame() {
  cards.forEach(image => grid.appendChild(createCard(image)));
  
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      resultElement.style.display = 'block';
    }
  }, 1000);
}

startGame();
