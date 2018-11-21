const initGrid = () => {
	let grid = [];
	for (let i = 0; i < 20; i++) {
		grid.push([]);
		for (let u = 0; u < 10; u++) {
			grid[i][u] = 0;
		}
	}
	return grid;
}

const drawGrid = async (grid) => {
	grid = $.extend(true, [], grid);

	try {
		currentTetrimino.shape.forEach((row, i) => {
			row.forEach((cell, u) => {
				if (cell != 0) {
					grid[i + currentTetrimino.pos[0]][u + currentTetrimino.pos[1]] = cell;
				}
			});
		});
	} catch (e) {
		pause();
		throw e;
	}

	let html = "<let>let</let> <var>grid</var> = [";

	grid.forEach(row => {
		html += "[";
		row.forEach(cell => {
			html += `<t${cell}/>,`;
		});
		html += `],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
	});

	html += "];";
	$("#game").html(
		html.replace(/,\]/g, "]").replace(/\],<br>(?:&nbsp;)+\]/, "]]")
	);
};

const pause = () => {
	paused = true;
	console.log("pause");
}

let grid = initGrid();
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