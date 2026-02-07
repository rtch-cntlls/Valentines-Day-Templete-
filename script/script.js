const heartsContainer = document.getElementById("hearts-container");

function startHearts() {
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 4 + Math.random() * 4 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }, 700);

  setTimeout(() => clearInterval(interval), 8000);
}

window.addEventListener("load", startHearts);
