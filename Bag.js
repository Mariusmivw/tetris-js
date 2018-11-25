class Bag {
	constructor() {
		this.shapes = [];
		this.nextShapes = [];
		this.fill(this.shapes);
		this.fill(this.nextShapes);
	}
	nextShape() {
		let shape = this.shapes.shift();
		if (this.shapes.length == 0) {
			this.shapes = this.nextShapes.slice();
			this.nextShapes = [];
			this.fill(this.nextShapes);
		}
		return shape;
	}
	fill(arr) {
		// arr = [];
		let shapesLeft = [1, 2, 3, 4, 5, 6, 7];
		while (shapesLeft.length > 0) {
			arr.push(new Tetrimino(shapesLeft.splice(Math.floor(Math.random() * shapesLeft.length), 1)[0]));
		}
	}
}