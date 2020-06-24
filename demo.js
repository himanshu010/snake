function init() {
  score = 4;
  game_over = false;

  canvas = document.getElementById("mycanvas");
  w = h = canvas.width = canvas.height = 1100;
  pen = canvas.getContext("2d");
  cs = 66;
  food = getfood();

  snake = {
    init_lenght: 4,
    color: "Green",
    cells: [],
    direction: "right",

    createsnake: function () {
      for (var i = this.init_lenght; i > 0; i--)
        this.cells.push({ a: i, b: 2 });
    },

    drawsnake: function () {
      var gradient1 = pen.createLinearGradient(50, 10, 700, 10);
      gradient1.addColorStop(0, "aqua");
      gradient1.addColorStop(1, "rgba(20, 00, 205, 0.8)");
      pen.fillStyle = gradient1;
      for (var i = 0; i < this.cells.length; i++)
        pen.fillRect(
          this.cells[i].a * cs,
          this.cells[i].b * cs,
          cs - 2,
          cs - 2
        );
    },
    updatesnake: function () {
      console.log("Hello from update");

      if (this.cells[0].a == food.x && this.cells[0].b == food.y) {
        food = getfood();
        console.log("food eaten");
      } else {
        this.cells.pop();
      }

      var nextX;
      var nextY;
      if (this.direction == "right") {
        nextX = this.cells[0].a + 1;
        nextY = this.cells[0].b;
      } else if (this.direction == "left") {
        nextX = this.cells[0].a - 1;
        nextY = this.cells[0].b;
      } else if (this.direction == "up") {
        nextX = this.cells[0].a;
        nextY = this.cells[0].b - 1;
      } else {
        nextX = this.cells[0].a;
        nextY = this.cells[0].b + 1;
      }

      this.cells.unshift({ a: nextX, b: nextY });
      var last_x = Math.round(w / cs);
      var last_y = Math.round(h / cs);

      if (
        this.cells[0].b < 0 ||
        this.cells[0].a < 0 ||
        this.cells[0].a > last_x ||
        this.cells[0].b > last_y
      ) {
        console.log("game over");
        game_over = true;
        return;
      }

      var f = this.cells[0].a;
      var k = this.cells[0].b;

      for (var i = 1; i < this.cells.length; i++) {
        if (f == this.cells[i].a && k == this.cells[i].b) {
          console.log("game over");
          game_over = true;
          return;
        }
      }
    },
  };

  snake.createsnake();
  function keypressed(e) {
    console.log("keypressed", e.key);
    if (e.key == "ArrowRight" && snake.direction !== "left") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft" && snake.direction !== "right") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown" && snake.direction !== "up") {
      snake.direction = "down";
    } else if (e.key == "ArrowUp" && snake.direction !== "down") {
      snake.direction = "up";
    }
  }

  document.addEventListener("keydown", keypressed);
}
function drawfood() {
  pen.fillRect(food.x * cs, food.y * cs, cs, cs);
}

function draw() {
  pen.clearRect(0, 0, w, h);

  snake.drawsnake();
  pen.fillStyle = food.color;
  drawfood();
}
function update() {
  snake.updatesnake();
}
function getfood() {
  var foodX = Math.round((Math.random() * (w - cs)) / cs);
  var foodY = Math.round((Math.random() * (h - cs)) / cs);

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}
init();
function gameloop() {
  if (game_over == true) {
    alert("Game Over");
    clearInterval(f);

    return;
  }
  draw();
  update();
}

var f = setInterval(gameloop, 100);
