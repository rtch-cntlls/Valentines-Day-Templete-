const unlockBtn = document.getElementById("unlock-btn");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("error-msg");
const card = document.querySelector(".login-card");

const SECRET = "love";

unlockBtn.addEventListener("click", unlock);
passwordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") unlock();
});

function unlock() {
  if (passwordInput.value.toLowerCase() === SECRET) {
    card.style.animation = "fadeUp .6s ease reverse forwards";
    setTimeout(() => {
      window.location.href = "heart-catcher.html";
    }, 500);
  } else {
    errorMsg.style.display = "block";
    card.classList.add("shake");
    passwordInput.value = "";
    setTimeout(() => card.classList.remove("shake"), 400);
  }
}
