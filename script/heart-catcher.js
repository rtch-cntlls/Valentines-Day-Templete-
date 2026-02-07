const gameArea = document.getElementById("game-area");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score-display");
const timerDisplay = document.getElementById("timer-display");

let score = 0;
let timeLeft = 30;
let gameInterval;
let heartInterval;

// Create score popup
const popup = document.createElement("div");
popup.id = "score-popup";
popup.style.position = "fixed";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";
popup.style.background = "linear-gradient(135deg, #c9184a, #ff758f)";
popup.style.color = "#fff";
popup.style.borderRadius = "20px";
popup.style.padding = "30px 20px";
popup.style.textAlign = "center";
popup.style.display = "none";
popup.style.boxShadow = "0 12px 30px rgba(201,24,74,.35)";
popup.style.zIndex = "1000";
popup.style.maxWidth = "90%";

const popupImg = document.createElement("img");
popupImg.src = "game/game.gif";
popupImg.style.width = "120px";
popupImg.style.marginBottom = "15px";

const popupText = document.createElement("p");
popupText.style.fontSize = "18px";
popupText.style.fontWeight = "bold";

const popupBtn = document.createElement("button");
popupBtn.style.padding = "12px 26px";
popupBtn.style.fontSize = "16px";
popupBtn.style.borderRadius = "999px";
popupBtn.style.border = "none";
popupBtn.style.background = "#fff";
popupBtn.style.color = "#c9184a";
popupBtn.style.cursor = "pointer";
popupBtn.style.marginTop = "15px";

popup.appendChild(popupImg);
popup.appendChild(popupText);
popup.appendChild(popupBtn);
document.body.appendChild(popup);

// Function to move basket
function moveBasket(clientX) {
  const rect = gameArea.getBoundingClientRect();
  let x = clientX - rect.left - basket.offsetWidth / 2;
  if (x < 0) x = 0;
  if (x > rect.width - basket.offsetWidth) x = rect.width - basket.offsetWidth;
  basket.style.left = x + "px";
}

gameArea.addEventListener("mousemove", e => moveBasket(e.clientX));

gameArea.addEventListener("touchmove", e => {
  e.preventDefault(); 
  const touch = e.touches[0];
  moveBasket(touch.clientX);
}, { passive: false });

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  if (Math.random() < 0.2) heart.classList.add("gold");
  heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + "px";
  heart.style.animationDuration = (3 + Math.random() * 2) + "s";
  gameArea.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

function checkCollision() {
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach(heart => {
    const heartRect = heart.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      heartRect.bottom >= basketRect.top &&
      heartRect.top <= basketRect.bottom &&
      heartRect.left <= basketRect.right &&
      heartRect.right >= basketRect.left
    ) {
      score += heart.classList.contains("gold") ? 5 : 1;
      scoreDisplay.textContent = "Score: " + score;
      heart.remove();
    }
  });
}

function showScorePopup() {
  popupText.textContent = "Your Score: " + score + " 💖";
  popup.style.display = "block";

  popupBtn.textContent = "Next 💖";
  popupBtn.onclick = () => {
    window.location.href = "game.html"; 
  };
}

function startGame() {
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 10";
  popup.style.display = "none";

  gameInterval = setInterval(checkCollision, 50);
  heartInterval = setInterval(createHeart, 700);

  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(heartInterval);
      clearInterval(timer);
      showScorePopup();
    }
  }, 1000);
}

window.addEventListener("load", startGame);
