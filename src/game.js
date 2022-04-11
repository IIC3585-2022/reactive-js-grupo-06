import { removeFromSquare, addToSquare } from "./display";

export class Pacman {
	constructor(name, initY, initX) {
		this.name = name;
		this.y = initY;
		this.x = initX;
	}
}

export class Ghost {
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

function validGhostSquare(square) {
	//Este es en caso de estar en un extremo que no analize una casilla que no existe
	if (!square) return true;

	if (square.classList.contains("wall") || square.classList.contains("ghost"))
		return false;
	return true;
}

function validGhostMoves(map, ghost) {
	const valid_moves = [];
	const up_square = map.squares[ghost.y - 1][ghost.x];
	if (validGhostSquare(up_square)) valid_moves.push("up");
	const down_square = map.squares[ghost.y + 1][ghost.x];
	if (validGhostSquare(down_square)) valid_moves.push("down");
	const left_square = map.squares[ghost.y][ghost.x - 1];
	if (validGhostSquare(left_square)) valid_moves.push("left");
	const right_square = map.squares[ghost.y][ghost.x + 1];
	if (validGhostSquare(right_square)) valid_moves.push("right");

	return valid_moves;
}

function moveGhost(
	map,
	ghost,
	checkLose,
	eatGhost,
	ghostArray,
	rick,
	morty,
	keyMovement,
	timer,
	score
) {
	removeFromSquare(map, ghost);

	if (ghost.current_direction === "up") {
		ghost.y -= 1;
		addToSquare(map, ghost);
	} else if (ghost.current_direction === "down") {
		ghost.y += 1;
		addToSquare(map, ghost);
	} else if (ghost.current_direction === "right") {
		if (ghost.x === 32) {
			ghost.x = 0;
		} else {
			ghost.x += 1;
		}
		addToSquare(map, ghost);
	} else if (ghost.current_direction === "left") {
		if (ghost.x === 0) {
			ghost.x = 32;
		} else {
			ghost.x -= 1;
		}
		addToSquare(map, ghost);
	}
	checkLose(map, keyMovement, timer, rick, morty, score);
	eatGhost(map, ghostArray, rick, morty);
	/* 
    if (ghost.scared) {
        map.squares[ghost.y][ghost.x].classList.add("scared-ghost");
    } */

	return ghost;
}

export function movingGhost(
	map,
	ghost,
	checkLose,
	eatGhost,
	ghostArray,
	rick,
	morty,
	keyMovement,
	timer,
	score
) {
	ghost.timerId = setInterval(function () {
		const valid_moves = validGhostMoves(map, ghost);

		//Esto es pa que el fantasma pueda escapar, si tiene 4 valid moves significa que está en spawn
		if (
			valid_moves.length === 3 ||
			!valid_moves.includes(ghost.current_direction)
		) {
			const direction =
				valid_moves[Math.floor(Math.random() * valid_moves.length)];
			ghost.current_direction = direction;

			ghost = moveGhost(
				map,
				ghost,
				checkLose,
				eatGhost,
				ghostArray,
				rick,
				morty,
				keyMovement,
				timer,
				score
			);
		} else moveGhost(map, ghost, checkLose, eatGhost, ghostArray, rick, morty, keyMovement, timer, score);
	}, ghost.speed);
}

export function scaredGhost(map, ghost) {
	ghost.scared = true;
	addToSquare(map, ghost);
}

export function unScareGhosts(map, ghostArray) {
	ghostArray.forEach((ghost) => {
		ghost.scared = false;
		map.squares[ghost.y][ghost.x].classList.remove("scared-ghost");
	});
}

export function powerUpEaten(
	map,
	rick,
	morty,
	score,
	scoreDisplay,
	ghostArray,
	timer
) {
	if (map.squares[rick.y][rick.x].classList.contains("power-up")) {
		score += 20;
		scoreDisplay.innerHTML = score;
		map.squares[rick.y][rick.x].classList.remove("power-up");
		ghostArray.forEach((ghost) => scaredGhost(map, ghost));
		clearTimeout(timer);
		scareGhosts(map, ghostArray, timer);
	} else if (map.squares[morty.y][morty.x].classList.contains("power-up")) {
		score += 20;
		scoreDisplay.innerHTML = score;
		map.squares[morty.y][morty.x].classList.remove("power-up");
		ghostArray.forEach((ghost) => scaredGhost(map, ghost));
		clearTimeout(timer);
		scareGhosts(map, ghostArray, timer);
	}
	return score;
}

const scareGhosts = (map, ghostArray, timer) => {
	timer = window.setTimeout(() => {
		unScareGhosts(map, ghostArray);
	}, 6000);
};

export function eatGhost(map, ghostArray, rick, morty) {
	ghostArray.forEach((ghost) => {
		if (ghost.scared) {
			if (
				(ghost.y === rick.y && ghost.x === rick.x) ||
				(ghost.y === morty.y && ghost.x === morty.x)
			) {
				map.squares[ghost.y][ghost.x].classList.remove("ghost");
				map.squares[ghost.y][ghost.x].classList.remove("scared-ghost");
				ghost.scared = false;
				ghost.current_direction = "up";
				ghost.y = ghost.initY;
				ghost.x = ghost.initX;
				addToSquare(map, ghost);
			}
		}
	});
}

export function checkWin(map, score) {
	if (score >= map.max_points) {
		keyMovement.unsubscribe();
		clearTimeout(timer);

		map.squares[rick.y][rick.x].classList.remove("rick");
		map.squares[morty.y][morty.x].classList.remove("morty");
		rick.y = 0;
		morty.y = 20;
		setTimeout(function () {
			alert(`¡Han ganado!`);
		}, 5);
	}
}

export function checkLose(map, keyMovement, timer, rick, morty) {
	var lost = false;
	const rick_square = map.squares[rick.y][rick.x];
	const morty_square = map.squares[morty.y][morty.x];

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

		map.squares[rick.y][rick.x].classList.remove("rick");
		map.squares[morty.y][morty.x].classList.remove("morty");
		rick.y = 0;
		morty.y = 20;
		setTimeout(function () {
			alert(`¡Han perdido!`);
		}, 5);
	}
}
