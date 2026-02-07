  const heartsContainer = document.getElementById("hearts-container");
  function startHearts() {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 10 + "s";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }, 700);
    setTimeout(() => clearInterval(interval), 8000);
  }
  window.addEventListener("load", startHearts);

  window.addEventListener("load", () => {
    const images = document.querySelectorAll(".mag-img");
    images.forEach((img, i) => {
      setTimeout(() => {
        img.style.opacity = 1;
        img.style.transform = "translateY(0) scale(1)";
      }, i * 180);
    });
  
    typeWriter(
      "Love is found in the quiet moments, the shared smiles, and the stories we write together. " +
      "It’s in the laughter that fills the room, the gentle touches that speak volumes, and the way our hearts know each other even when words fail. " +
      "From morning coffee to evening walks, every little gesture becomes a part of the story we cherish. " +
      "Through challenges and joys, our bond grows stronger, reminding us that life is sweeter when shared. " +
      "Every heartbeat, every glance, every whispered secret is a thread in the tapestry of our love, weaving a story that is uniquely ours, " +
      "and forever beautiful in its simplicity and depth."
    );
  });
  

  const storyText = document.getElementById("story-text");
  let typingTimer;
  function typeWriter(text) {
    clearTimeout(typingTimer);
    storyText.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        storyText.textContent += text.charAt(i);
        i++;
        typingTimer = setTimeout(type, 35); 
      }
    }
    type();
  }