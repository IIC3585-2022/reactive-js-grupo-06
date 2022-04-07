const {
	fromEvent,
	scan,
	Observable,
	throttleTime,
	timer,
	startWith,
} = require("rxjs");

fromEvent(document, "DOMContentLoaded").subscribe(() => {
	const scoreDisplay = document.getElementById("score");
	const width = 33;
	const height = 21;
	let score = 0;
	const grid = document.querySelector(".grid");

	const layout = [
		[
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		[
			1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 3, 0, 0, 0, 1,
		],
		[
			1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0,
			1, 1, 1, 1, 1, 1, 0, 1,
		],
		[
			1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
			0, 0, 0, 0, 0, 0, 0, 1,
		],
		[
			1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
			1, 1, 1, 1, 1, 1, 0, 1,
		],
		[
			1, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
			0, 0, 0, 3, 0, 0, 0, 1,
		],
		[
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		[
			4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0,
			1, 2, 2, 2, 2, 2, 2, 2,
		],
		[
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 0, 1, 0,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		[
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		],
		[
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		[
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
		],
		[
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		[
			4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0,
			1, 2, 2, 2, 2, 2, 2, 2,
		],
		[
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
		[
			1, 0, 0, 0, 3, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 1, 0,
			0, 0, 0, 3, 0, 0, 0, 1,
		],
		[
			1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
			1, 1, 1, 1, 1, 1, 0, 1,
		],
		[
			1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
			0, 0, 0, 0, 0, 0, 0, 1,
		],
		[
			1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0,
			1, 1, 1, 1, 1, 1, 0, 1,
		],
		[
			1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 3, 0, 0, 0, 1,
		],
		[
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
		],
	];

	max_points = 0;

	//Arreglar esto sí o sí
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
					max_points += 1;
				} else if (layout[i][j] === 1) {
					squares[i][j].classList.add("wall");
				} else if (layout[i][j] === 2) {
					squares[i][j].classList.add("spawn");
				} else if (layout[i][j] === 3) {
					squares[i][j].classList.add("power-up");
					max_points += 20;
				}
			}
		}
	}

	createBoard();

	class Pacman {
		constructor(name, initY, initX) {
			this.name = name;
			this.y = initY;
			this.x = initX;
		}
	}

	morty = new Pacman("morty", 15, 22);
	rick = new Pacman("rick", 15, 10);

	addToSquare(rick);
	addToSquare(morty);

	function removeFromSquare(unit) {
		squares[unit.y][unit.x].classList.remove(unit.name);
		if (unit.name == "ghost")
			squares[unit.y][unit.x].classList.remove("scared-ghost");
	}
	function addToSquare(unit) {
		squares[unit.y][unit.x].classList.add(unit.name);
		if (unit.name == "ghost") {
			if (unit.scared) squares[unit.y][unit.x].classList.add("scared-ghost");
		}
	}

	//Aquí se mueven los personajes
	fromEvent(document, "keydown").subscribe((key) => {
		if (key.code === "KeyA") {
			removeFromSquare(rick);
			if (rick.x === 0) {
				rick.x = 32;
			} else if (
				rick.x > 0 &&
				!squares[rick.y][rick.x - 1].classList.contains("wall")
			) {
				rick.x = rick.x - 1;
			}

			addToSquare(rick);
		} else if (key.code === "KeyW") {
			removeFromSquare(rick);
			if (
				rick.y > 0 &&
				!squares[rick.y - 1][rick.x].classList.contains("wall")
			) {
				rick.y -= 1;
			}
			addToSquare(rick);
		} else if (key.code === "KeyD") {
			removeFromSquare(rick);
			if (rick.x === 32) {
				rick.x = 0;
			} else if (
				rick.x < width &&
				!squares[rick.y][rick.x + 1].classList.contains("wall")
			) {
				rick.x += 1;
			}
			addToSquare(rick);
		} else if (key.code === "KeyS") {
			removeFromSquare(rick);
			if (
				!(
					rick.y === 7 &&
					(rick.x === 14 ||
						rick.x === 15 ||
						rick.x === 16 ||
						rick.x === 17 ||
						rick.x === 18)
				) &&
				rick.y < height &&
				!squares[rick.y + 1][rick.x].classList.contains("wall")
			) {
				rick.y += 1;
			}
			addToSquare(rick);
		} else if (key.code === "ArrowLeft") {
			removeFromSquare(morty);
			if (morty.x === 0) {
				morty.x = 32;
			} else if (
				morty.x > 0 &&
				!squares[morty.y][morty.x - 1].classList.contains("wall")
			) {
				morty.x = morty.x - 1;
			}
			addToSquare(morty);
		} else if (key.code === "ArrowUp") {
			removeFromSquare(morty);
			if (
				morty.y > 0 &&
				!squares[morty.y - 1][morty.x].classList.contains("wall")
			) {
				morty.y -= 1;
			}
			addToSquare(morty);
		} else if (key.code === "ArrowRight") {
			removeFromSquare(morty);
			if (morty.x === 32) {
				morty.x = 0;
			} else if (
				morty.x < width &&
				!squares[morty.y][morty.x + 1].classList.contains("wall")
			) {
				morty.x += 1;
			}
			addToSquare(morty);
		} else if (key.code === "ArrowDown") {
			removeFromSquare(morty);
			if (
				!(
					rick.y === 7 &&
					(rick.x === 14 ||
						rick.x === 15 ||
						rick.x === 16 ||
						rick.x === 17 ||
						rick.x === 18)
				) &&
				morty.y < height &&
				!squares[morty.y + 1][morty.x].classList.contains("wall")
			) {
				morty.y += 1;
			}
			addToSquare(morty);
		}

		foodEaten();
		powerUpEaten();
		checkLose();
		checkWin();
	});

	function foodEaten() {
		if (squares[rick.y][rick.x].classList.contains("food-dot")) {
			score++;
			scoreDisplay.innerHTML = score;
			squares[rick.y][rick.x].classList.remove("food-dot");
		}

		if (squares[morty.y][morty.x].classList.contains("food-dot")) {
			score++;
			scoreDisplay.innerHTML = score;
			squares[morty.y][morty.x].classList.remove("food-dot");
		}
	}

	class Ghost {
		constructor(initY, initX, speed) {
			this.initY = initY;
			this.initX = initX;
			this.y = initY;
			this.x = initX;
			this.name = "ghost";
			this.speed = speed;
			this.current_direction = "up";
			this.scared = false;
		}
	}

	const ghostArray = [
		new Ghost(10, 14, 500),
		new Ghost(10, 15, 1200),
		new Ghost(10, 16, 1800),
		new Ghost(10, 17, 4000),
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

		return valid_moves;
	}

	function moveGhost(ghost) {
		removeFromSquare(ghost);

		if (ghost.direction === "up") {
			ghost.y -= 1;
			addToSquare(ghost);
		} else if (ghost.direction === "down") {
			ghost.y += 1;
			addToSquare(ghost);
		} else if (ghost.direction === "right") {
			ghost.x += 1;
			addToSquare(ghost);
		} else if (ghost.direction === "left") {
			ghost.x -= 1;
			addToSquare(ghost);
		}
		/* 
		if (ghost.scared) {
			squares[ghost.y][ghost.x].classList.add("scared-ghost");
		} */

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

				ghost = moveGhost(ghost);
			}
		}, ghost.speed);
	}

	ghostArray.forEach((ghost) => movingGhost(ghost));

	function scaredGhost(ghost) {
		ghost.scared = true;
		addToSquare(ghost);
	}

	function unScareGhosts() {
		ghostArray.forEach((ghost) => {
			ghost.scared = false;
			squares[ghost.y][ghost.x].classList.remove("scared-ghost");
		});
	}

	let timer;

	const scareGhosts = () => {
		timer = window.setTimeout(() => {
			unScareGhosts();
		}, 6000);
	};

	function powerUpEaten() {
		if (squares[rick.y][rick.x].classList.contains("power-up")) {
			score += 20;
			scoreDisplay.innerHTML = score;
			squares[rick.y][rick.x].classList.remove("power-up");
			ghostArray.forEach((ghost) => scaredGhost(ghost));
			clearTimeout(timer);
			scareGhosts();
		} else if (squares[morty.y][morty.x].classList.contains("power-up")) {
			score += 20;
			scoreDisplay.innerHTML = score;
			squares[morty.y][morty.x].classList.remove("power-up");
			ghostArray.forEach((ghost) => scaredGhost(ghost));
			clearTimeout(timer);
			scareGhosts();
		}
	}

	function checkWin() {
		console.log(score);
		console.log(max_points);
		if (score === max_points) {
			console.log("you win");
		}
	}

	function checkLose() {
		lost = false;
		rick_square = squares[rick.y][rick.x];
		morty_square = squares[morty.y][morty.x];

		if (rick_square === morty_square) lost = true;
		if (
			rick_square.classList.contains("ghost") &&
			!rick_square.classList.contains("scared-ghost")
		)
			lost = true;
		if (
			morty_square.classList.contains("ghost") &&
			!morty_square.classList.contains("scared-ghost")
		)
			lost = true;

		if (lost) {
			console.log("PERDISTE");
			clearTimeout(timer);
			setTimeout(function () {
				alert("You have Lost!");
			}, 5);
		}
	}
});
