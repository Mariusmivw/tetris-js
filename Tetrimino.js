class Tetrimino {
	/**
	 * @param {number} s
	 */
	constructor(s) {
		switch (s) {
			case 1: // I
				this.shape = [
					[0, 0, 0, 0],
					[1, 1, 1, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
				break;
			case 2: // J
				this.shape = [
					[2, 0, 0],
					[2, 2, 2],
					[0, 0, 0]
				];
				break;
			case 3: // L
				this.shape = [
					[0, 0, 3],
					[3, 3, 3],
					[0, 0, 0]
				];
				break;
			case 4: // O
				this.shape = [
					[4, 4],
					[4, 4]
				];
				break;
			case 5: // S
				this.shape = [
					[0, 5, 5],
					[5, 5, 0],
					[0, 0, 0]
				];
				break;
			case 6: // T
				this.shape = [
					[0, 6, 0],
					[6, 6, 6],
					[0, 0, 0]
				];
				break;
			case 7: // Z
				this.shape = [
					[7, 7, 0],
					[0, 7, 7],
					[0, 0, 0]
				];
				break;
		}

		this.spawn();
	}

	spawn() {
		this.pos = [-this.shape.length, 4];
		this.shape.forEach(() => {
			if (this.belowIsFree()) {
				this.pos[0]++;
			}
		});
	}

	belowIsFree() {
		for (let i = 0; i < this.shape.length; i++) {
			for (let u = 0; u < this.shape[i].length; u++) {
				const cell = this.shape[i][u];
				if (cell != 0) {
					let gRow = grid[this.pos[0] + i + 1];
					if (gRow !== undefined) {
						if (gRow[this.pos[1] + u] !== 0) {
							return false;
						}
					} else if (this.pos[0] > -1) {
						return false;
					}
				}
			}
		}
		return true;
	}

	drop() {
		if (this.belowIsFree()) {
			this.pos[0]++;
		} else {
			this.placeHere();
		}
	}

	left() {
		for (let i = 0; i < this.shape.length; i++) {
			for (let u = 0; u < this.shape[i].length; u++) {
				if (this.shape[i][u] != 0) {
					if (grid[this.pos[0] + i][this.pos[1] + u - 1] !== 0) {
						return;
					}
				}
			}
		}
		this.pos[1]--;
	}

	right() {
		for (let i = 0; i < this.shape.length; i++) {
			for (let u = 0; u < this.shape[i].length; u++) {
				if (this.shape[i][u] != 0) {
					if (grid[this.pos[0] + i][this.pos[1] + u + 1] !== 0) {
						return;
					}
				}
			}
		}
		this.pos[1]++;
	}

	// FIXME: fix erasing of other blocks
	rotateRight() {
		let tempShape = [];
		this.shape.forEach((row, i) => {
			tempShape.push([]);
			row.forEach((cell, u) => {
				tempShape[i][u] = this.shape[this.shape.length - 1 - u][i];
			});
		});
		return this.shape = tempShape;
	}

	// FIXME: fix erasing of other blocks
	rotateLeft() {
		let tempShape = [];
		this.shape.forEach((row, i) => {
			tempShape.push([]);
			row.forEach((cell, u) => {
				tempShape[i][u] = this.shape[u][this.shape.length - 1 - i];
			});
		});
		return this.shape = tempShape;
	}

	hardDrop() {
		while (this.belowIsFree()) {
			this.pos[0]++;
		}
		this.placeHere();
	}

	softDrop() {

	}

	hold() {

	}


	placeHere() {
		this.shape.forEach((row, i) => {
			row.forEach((cell, u) => {
				if (cell != 0) {
					grid[i + this.pos[0]][u + this.pos[1]] = cell;
				}
			});
		});
		console.log("place");
		currentTetrimino = new Tetrimino(Math.ceil(Math.random() * 7));
	}
}