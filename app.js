const { fromEvent } = require("rxjs");

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  console.log("hola");
/* document.addEventListener('DOMContentLoaded', () => { */
  const scoreDisplay = document.getElementById("score");
  const width = 16;
  const height = 16;
  let score = 0;
  const grid = document.querySelector(".grid");

  const layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const squares = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  function createBoard() {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares[i].push(square);

        //add layout to the board
        if (layout[i][j] === 0) {
          squares[i][j].classList.add("food-dot");
        } else if (layout[i][j] === 1) {
          squares[i][j].classList.add("wall");
        } else if (layout[i][j] === 2) {
          squares[i][j].classList.add("spawn");
        } else if (layout[i][j] === 3) {
          squares[i][j].classList.add("super-food");
        }
      }
    }
  }
  createBoard();

  let pacmanY = 11;
  let pacmanX = 7;
  squares[pacmanY][pacmanX].classList.add("pac-man");

  const movePacman = (event) => {
    console.log("hola");
    squares[pacmanY][pacmanX].classList.remove("pac-man");

    switch (event.keyCode) {
      case 37:
        console.log("left");
        if (
          pacmanX > 0 &&
          !squares[pacmanY][pacmanX - 1].classList.contains("wall")
        ) {
          pacmanX -= 1;
        }
        break;
      case 38:
        console.log("right");
        if (
          pacmanY > 0 &&
          !squares[pacmanY - 1][pacmanX].classList.contains("wall")
        ) {
          pacmanY -= 1;
        }
        break;

      case 39:
        console.log("up");
        if (
          pacmanX < width &&
          !squares[pacmanY][pacmanX + 1].classList.contains("wall")
        ) {
          pacmanX += 1;
        }
        break;

      case 40:
        console.log("down");
        if (
          pacmanY < height &&
          !squares[pacmanY + 1][pacmanX].classList.contains("wall")
        ) {
          pacmanY += 1;
        }
        break;
    }

    squares[pacmanY][pacmanX].classList.add("pac-man");
    foodEaten();
  };

  document.addEventListener("keyup", movePacman);

  function foodEaten() {
    if (squares[pacmanY][pacmanX].classList.contains("food-dot")) {
      console.log("puntazo");
      score++;
      scoreDisplay.innerHTML = score;
      squares[pacmanY][pacmanX].classList.remove("food-dot");
    }
  }
  class Ghost {
    constructor(id, initY, initX, speed, current_direction) {
      this.id = id;
      this.y = initY;
      this.x = initX;
      this.speed = speed;
      this.current_direction = current_direction;
    }
  }

  const ghostArray = [
    new Ghost(0, 6, 5, 100, "up"),
    new Ghost(1, 6, 6, 200, "down"),
    new Ghost(2, 6, 7, 300, "left"),
    new Ghost(3, 6, 8, 400, "right"),
  ];

  ghostArray.forEach((ghost) =>
    squares[ghost.y][ghost.x].classList.add("ghost")
  );

  function validGhostSquare(square) {
      if(square.classList.conatins("wall") || square.classList.contains("ghost")) return true
      return false
  }

  /* function moveGhost(ghost) {
    const directions = ["up", "down", "left", "right"];

    ghost.timerId = setInterval(function () {
      if (ghost.current_direction == "up") {
        next_square = squares[ghost.y - 1][ghost.x];
        if validGhostSquare(next_square) {

        }
      }
    });
  } */
});
