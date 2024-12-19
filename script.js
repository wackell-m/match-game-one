const images = [
    "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg",
    "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg",
    "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg"
];
let shuffledImages = [...images, ...images].sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
let matches = 0;
const grid = document.getElementById("grid");
const timerDisplay = document.getElementById("time");
const restartButton = document.getElementById("restart");
let timer = null;
let timeLeft = 90;

function createCard(imageSrc) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "Click";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    const img = document.createElement("img");
    img.src = imageSrc;
    cardBack.appendChild(img);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", () => {
        if (card.classList.contains("flipped") || secondCard) return;

        card.classList.add("flipped");
        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    });

    return card;
}

function checkMatch() {
    const img1 = firstCard.querySelector(".card-back img").src;
    const img2 = secondCard.querySelector(".card-back img").src;

    if (img1 === img2) {
        matches++;
        resetSelection();
        if (matches === images.length) endGame(true);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endGame(false);
    }, 1000);
}

function endGame(win) {
    clearInterval(timer);
    if (win) {
        alert("You win! Find the Swedish Chef for the next step. I hear he was looking for lobsters...");
    } else {
        alert("Time's up! Try again!");
    }
    restartButton.style.display = "block";
}

function resetGame() {
    shuffledImages = [...images, ...images].sort(() => 0.5 - Math.random());
    matches = 0;
    timeLeft = 90;
    timerDisplay.textContent = timeLeft;
    restartButton.style.display = "none";
    grid.innerHTML = "";
    shuffledImages.forEach(imgSrc => grid.appendChild(createCard(imgSrc)));
    startTimer();
}

restartButton.addEventListener("click", resetGame);

// Initialize the game
shuffledImages.forEach(imgSrc => grid.appendChild(createCard(imgSrc)));
startTimer();
