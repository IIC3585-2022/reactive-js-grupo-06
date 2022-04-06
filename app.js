const { fromEvent, scan, Observable, throttleTime } = require("rxjs");

fromEvent(document, "DOMContentLoaded").subscribe(() => {
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

	fromEvent(document, "keydown").subscribe((key) => {
		console.log("recibido");
		console.log(key);
		console.log(key.code);
		console.log(squares[pacmanY][pacmanX]);
		squares[pacmanY][pacmanX].classList.add("holdmfie");
		squares[pacmanY][pacmanX].classList.remove("holdmfie");
		squares[pacmanY][pacmanX].classList.remove("pac-man");
		console.log(squares[pacmanY][pacmanX]);

		if (key.code === "KeyA" || key.code === "ArrowLeft") {
			if (
				pacmanX > 0 &&
				!squares[pacmanY][pacmanX - 1].classList.contains("wall")
			) {
				console.log("ya cachamos");
				console.log(pacmanX);
				pacmanX = pacmanX - 1;
			}
		} else if (key.code === "KeyW" || key.code === "ArrowUp") {
			if (
				pacmanY > 0 &&
				!squares[pacmanY - 1][pacmanX].classList.contains("wall")
			) {
				pacmanY -= 1;
			}
		} else if (key.code === "KeyD" || key.code === "ArrowRight") {
			if (
				pacmanX < width &&
				!squares[pacmanY][pacmanX + 1].classList.contains("wall")
			) {
				pacmanX += 1;
			}
		} else if (key.code === "KeyS" || key.code === "ArrowDown") {
			if (
				pacmanY < height &&
				!squares[pacmanY + 1][pacmanX].classList.contains("wall")
			) {
				pacmanY += 1;
			}
		}
		console.log(pacmanY, pacmanX);
		squares[pacmanY][pacmanX].classList.add("pac-man");
		foodEaten();
	});

	function foodEaten() {
		if (squares[pacmanY][pacmanX].classList.contains("food-dot")) {
			score++;
			scoreDisplay.innerHTML = score;
			squares[pacmanY][pacmanX].classList.remove("food-dot");
		}
	}

	class Ghost {
		constructor(id, initY, initX, speed) {
			this.id = id;
			this.y = initY;
			this.x = initX;
			this.speed = speed;
			this.current_direction = "up";
		}
	}

	const ghostArray = [
		new Ghost(0, 6, 5, 400),
		new Ghost(1, 6, 6, 500),
		new Ghost(2, 6, 7, 600),
		new Ghost(3, 6, 8, 700),
	];

	ghostArray.forEach((ghost) =>
		squares[ghost.y][ghost.x].classList.add("ghost")
	);

	function validGhostSquare(square) {
		if (square.classList.contains("wall") || square.classList.contains("ghost"))
			return false;
		return true;
	}

	function validGhostMoves(ghost) {
		valid_moves = [];
		up_square = squares[ghost.y - 1][ghost.x];
		if (validGhostSquare(up_square)) valid_moves.push("up");
		down_square = squares[ghost.y + 1][ghost.x];
		if (validGhostSquare(down_square)) valid_moves.push("down");
		left_square = squares[ghost.y][ghost.x - 1];
		if (validGhostSquare(left_square)) valid_moves.push("left");
		right_square = squares[ghost.y][ghost.x + 1];
		if (validGhostSquare(right_square)) valid_moves.push("right");

		console.log(valid_moves);
		return valid_moves;
	}

	function moveGhost(ghost) {
		squares[ghost.y][ghost.x].classList.remove("ghost");
		if (ghost.direction === "up") {
			console.log("up");
			ghost.y -= 1;
			squares[ghost.y][ghost.x].classList.add("ghost");
		} else if (ghost.direction === "down") {
			console.log("down");
			ghost.y += 1;
			squares[ghost.y][ghost.x].classList.add("ghost");
		} else if (ghost.direction === "right") {
			console.log("right");
			ghost.x += 1;
			squares[ghost.y][ghost.x].classList.add("ghost");
		} else if (ghost.direction === "left") {
			console.log("left");
			ghost.x -= 1;
			squares[ghost.y][ghost.x].classList.add("ghost");
		}

		return ghost;
	}

	function movingGhost(ghost) {
		ghost.timerId = setInterval(function () {
			const valid_moves = validGhostMoves(ghost);

			//Esto es pa que el fantasma pueda escapar, si tiene 4 valid moves significa que está ens pawn
			if (valid_moves.includes(ghost.direction) && valid_moves.length != 4) {
				moveGhost(ghost, ghost.direction);
			} else {
				direction = valid_moves[Math.floor(Math.random() * valid_moves.length)];
				ghost.direction = direction;
				console.log("cambio la direccion a:", direction);
				ghost = moveGhost(ghost);
				console.log(ghost.y, ghost.x);
			}
		}, ghost.speed);
	}

	ghostArray.forEach((ghost) => movingGhost(ghost));
});
