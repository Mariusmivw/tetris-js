const drawGrid = async (grid) => {
	for (let i = 0; i < currentTetrimino.shape.length; i++) {
		for (let u = 0; u < currentTetrimino.shape.length; u++) {
			let part = currentTetrimino.shape[i][u];
			if (part != 0) {
				grid[i + currentTetrimino.pos[0]][u + currentTetrimino.pos[1]] = part;
			}
		}
	}

	let html = "<let>let</let> <var>grid</var> = [";
	for (const row of grid) {
		html += "[";
		for (const item of row) {
			html += `<t${item}/>,`;
		}
		html += `],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
	}
	html += "];";
	$("#game").html(
		html.replace(/,\]/g, "]").replace(/\],<br>(?:&nbsp;)+\]/, "]]")
	);

	for (let i = 0; i < currentTetrimino.shape.length; i++) {
		for (let u = 0; u < currentTetrimino.shape.length; u++) {
			let part = currentTetrimino.shape[i][u];
			if (part != 0) {
				grid[i + currentTetrimino.pos[0]][u + currentTetrimino.pos[1]] = 0;
			}
		}
	}
};

const pause = () => {
	paused = true;
	console.log("pause");
}

let grid = [
	// [3, 4, 5, 6, 7, 0, 1, 2, 3, 4],
	// [2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	// [1, 2, 3, 4, 5, 6, 7, 0, 1, 2],
	// [0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	// [7, 0, 1, 2, 3, 4, 5, 6, 7, 0],
	// [6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	// [5, 6, 7, 0, 1, 2, 3, 4, 5, 6],
	// [4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	// [3, 4, 5, 6, 7, 0, 1, 2, 3, 4],
	// [2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	// [1, 2, 3, 4, 5, 6, 7, 0, 1, 2],
	// [0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	// [7, 0, 1, 2, 3, 4, 5, 6, 7, 0],
	// [6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	// [5, 6, 7, 0, 1, 2, 3, 4, 5, 6],
	// [4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	// [3, 4, 5, 6, 7, 0, 1, 2, 3, 4],
	// [2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	// [1, 2, 3, 4, 5, 6, 7, 0, 1, 2],
	// [0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
];

for (let i = 0; i < 20; i++) {
	grid.push([]);
	for (let u = 0; u < 10; u++) {
		grid[i][u] = 0;
	}
}

let dropSpeed = 4;
let currentTetrimino = new Tetrimino(Math.ceil(Math.random() * 7));
let frameCount = 0;
let paused = false;

let drawInterval = setInterval(() => {
	if (!paused) {
		drawGrid(grid);
		if (frameCount % (60 / dropSpeed) == 0) {
			currentTetrimino.drop();
		}
		frameCount++;
	}
}, 1000 / 60);