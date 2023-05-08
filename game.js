const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth,
      brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

scss
Copy code
            brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
}

function collisionDetection() {
for (let c = 0; c < brickColumnCount; c++) {
for (let r = 0; r < brickRowCount; r++) {
const b = bricks[c][r];
if (b.status === 1) {
if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
dy = -dy;
b.status = 0;
}
}
}
}
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBricks();
drawBall();
drawPaddle();
collisionDetection();
if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
}
if (y + dy < ballRadius) {
    dy = -dy;
} else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
}

if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
} else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
}

x += dx;
y += dy;
}

const interval = setInterval(draw, 10);

Ce code HTML et JavaScript complet crée un jeu de casse-briques avec une balle, une raquette, et des briques à casser. Les briques disparaissent lorsqu'elles sont touchées par la balle, et la direction de la balle change. Si la balle touche le bas de l'écran sans être renvoyée par la raquette, le jeu se termine et affiche un message "GAME OVER".
