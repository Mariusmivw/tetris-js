class Tetrimino {
	/**
	 * @param {number} s
	 */
	constructor(s) {
		switch (s) {
			case 1:
				this.shape = [
					[0, 0, 0, 0],
					[1, 1, 1, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
				break;
			case 2:
				this.shape = [
					[2, 0, 0],
					[2, 2, 2],
					[0, 0, 0]
				];
				break;
			case 3:
				this.shape = [
					[0, 0, 3],
					[3, 3, 3],
					[0, 0, 0]
				];
				break;
			case 4:
				this.shape = [
					[4, 4],
					[4, 4]
				];
				break;
			case 5:
				this.shape = [
					[0, 5, 5],
					[5, 5, 0],
					[0, 0, 0]
				];
				break;
			case 6:
				this.shape = [
					[0, 6, 0],
					[6, 6, 6],
					[0, 0, 0]
				];
				break;
			case 7:
				this.shape = [
					[7, 7, 0],
					[0, 7, 7],
					[0, 0, 0]
				];
				break;
		}
	}

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
}