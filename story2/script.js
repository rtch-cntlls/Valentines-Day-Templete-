const heartsContainer = document.getElementById("hearts-container");
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random()*12) + "px";
  heart.style.animationDuration = (3 + Math.random() * 2) + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeart, 300);