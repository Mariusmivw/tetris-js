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

const checkRow = (row) => {
	let full = true;
	for (let i = 0; i < grid[row].length; i++) {
		if (grid[row][i] == 0) {
			full = false;
			break;
		}
	}
	if (full) {
		while (row > 0) {
			grid[row--] = grid[row].slice();
		}
	}
}

const pause = () => {
	paused = !paused;
}

const frameRate = 60;
const nextQueueSize = 6;
const DAS = [200 /* <- ms */ / 1000 * frameRate, frameRate / 45 /* <- Hz */ ];
const DASkeys = ["right", "left", "softDrop"];
const lockDelay = frameRate / 6; //frames
let delayUntilLock = lockDelay;
let dropSpeed = 1 / frameRate;
let dropper = 0;
let showGhostPiece = true;

let grid = initGrid();
let level = 1;
let bag = new Bag();
let currentTetrimino = bag.nextShape();
let holdPiece;
let canHold = true;

let frameCount = 0;
let paused = false;

let drawInterval = setInterval(() => {
		if (!paused) {
			draw();

			delayUntilLock--;

			// making sure the piece drops the exact right amount
			dropper += dropSpeed;
			while (dropper > 1) {
				currentTetrimino.drop();
				dropper--;
			}

			for (const key in keys) {
				if (keys.hasOwnProperty(key)) {
					if (keys[key].isPressed) {
						if (keys[key].heldFor++ == 0) {
							currentTetrimino[key]();
						} else if (DASkeys.includes(key)) {
							if (keys[key].repeat) {
								if (keys[key].heldFor > DAS[1]) {
									keys[key].heldFor -= DAS[1];
									currentTetrimino[key]();
								}
							} else if (keys[key].heldFor > DAS[0]) {
								keys[key].heldFor -= DAS[0];
								keys[key].repeat = true;
								currentTetrimino[key]();
							}
						}
					}
				}
			}
		}
	},
	1000 / frameRate);