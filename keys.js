$(window).keydown(function (e) {
	let keyCode = e.which;
	switch (keyCode) {
		case 38: // Up
		case 88: // X
		case 97: // Num 1
		case 101: // Num 5
		case 105: // Num 9
			currentTetrimino.rotateRight();
			break;
		case 32: // Space
		case 104: // Num 8
			currentTetrimino.hardDrop();
			break;
		case 16: // Shift
		case 67: // C
		case 96: // Num 0
			currentTetrimino.hold();
			break;
		case 90: // Z
		case 99: // Num 3
		case 103: // Num 7
			//case {Control}:
			currentTetrimino.rotateLeft();
			break;
		case 27: // Esc
		case 112: // F1
			pause();
			break;
		case 37: // Left
		case 100: // Num 4
			currentTetrimino.left();
			break;
		case 39: // Right
		case 102: // Num 6
			currentTetrimino.right();
			break;
		case 40: // Down
		case 98: // Num 2
			currentTetrimino.softDrop();
			break;
		default:
			console.log(`I don't know key: ${keyCode}`);
			break;
	}
});