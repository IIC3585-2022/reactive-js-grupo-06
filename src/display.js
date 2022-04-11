import { layout } from './constants';
import { Ghost } from './game';

export function createMap(document, grid) {    
    var max_points = 0;
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
    return {squares, max_points};
}

export function addGhosts(map) {
    const ghostArray = [
		new Ghost(10, 14, 175),
		new Ghost(10, 15, 150),
		new Ghost(10, 16, 125),
		new Ghost(10, 17, 200),
	];

	ghostArray.forEach((ghost) =>
		map.squares[ghost.y][ghost.x].classList.add("ghost")
	);

    return ghostArray;
}

export function removeFromSquare(map, unit) {
    map.squares[unit.y][unit.x].classList.remove(unit.name);
    if (unit.name == "ghost")
        map.squares[unit.y][unit.x].classList.remove("scared-ghost");
}

export function addToSquare(map, unit) {
    map.squares[unit.y][unit.x].classList.add(unit.name);
    if (unit.name == "ghost") {
        if (unit.scared) map.squares[unit.y][unit.x].classList.add("scared-ghost");
    }
}

export function foodEaten(map, rick, morty, score, scoreDisplay ) {
    if (map.squares[rick.y][rick.x].classList.contains("food-dot")) {
        score ++;
        scoreDisplay.innerHTML = score;
        map.squares[rick.y][rick.x].classList.remove("food-dot");
    }
    if (map.squares[morty.y][morty.x].classList.contains("food-dot")) {
        score++;
        scoreDisplay.innerHTML = score;
        map.squares[morty.y][morty.x].classList.remove("food-dot");
    }
    return score;
}
