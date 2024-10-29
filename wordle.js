const wordList = ["gatos", "perro", "luces", "aguas", "llama", "joyas", "verde", "playa", "rueda", "nieve"];
let word = wordList[Math.floor(Math.random() * wordList.length)];
let currentGuess = "";
let currentRow = 0;
const rows = 6;
const cols = 5;
const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');


for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < cols; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        row.appendChild(tile);
    }
    grid.appendChild(row);
}


keyboard.addEventListener('click', function (e) {
    const key = e.target;
    if (key.classList.contains('key')) {
        if (key.id === 'enter') {
            handleSubmit();
        } else if (key.id === 'delete') {
            removeLetter();
        } else if (currentGuess.length < cols && currentRow < rows) {
            addLetter(key.textContent.toLowerCase());
        }
    }
});


document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        handleSubmit();
    } else if (e.key === 'Backspace') {
        removeLetter();
    } else if (e.key.match(/^[a-z]$/) && currentGuess.length < cols) {
        addLetter(e.key);
    }
});

 
function addLetter(letter) {
    if (currentGuess.length < cols) {
        currentGuess += letter;
        updateGrid();
    }
}


function removeLetter() {
    currentGuess = currentGuess.slice(0, -1);
    updateGrid();
}


function updateGrid() {
    const currentTiles = grid.querySelectorAll('.row')[currentRow].querySelectorAll('.tile');
    for (let i = 0; i < cols; i++) {
        currentTiles[i].textContent = currentGuess[i] || "";
    }
}


function handleSubmit() {
    if (currentGuess.length === cols) {
        checkGuess();
        if (currentGuess === word) {
            message.textContent = "¡Felicidades! Has acertado la palabra.";
        } else if (currentRow === rows - 1) {
            message.textContent = `Has perdido. La palabra era: ${word}`;
        } else {
            currentRow++;
            currentGuess = "";
        }
    }
}


function checkGuess() {
    const currentTiles = grid.querySelectorAll('.row')[currentRow].querySelectorAll('.tile');
    for (let i = 0; i < cols; i++) {
        if (currentGuess[i] === word[i]) {
            currentTiles[i].classList.add('correct');
        } else if (word.includes(currentGuess[i])) {
            currentTiles[i].classList.add('present');
        } else {
            currentTiles[i].classList.add('absent');
        }
    }
}
