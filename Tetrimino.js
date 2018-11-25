class Tetrimino {
	/**
	 * @param {number} s
	 */
	constructor(s) {
		this.s = s;
		this.rotation = 0;
		this.setData(s);
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
		if (this.canBePlacedAt(this.shape, this.pos[0] + 1, this.pos[1])) {
			delayUntilLock = lockDelay;
			this.pos[0]++;
		} else if (delayUntilLock <= 0) {
			this.placeHere();
		}
	}

	left() {
		if (this.canBePlacedAt(this.shape, this.pos[0], this.pos[1] - 1)) {
			delayUntilLock = lockDelay;
			this.pos[1]--;
		}
	}

	right() {
		if (this.canBePlacedAt(this.shape, this.pos[0], this.pos[1] + 1)) {
			delayUntilLock = lockDelay;
			this.pos[1]++;
		}
	}

	rotateRight() {
		let tempShape = [];
		this.shape.forEach((row, i) => {
			tempShape.push([]);
			row.forEach((cell, u) => {
				tempShape[i][u] = this.shape[this.shape.length - 1 - u][i];
			});
		});

		this.kickData[this.rotation].some(kickPos => {
			if (this.canBePlacedAt(tempShape, this.pos[0] + kickPos[0], this.pos[1] + kickPos[1])) {
				delayUntilLock = lockDelay;
				this.rotation = ((this.rotation + 4) + 1) % 4;
				this.pos[0] += kickPos[0];
				this.pos[1] += kickPos[1];
				this.shape = tempShape;
				return true;
			}
		});
	}

	rotateLeft() {
		let tempShape = [];
		this.shape.forEach((row, i) => {
			tempShape.push([]);
			row.forEach((cell, u) => {
				tempShape[i][u] = this.shape[u][this.shape.length - 1 - i];
			});
		});

		this.kickData[(this.rotation + 4 - 1) % 4].some(kickPos => {
			if (this.canBePlacedAt(tempShape, this.pos[0] - kickPos[0], this.pos[1] - kickPos[1])) {
				delayUntilLock = lockDelay;
				this.rotation = ((this.rotation + 4) - 1) % 4;
				this.pos[0] -= kickPos[0];
				this.pos[1] -= kickPos[1];
				this.shape = tempShape;
				return true;
			}
		});
	}

	softDrop() {
		this.drop();
	}

	hardDrop() {
		while (this.canBePlacedAt(this.shape, this.pos[0] + 1, this.pos[1])) {
			this.pos[0]++;
		}
		this.placeHere();
	}

	get ghostPos() {
		let ghostPos = this.pos.slice();
		while (this.canBePlacedAt(this.shape, ghostPos[0] + 1, ghostPos[1])) {
			ghostPos[0]++;
		}
		return ghostPos;
	}

	hold() {
		if (canHold) {
			canHold = false;
			currentTetrimino = holdPiece ? holdPiece : bag.nextShape();
			currentTetrimino.spawn();
			this.setData(this.s);
			holdPiece = this;
		}
	}

	canBePlacedAt(shape, yPos, xPos) {
		for (let i = 0; i < shape.length; i++) {
			for (let u = 0; u < shape[i].length; u++) {
				if (shape[i][u] != 0) {
					try {
						const row = grid[yPos + i];
						const cell = row[xPos + u];
						if (cell !== 0 || cell === undefined || row === undefined) {
							return false;
						}
					} catch (e) {
						return false;
					}
				}
			}
		}
		return true;
	}

	placeHere() {
		this.shape.forEach((row, i) => {
			let empty = true;
			row.forEach((cell, u) => {
				if (cell != 0) {
					empty = false;
					grid[i + this.pos[0]][u + this.pos[1]] = cell;
				}
			});
			if (!empty) {
				checkRow(i + this.pos[0]);
			}
		});
		// currentTetrimino = new Tetrimino(Math.ceil(Math.random() * 7));
		canHold = true;
		currentTetrimino = bag.nextShape();
	}

	setData(s) {
		this.kickData = [
			[
				[0, 0],
				[0, 1],
				[-1, -1],
				[2, 0],
				[2, -1]
			],
			[
				[0, 0],
				[0, 1],
				[1, 1],
				[-2, 0],
				[-2, 1]
			],
			[
				[0, 0],
				[0, 1],
				[-1, 1],
				[2, 0],
				[2, 1]
			],
			[
				[0, 0],
				[0, -1],
				[1, -1],
				[-2, 0],
				[-2, -1]
			]
		];
		switch (s) {
			case 1: // I
				this.shape = [
					[0, 0, 0, 0],
					[1, 1, 1, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
				this.kickData = [
					[
						[0, 0],
						[0, -2],
						[0, 1],
						[1, -2],
						[-2, 1]
					],
					[
						[0, 0],
						[0, -1],
						[0, 2],
						[-2, -1],
						[1, 2]
					],
					[
						[0, 0],
						[0, 2],
						[0, -1],
						[-1, 2],
						[2, -1]
					],
					[
						[0, 0],
						[0, 1],
						[0, -2],
						[2, 1],
						[-1, -2]
					]
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
	}
}