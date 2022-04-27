const { fromEvent, of } = require("rxjs");
import {
	createMap,
	removeFromSquare,
	addToSquare,
	foodEaten,
	addGhosts,
} from "./src/display.js";
import {
	Pacman,
	movingGhost,
	powerUpEaten,
	eatGhost,
	checkWin,
	checkLose,
} from "./src/game.js";

fromEvent(document, "DOMContentLoaded").subscribe(() => {
	const scoreDisplay = document.getElementById("score");
	const width = 33;
	const height = 21;
	let score = 0;
	const grid = document.querySelector(".grid");
	const map = createMap(document, grid);

	const morty = new Pacman("morty", 15, 22);
	const rick = new Pacman("rick", 15, 10);

	addToSquare(map, rick);
	addToSquare(map, morty);

	//Aquí se mueven los personajes
	const keyMovement = fromEvent(document, "keydown").subscribe((key) => {
		if (key.code === "KeyA") {
			removeFromSquare(map, rick);
			if (rick.x === 0) {
				rick.x = 32;
			} else if (
				rick.x > 0 &&
				!map.squares[rick.y][rick.x - 1].classList.contains("wall")
			) {
				rick.x = rick.x - 1;
			}

			addToSquare(map, rick);
		} else if (key.code === "KeyW") {
			removeFromSquare(map, rick);
			if (
				rick.y > 0 &&
				!map.squares[rick.y - 1][rick.x].classList.contains("wall")
			) {
				rick.y -= 1;
			}
			addToSquare(map, rick);
		} else if (key.code === "KeyD") {
			removeFromSquare(map, rick);
			if (rick.x === 32) {
				rick.x = 0;
			} else if (
				rick.x < width &&
				!map.squares[rick.y][rick.x + 1].classList.contains("wall")
			) {
				rick.x += 1;
			}
			addToSquare(map, rick);
		} else if (key.code === "KeyS") {
			removeFromSquare(map, rick);
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
				!map.squares[rick.y + 1][rick.x].classList.contains("wall")
			) {
				rick.y += 1;
			}
			addToSquare(map, rick);
		} else if (key.code === "ArrowLeft") {
			removeFromSquare(map, morty);
			if (morty.x === 0) {
				morty.x = 32;
			} else if (
				morty.x > 0 &&
				!map.squares[morty.y][morty.x - 1].classList.contains("wall")
			) {
				morty.x = morty.x - 1;
			}
			addToSquare(map, morty);
		} else if (key.code === "ArrowUp") {
			removeFromSquare(map, morty);
			if (
				morty.y > 0 &&
				!map.squares[morty.y - 1][morty.x].classList.contains("wall")
			) {
				morty.y -= 1;
			}
			addToSquare(map, morty);
		} else if (key.code === "ArrowRight") {
			removeFromSquare(map, morty);
			if (morty.x === 32) {
				morty.x = 0;
			} else if (
				morty.x < width &&
				!map.squares[morty.y][morty.x + 1].classList.contains("wall")
			) {
				morty.x += 1;
			}
			addToSquare(map, morty);
		} else if (key.code === "ArrowDown") {
			removeFromSquare(map, morty);
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
				!map.squares[morty.y + 1][morty.x].classList.contains("wall")
			) {
				morty.y += 1;
			}
			addToSquare(map, morty);
		}

		score = foodEaten(map, rick, morty, score, scoreDisplay);
		eatGhost(map, ghostArray, rick, morty);
		score = powerUpEaten(
			map,
			rick,
			morty,
			score,
			scoreDisplay,
			ghostArray,
			timer
		);
		checkLose(map, keyMovement, timer, rick, morty);
		checkWin(map, score);
		
	});

	const ghostArray = addGhosts(map);

	let timer;

	of(...ghostArray).subscribe((next) =>
		movingGhost(
			map,
			next,
			checkLose,
			eatGhost,
			ghostArray,
			rick,
			morty,
			keyMovement,
			timer,
			score
		)
	);
});
