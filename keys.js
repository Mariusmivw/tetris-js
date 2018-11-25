let keys = {
	rotateRight: {},
	hardDrop: {},
	hold: {},
	rotateLeft: {},
	left: {},
	right: {},
	softDrop: {}
};

for (const key in keys) {
	if (keys.hasOwnProperty(key)) {
		keys[key].isPressed = false;
		keys[key].heldFor = 0;
		keys[key].repeat = false;
	}
}

$(window).keydown(function (e) {
	let keyCode = e.which;
	switch (keyCode) {
		case 38: // Up
		case 88: // X
		case 97: // Num 1
		case 101: // Num 5
		case 105: // Num 9
			keys.rotateRight.isPressed = true;
			break;

		case 32: // Space
		case 104: // Num 8
			keys.hardDrop.isPressed = true;
			break;

		case 16: // Shift
		case 67: // C
		case 96: // Num 0
			keys.hold.isPressed = true;
			break;

		case 90: // Z
		case 99: // Num 3
		case 103: // Num 7
			//case {Control}:
			keys.rotateLeft.isPressed = true;
			break;

		case 27: // Esc
		case 112: // F1
			pause();
			break;

		case 37: // Left
		case 100: // Num 4
			keys.left.isPressed = true;
			break;

		case 39: // Right
		case 102: // Num 6
			keys.right.isPressed = true;
			break;

		case 40: // Down
		case 98: // Num 2
			keys.softDrop.isPressed = true;
			break;

		default:
			console.log(`I don't know key: ${keyCode}`);
			break;
	}
});

$(window).keyup(function (e) {
	let keyCode = e.which;
	switch (keyCode) {
		case 38: // Up
		case 88: // X
		case 97: // Num 1
		case 101: // Num 5
		case 105: // Num 9
			keys.rotateRight.isPressed = false;
			keys.rotateRight.heldFor = 0;
			keys.rotateRight.repeat = false;
			break;

		case 32: // Space
		case 104: // Num 8
			keys.hardDrop.isPressed = false;
			keys.hardDrop.heldFor = 0;
			keys.hardDrop.repeat = false;
			break;

		case 16: // Shift
		case 67: // C
		case 96: // Num 0
			keys.hold.isPressed = false;
			keys.hold.heldFor = 0;
			keys.hold.repeat = false;
			break;

		case 90: // Z
		case 99: // Num 3
		case 103: // Num 7
			//case {Control}:
			keys.rotateLeft.isPressed = false;
			keys.rotateLeft.heldFor = 0;
			keys.rotateLeft.repeat = false;
			break;

		case 37: // Left
		case 100: // Num 4
			keys.left.isPressed = false;
			keys.left.heldFor = 0;
			keys.left.repeat = false;
			break;

		case 39: // Right
		case 102: // Num 6
			keys.right.isPressed = false;
			keys.right.heldFor = 0;
			keys.right.repeat = false;
			break;

		case 40: // Down
		case 98: // Num 2
			keys.softDrop.isPressed = false;
			keys.softDrop.heldFor = 0;
			keys.softDrop.repeat = false;
			break;
	}
});