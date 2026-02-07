const words = ["LOVE", "HEART", "ROMANCE", "HUGS"];
const gridSize = 8;
const grid = document.getElementById("grid");
const popup = document.getElementById("popup");
const nextBtn = document.getElementById("next-btn");

let cells = [];
let selectedCells = [];
let foundWords = [];

function initGrid() {
  grid.innerHTML = "";
  cells = [];
  selectedCells = [];
  foundWords = [];

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      grid.appendChild(cell);
      cells.push(cell);

      cell.addEventListener("click", () => selectCell(cell));
    }
  }

  words.forEach(word => placeWord(word));
  popup.style.display = "none";
}

function placeWord(word) {
  let placed = false;
  while (!placed) {
    const dir = Math.random() < 0.5 ? "H" : "V";
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);

    if (dir === "H" && col + word.length <= gridSize) {
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const index = row * gridSize + (col + i);
        if (cells[index].dataset.word && cells[index].dataset.word !== word[i]) {
          canPlace = false;
          break;
        }
      }
      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const index = row * gridSize + (col + i);
          cells[index].textContent = word[i];
          cells[index].dataset.word = word[i];
        }
        placed = true;
      }
    } else if (dir === "V" && row + word.length <= gridSize) {
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const index = (row + i) * gridSize + col;
        if (cells[index].dataset.word && cells[index].dataset.word !== word[i]) {
          canPlace = false;
          break;
        }
      }
      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const index = (row + i) * gridSize + col;
          cells[index].textContent = word[i];
          cells[index].dataset.word = word[i];
        }
        placed = true;
      }
    }
  }
}

function selectCell(cell) {
  if (cell.classList.contains("found")) return;

  if (selectedCells.includes(cell)) {
    cell.classList.remove("selected");
    selectedCells = selectedCells.filter(c => c !== cell);
  } else {
    cell.classList.add("selected");
    selectedCells.push(cell);
  }

  checkWord();
}

function checkWord() {
  let rows = selectedCells.map(c => parseInt(c.dataset.row));
  let cols = selectedCells.map(c => parseInt(c.dataset.col));

  if (new Set(rows).size === 1) {
    let sorted = selectedCells.sort((a, b) => parseInt(a.dataset.col) - parseInt(b.dataset.col));
    let str = sorted.map(c => c.textContent).join("");
    if (words.includes(str) && !foundWords.includes(str)) {
      sorted.forEach(c => { c.classList.remove("selected"); c.classList.add("found"); });
      foundWords.push(str);
      selectedCells = [];
      checkAllFound();
    }
  }

  if (new Set(cols).size === 1) {
    let sorted = selectedCells.sort((a, b) => parseInt(a.dataset.row) - parseInt(b.dataset.row));
    let str = sorted.map(c => c.textContent).join("");
    if (words.includes(str) && !foundWords.includes(str)) {
      sorted.forEach(c => { c.classList.remove("selected"); c.classList.add("found"); });
      foundWords.push(str);
      selectedCells = [];
      checkAllFound();
    }
  }
}

function checkAllFound() {
  if (foundWords.length === words.length) {
    popup.style.display = "flex";
  }
}

nextBtn.addEventListener("click", () => {
  window.location.href = "pop-up.html"; 
});

initGrid();
