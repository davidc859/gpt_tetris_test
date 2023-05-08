const gameBoard = document.getElementById('tetris-grid');
const scoreDisplay = document.getElementById('score');
const nextPiece = document.getElementById('next-piece');
const playerNameInput = document.getElementById('player-name');
const startButton = document.getElementById('start-button');

const width = 10;
const height = 20;
let score = 0;
let gameBoardArray = Array.from(Array(height), () => new Array(width).fill(0));
let currentPiece = generateTetromino();
let nextPieceValue = generateTetromino();
let playerName = '';

function generateTetromino() {
  const tetrominos = [    [[1, 1, 1, 1]], // I
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]] // Z
  ];

  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  return tetrominos[randomIndex];
}

function draw() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const square = document.createElement('div');
      if (gameBoardArray[i][j] === 0) {
        square.classList.add('tetromino');
      } else {
        square.classList.add(`tetromino-${gameBoardArray[i][j]}`);
      }
      gameBoard.appendChild(square);
    }
  }
}

function drawNextPiece() {
  nextPiece.innerHTML = '';
  for (let i = 0; i < nextPieceValue.length; i++) {
    for (let j = 0; j < nextPieceValue[i].length; j++) {
      const square = document.createElement('div');
      if (nextPieceValue[i][j] === 1) {
        square.classList.add(`tetromino-next-${nextPieceValue.length}`);
      }
      nextPiece.appendChild(square);
    }
    const lineBreak = document.createElement('br');
    nextPiece.appendChild(lineBreak);
  }
}

function moveDown() {
  if (!collision(0, 1, currentPiece)) {
    currentPiece.y++;
  } else {
    merge(currentPiece);
    currentPiece = nextPieceValue;
    nextPieceValue = generateTetromino();
    drawNextPiece();
    score += removeFullRows();
    scoreDisplay.innerHTML = score;
    if (checkGameOver()) {
      gameOver();
      return;
    }
  }
  draw();
  setTimeout(moveDown, 500);
}

function collision(x, y, piece) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 0) {
        continue;
      }
      const newX = j + x + currentPiece.x;
      const newY = i + y + currentPiece.y;
      if (newX < 0 || newX >= width || newY >= height) {
        return true;
function handleKeyPress(event) {
switch (event.keyCode) {
case 37:
if (!collision(-1, 0, currentPiece)) {
currentPiece.x--;
}
break;
case 39:
if (!collision(1, 0, currentPiece)) {
currentPiece.x++;
}
break;
case 40:
if (!collision(0, 1, currentPiece)) {
currentPiece.y++;
}
break;
case 38:
currentPiece = rotate(currentPiece);
break;
case 32:
while (!collision(0, 1, currentPiece)) {
currentPiece.y++;
}
moveDown();
break;
}
draw();
}

function rotate(piece) {
const rotatedPiece = [];
for (let i = 0; i < piece[0].length; i++) {
const newRow = [];
for (let j = piece.length - 1; j >= 0; j--) {
newRow.push(piece[j][i]);
}
rotatedPiece.push(newRow);
}
if (collision(0, 0, rotatedPiece)) {
return piece;
}
return rotatedPiece;
}

function drawGameOver() {
gameBoard.innerHTML = 'Game Over';
document.removeEventListener('keydown', handleKeyPress);
}

function startGame() {
const playerName = document.getElementById('player-name-input').value;
if (playerName === '') {
alert('Please enter your name to start the game.');
return;
}
document.getElementById('player-name').innerHTML = playerName;
document.getElementById('start-screen').style.display = 'none';
document.getElementById('game-container').style.display = 'flex';
document.addEventListener('keydown', handleKeyPress);
drawNextPiece();
draw();
setTimeout(moveDown, 500);
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', () => {
window.location.reload();
});
function draw() {
gameBoard.innerHTML = '';
for (let i = 0; i < height; i++) {
for (let j = 0; j < width; j++) {
const square = document.createElement('div');
if (gameBoardArray[i][j] === 0) {
square.classList.add('tetromino');
} else {
square.classList.add(tetromino-${gameBoardArray[i][j]});
}
gameBoard.appendChild(square);
}
}
}

function drawNextPiece() {
nextPiece.innerHTML = '';
for (let i = 0; i < nextPieceValue.length; i++) {
for (let j = 0; j < nextPieceValue[i].length; j++) {
const square = document.createElement('div');
if (nextPieceValue[i][j] === 1) {
square.classList.add(tetromino-next-${nextPieceValue.length});
}
nextPiece.appendChild(square);
}
const lineBreak = document.createElement('br');
nextPiece.appendChild(lineBreak);
}
}

function moveDown() {
if (!collision(0, 1, currentPiece)) {
currentPiece.y++;
} else {
merge(currentPiece);
currentPiece = nextPieceValue;
nextPieceValue = generateTetromino();
drawNextPiece();
score += removeFullRows();
scoreDisplay.innerHTML = score;
if (checkGameOver()) {
drawGameOver();
return;
}
}
draw();
setTimeout(moveDown, 500);
}

function collision(x, y, piece) {
for (let i = 0; i < piece.length; i++) {
for (let j = 0; j < piece[i].length; j++) {
if (piece[i][j] === 0) {
continue;
}
const newX = j + x + currentPiece.x;
const newY = i + y + currentPiece.y;
if (newX < 0 || newX >= width || newY >= height) {
return true;
}
if (newY < 0) {
continue;
}
if (gameBoardArray[newY][newX] !== 0) {
return true;
}
}
}
return false;
}

function merge(piece) {
for (let i = 0; i < piece.length; i++) {
for (let j = 0; j < piece[i].length; j++) {
if (piece[i][j] !== 0) {
gameBoardArray[piece.y + i][piece.x + j] = piece[i][j];
}
}
}
}

function removeFullRows() {
let rowsToRemove = 0;
for (let i = height - 1; i >= 0; i--) {
if (gameBoardArray[i].every(square => square !== 0)) {
gameBoardArray.splice(i, 1);
gameBoardArray.unshift(new Array(width).fill(0));
rowsToRemove++;
i++;
}
}
return rowsToRemove * 100;
}

function checkGameOver() {
return gameBoardArray[0].some(square => square !== 0);
}

document.getElementById('start-screen').style.display = 'flex';

function handleKeyPress(event) {
switch (event.keyCode) {
case 37:
if (!collision(-1, 0, currentPiece)) {
currentPiece.x--;
}
break;
case 39:
if (!collision(1, 0, currentPiece)) {
currentPiece.x++;
}
break;
case 40:
if (!collision(0, 1, currentPiece)) {
currentPiece.y++;
}
break;
case 38:
currentPiece = rotate(currentPiece);
break;
}
draw();
}

function rotate(piece) {
const rotatedPiece = [];
for (let i = 0; i < piece[0].length; i++) {
const newRow = [];
for (let j = piece.length - 1; j >= 0; j--) {
newRow.push(piece[j][i]);
}
rotatedPiece.push(newRow);
}
if (collision(0, 0, rotatedPiece)) {
return piece;
}
return rotatedPiece;
}

function drawNextPiece() {
nextPiece.innerHTML = '';
for (let i = 0; i < nextPieceValue.length; i++) {
for (let j = 0; j < nextPieceValue[i].length; j++) {
const square = document.createElement('div');
if (nextPieceValue[i][j] === 1) {
square.classList.add(tetromino-next-${nextPieceValue.length});
}
nextPiece.appendChild(square);
}
const lineBreak = document.createElement('br');
nextPiece.appendChild(lineBreak);
}
}

function removeFullRows() {
let rowsToRemove = 0;
for (let i = height - 1; i >= 0; i--) {
if (gameBoardArray[i].every(square => square !== 0)) {
gameBoardArray.splice(i, 1);
gameBoardArray.unshift(new Array(width).fill(0));
rowsToRemove++;
i++;
}
}
return rowsToRemove * 100;
}

function checkGameOver() {
return gameBoardArray[0].some(square => square !== 0);
}

function gameOver() {
gameBoard.innerHTML = 'Game Over';
document.removeEventListener('keydown', handleKeyPress);
}

drawNextPiece();
draw();
document.addEventListener('keydown', handleKeyPress);
startButton.addEventListener('click', startGame);
nameInput.focus();
function gameOver() {
gameBoard.innerHTML = 'Game Over';
document.removeEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
switch (event.keyCode) {
case 37:
if (!collision(-1, 0, currentPiece)) {
currentPiece.x--;
}
break;
case 39:
if (!collision(1, 0, currentPiece)) {
currentPiece.x++;
}
break;
case 40:
if (!collision(0, 1, currentPiece)) {
currentPiece.y++;
}
break;
case 38:
currentPiece = rotate(currentPiece);
break;
}
draw();
}

function rotate(piece) {
const rotatedPiece = [];
for (let i = 0; i < piece[0].length; i++) {
const newRow = [];
for (let j = piece.length - 1; j >= 0; j--) {
newRow.push(piece[j][i]);
}
rotatedPiece.push(newRow);
}
if (collision(0, 0, rotatedPiece)) {
return piece;
}
return rotatedPiece;
}

drawNextPiece();
draw();
setTimeout(moveDown, 500);

document.getElementById('start-button').addEventListener('click', () => {
document.getElementById('game-container').classList.add('game-started');
document.getElementById('start-screen').style.display = 'none';
document.getElementById('name-input').blur();
setTimeout(moveDown, 500);
document.addEventListener('keydown', handleKeyPress);
});

document.getElementById('name-input').addEventListener('input', (event) => {
const playerName = event.target.value;
document.getElementById('player-name').innerHTML = playerName ? playerName : 'Player';
});

document.getElementById('restart-button').addEventListener('click', () => {
window.location.reload();
});
// Add event listener for the pause button
document.getElementById('pause-button').addEventListener('click', () => {
if (gamePaused) {
gamePaused = false;
document.getElementById('pause-button').innerHTML = 'Pause';
setTimeout(moveDown, 500);
} else {
gamePaused = true;
document.getElementById('pause-button').innerHTML = 'Resume';
}
});

// Add event listener for the mute button
document.getElementById('mute-button').addEventListener('click', () => {
if (gameMuted) {
gameMuted = false;
document.getElementById('mute-button').innerHTML = 'Mute';
themeSong.play();
} else {
gameMuted = true;
document.getElementById('mute-button').innerHTML = 'Unmute';
themeSong.pause();
}
});
// Helper function to get the player's name
function getPlayerName() {
let name = prompt("Enter your name:");
while (!name) {
name = prompt("Please enter a valid name:");
}
return name;
}

// Initialize the game
let gamePaused = false;
let gameMuted = false;
let playerName = getPlayerName();
let themeSong = new Audio('theme.mp3');
themeSong.loop = true;
if (!gameMuted) {
themeSong.play();
}

// Add event listener for the start button
document.getElementById('start-button').addEventListener('click', () => {
document.getElementById('start-menu').style.display = 'none';
document.getElementById('game-container').style.display = 'flex';
document.getElementById('player-name').innerHTML = playerName;
setTimeout(moveDown, 500);
});

// Add event listener for the restart button
document.getElementById('restart-button').addEventListener('click', () => {
gameBoardArray = Array.from(Array(height), () => new Array(width).fill(0));
score = 0;
scoreDisplay.innerHTML = score;
currentPiece = generateTetromino();
nextPieceValue = generateTetromino();
drawNextPiece();
draw();
setTimeout(moveDown, 500);
});

// Add event listener for the play again button
document.getElementById('play-again-button').addEventListener('click', () => {
document.getElementById('game-over-menu').style.display = 'none';
gameBoardArray = Array.from(Array(height), () => new Array(width).fill(0));
score = 0;
scoreDisplay.innerHTML = score;
currentPiece = generateTetromino();
nextPieceValue = generateTetromino();
drawNextPiece();
draw();
setTimeout(moveDown, 500);
});

// Add event listener for the instructions button
document.getElementById('instructions-button').addEventListener('click', () => {
document.getElementById('start-menu').style.display = 'none';
document.getElementById('instructions-menu').style.display = 'flex';
});

// Add event listener for the back button in instructions menu
document.getElementById('instructions-back-button').addEventListener('click', () => {
document.getElementById('instructions-menu').style.display = 'none';
document.getElementById('start-menu').style.display = 'flex';
});

// Add event listener for the submit button in the name form
document.getElementById('submit-name').addEventListener('click', () => {
const nameInput = document.getElementById('name-input');
const playerName = nameInput.value;
if (playerName) {
document.getElementById('start-menu').style.display = 'none';
document.getElementById('game-container').style.display = 'flex';
document.getElementById('player-name').innerHTML = playerName;
currentPiece = generateTetromino();
nextPieceValue = generateTetromino();
drawNextPiece();
draw();
setTimeout(moveDown, 500);
}
});

// Add event listener for the keydown event
document.addEventListener('keydown', handleKeyPress);

// Function to handle key press events
function handleKeyPress(event) {
switch (event.keyCode) {
case 37:
if (!collision(-1, 0, currentPiece)) {
currentPiece.x--;
}
break;
case 39:
if (!collision(1, 0, currentPiece)) {
currentPiece.x++;
}
break;
case 40:
if (!collision(0, 1, currentPiece)) {
currentPiece.y++;
}
break;
case 38:
currentPiece = rotate(currentPiece);
break;
}
draw();
}

// Function to rotate the current tetromino
function rotate(piece) {
const rotatedPiece = [];
for (let i = 0; i < piece[0].length; i++) {
const newRow = [];
for (let j = piece.length - 1; j >= 0; j--) {
newRow.push(piece[j][i]);
}
rotatedPiece.push(newRow);
}
if (collision(0, 0, rotatedPiece)) {
return piece;
}
return rotatedPiece;
}

// Function to merge the current tetromino into the game board
function merge(piece) {
for (let i = 0; i < piece.length; i++) {
for (let j = 0; j < piece[i].length; j++) {
if (piece[i][j] !== 0) {
gameBoardArray[piece.y + i][piece.x + j] = piece[i][j];
}
}
}
}

// Function to remove full rows from the game board and update the score
function removeFullRows() {
let rowsToRemove = 0;
for (let i = height - 1; i >= 0; i--) {
if (gameBoardArray[i].every(square => square !== 0)) {
gameBoardArray.splice(i, 1);
gameBoardArray.unshift(new Array(width).fill(0));
rowsToRemove++;
i++;
}
}
return rowsToRemove * 100;
}

// Function to check if the game is over
function checkGameOver() {
return gameBoardArray[0].some(square => square !== 0);
}

// Function to handle game over
function gameOver() {
gameBoard.innerHTML = 'Game Over';
document.removeEventListener('keydown', handleKeyPress);
}

// Function to start a new game
function newGame() {
gameBoardArray = Array.from(Array(height), () => new Array(width).fill(0));
score = 0;
scoreDisplay.innerHTML = score;
draw();
currentPiece = generateTetromino();
nextPieceValue = generateTetromino();
drawNextPiece();
setTimeout(moveDown, 500);
document.addEventListener('keydown', handleKeyPress);
}

// Add event listener for the play again button in the game over screen
document.getElementById('play-again').addEventListener('click', () => {
document.getElementById('game-over').style.display = 'none';
newGame();
});

function updateName() {
  const nameInput = document.getElementById('name-input');
  const nameDisplay = document.getElementById('name-display');
  const name = nameInput.value;
  nameDisplay.innerHTML = name;
}

function startGame() {
  const startButton = document.getElementById('start-button');
  const introScreen = document.getElementById('intro-screen');
  introScreen.style.display = 'none';
  document.addEventListener('keydown', handleKeyPress);
  drawNextPiece();
  draw();
  setTimeout(moveDown, 500);
}

const nameInput = document.getElementById('name-input');
nameInput.addEventListener('input', updateName);

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);