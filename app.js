const { fromEvent, of } = require("rxjs");

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

	//Crea el tablero
	const squares = layout.map((row, i, a) => {
		return row.map((value, index, array) => {
			const square = document.createElement("div");
			grid.appendChild(square);
			if (value === 0) {
				square.classList.add("food-dot");
				max_points += 1;
			} else if (value === 1) {
				square.classList.add("wall");
			} else if (value === 2) {
				square.classList.add("spawn");
			} else if (value === 3) {
				square.classList.add("power-up");
				max_points += 20;
			}
			return square;
		});
	});

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
	keyMovement = fromEvent(document, "keydown").subscribe((key) => {
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
					morty.y === 7 &&
					(morty.x === 14 ||
						morty.x === 15 ||
						morty.x === 16 ||
						morty.x === 17 ||
						morty.x === 18)
				) &&
				morty.y < height &&
				!squares[morty.y + 1][morty.x].classList.contains("wall")
			) {
				morty.y += 1;
			}
			addToSquare(morty);
		}

		foodEaten();
		eatGhost();
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
		new Ghost(10, 14, 175),
		new Ghost(10, 15, 150),
		new Ghost(10, 16, 125),
		new Ghost(10, 17, 200),
	];

	ghostArray.forEach((ghost) =>
		squares[ghost.y][ghost.x].classList.add("ghost")
	);

	function validGhostSquare(square) {
		//Este es en caso de estar en un extremo que no analize una casilla que no existe
		if (!square) return true;

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

		if (ghost.current_direction === "up") {
			ghost.y -= 1;
			addToSquare(ghost);
		} else if (ghost.current_direction === "down") {
			ghost.y += 1;
			addToSquare(ghost);
		} else if (ghost.current_direction === "right") {
			if (ghost.x === 32) {
				ghost.x = 0;
			} else {
				ghost.x += 1;
			}
			addToSquare(ghost);
		} else if (ghost.current_direction === "left") {
			if (ghost.x === 0) {
				ghost.x = 32;
			} else {
				ghost.x -= 1;
			}
			addToSquare(ghost);
		}
		checkLose();
		eatGhost();
		/* 
		if (ghost.scared) {
			squares[ghost.y][ghost.x].classList.add("scared-ghost");
		} */

		return ghost;
	}

	function movingGhost(ghost) {
		ghost.timerId = setInterval(function () {
			const valid_moves = validGhostMoves(ghost);

			//Esto es pa que el fantasma pueda escapar, si tiene 4 valid moves significa que está en spawn
			if (
				valid_moves.length === 3 ||
				!valid_moves.includes(ghost.current_direction)
			) {
				direction = valid_moves[Math.floor(Math.random() * valid_moves.length)];
				ghost.current_direction = direction;

				ghost = moveGhost(ghost);
			} else moveGhost(ghost);
		}, ghost.speed);
	}

	of(...ghostArray).subscribe((next) => movingGhost(next));

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
		if (score >= max_points) {
			alert(`¡Han ganado! Su puntaje total es de: ${score}`);
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
			keyMovement.unsubscribe();
			clearTimeout(timer);
			setTimeout(function () {
				alert(`¡Han perdido! Su puntaje total es de: ${score}`);
			}, 5);
		}
	}

	function eatGhost() {
		rick_square = squares[rick.y][rick.x];
		morty_square = squares[morty.y][morty.x];

		ghostArray.forEach((ghost) => {
			if (ghost.scared) {
				if (
					(ghost.y === rick.y && ghost.x === rick.x) ||
					(ghost.y === morty.y && ghost.x === morty.x)
				) {
					squares[ghost.y][ghost.x].classList.remove("ghost");
					squares[ghost.y][ghost.x].classList.remove("scared-ghost");
					ghost.scared = false;
					ghost.current_direction = "up";
					ghost.y = ghost.initY;
					ghost.x = ghost.initX;
					addToSquare(ghost);
				}
			}
		});
	}
});
