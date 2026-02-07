const images = document.querySelectorAll('.mag-img');
const storyText = document.getElementById('story-text');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    const msg = img.dataset.message || "";
    storyText.textContent = msg;
  });
  img.addEventListener('mouseleave', () => {
    storyText.textContent = "Hover over an image to see the story...";
  });
});

window.addEventListener('load', () => {
  images.forEach((img, i) => {
    setTimeout(() => {
      img.style.opacity = 1;
      img.style.transform = "translateY(0) scale(1)";
    }, i * 200);
  });
});

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