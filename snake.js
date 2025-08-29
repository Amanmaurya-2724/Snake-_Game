const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake, food, score, highScore = 0, d, game;

function initGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 29) * box,
    y: Math.floor(Math.random() * 29) * box
  };
  score = 0;
  d = undefined;
  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("highScore").innerText = "High Score: " + highScore;
  clearInterval(game);
  game = setInterval(draw, 100);
}

// Control snake
document.addEventListener("keydown", direction);
function direction(event) {
  if (event.key === "ArrowUp" && d !== "DOWN") d = "UP";
  else if (event.key === "ArrowDown" && d !== "UP") d = "DOWN";
  else if (event.key === "ArrowLeft" && d !== "RIGHT") d = "LEFT";
  else if (event.key === "ArrowRight" && d !== "LEFT") d = "RIGHT";
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 600, 600);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lime";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score += 10;
    if (score > highScore) highScore = score;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("highScore").innerText = "High Score: " + highScore;

    food = {
      x: Math.floor(Math.random() * 29) * box,
      y: Math.floor(Math.random() * 29) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 || snakeX >= 600 || snakeY < 0 || snakeY >= 600 ||
    snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
  ) {
    clearInterval(game);
    alert("Game Over! Final Score: " + score);
    initGame(); // restart game automatically after alert
    return;
  }

  snake.unshift(newHead);
}

// Start game first time
initGame();
