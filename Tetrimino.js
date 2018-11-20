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

		this.pos = [0, 0];
	}

	// TODO: fix erasing of other blocks
	rotateRight() {
		let tempShape = [];
		for (let i = 0; i < this.shape.length; i++) {
			tempShape.push([]);
			for (let u = 0; u < this.shape.length; u++) {
				tempShape[i][u] = this.shape[this.shape.length - 1 - u][i];
			}
		}
		return this.shape = tempShape;
	}

	// TODO: fix erasing of other blocks
	rotateLeft() {
		let tempShape = [];
		for (let i = 0; i < this.shape.length; i++) {
			tempShape.push([]);
			for (let u = 0; u < this.shape.length; u++) {
				tempShape[i][u] = this.shape[u][this.shape.length - 1 - i];
			}
		}
		return this.shape = tempShape;
	}

	/**
	 * @param {boolean} freePath 
	 */
	spawn(freePath) {

	}

	drop() {
		for (let i = 0; i < this.shape.length; i++) {
			for (let u = 0; u < this.shape[i].length; u++) {
				if (this.shape[i][u] != 0) {
					let row;
					if (row = grid[this.pos[0] + i + 1]) {
						if (row[this.pos[1] + u] != 0) {
							this.placeHere();
							return;
						}
					} else {
						this.placeHere();
						return;
					}
				}
			}
		}
		this.pos[0]++;
	}

	hardDrop() {

	}

	softDrop() {

	}

	hold() {

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

	placeHere() {
		for (let i = 0; i < this.shape.length; i++) {
			for (let u = 0; u < this.shape.length; u++) {
				let part = this.shape[i][u];
				if (part != 0) {
					grid[i + this.pos[0]][u + this.pos[1]] = part;
				}
			}
		}
		currentTetrimino = new Tetrimino(Math.ceil(Math.random() * 7));
	}
}