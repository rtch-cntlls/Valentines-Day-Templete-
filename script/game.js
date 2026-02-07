const heartColors = {
  1: "❤️",
  2: "💛",
  3: "💚",
  4: "💙",
  5: "🧡",
  6: "💜"
};

const gameCards = document.querySelectorAll(".game-card");
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

const cardsArray = Array.from(gameCards);
cardsArray.sort(() => Math.random() - 0.5);
const container = document.querySelector(".game-container");
cardsArray.forEach(card => container.appendChild(card));

gameCards.forEach(card => {
  card.addEventListener("click", () => {
    if (card === firstCard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    card.textContent = heartColors[card.dataset.value];

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;

      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
        matchedPairs++;

        if (matchedPairs === 6) {
          showWinMessage();
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard.textContent = "";
          secondCard.textContent = "";
          firstCard = null;
          secondCard = null;
        }, 800);
      }
    }
  });
});

function showWinMessage() {
  const messageContainer = document.createElement("div");
  messageContainer.style.textAlign = "center";
  messageContainer.style.marginTop = "20px";

  const message = document.createElement("p");
  message.textContent = "🎉 You matched all hearts! 🎉";
  message.style.fontSize = "24px";
  message.style.color = "#c9184a";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next 💖";
  nextBtn.style.padding = "12px 26px";
  nextBtn.style.fontSize = "16px";
  nextBtn.style.borderRadius = "999px";
  nextBtn.style.border = "none";
  nextBtn.style.background = "#c9184a";
  nextBtn.style.color = "#fff";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.marginTop = "15px";

  nextBtn.addEventListener("click", () => {
    window.location.href = "wordsearch.html";
  });

  messageContainer.appendChild(message);
  messageContainer.appendChild(nextBtn);
  container.after(messageContainer);
}
