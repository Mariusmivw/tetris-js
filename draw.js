const draw = () => {
	drawHold();
	drawGrid();
	drawNext();
};

const drawHold = () => {
	let html = "<decl>let</decl> <var>hold</var> = [";
	if (holdPiece) {
		holdPiece.shape.forEach(row => {
			html += "[";
			row.forEach(cell => {
				html += `<t${cell}/>,`;
			});
			html += `],<br>${"&nbsp;".repeat(12)}`;
		});
		html += `];${"<br>".repeat(5-holdPiece.shape.length)}&#8203;`;
		$("#game > #hold").html(
			html.replace(/,\]/g, "]").replace(/\],<br>(?:&nbsp;)+\]/, "]]")
		);
	} else {
		html += `[]];${"<br>".repeat(4)}&#8203;`;
		$("#game > #hold").html(html);
	}
}

const drawGrid = () => {
	let g = $.extend(true, [], grid);

	try {
		if (showGhostPiece) {
			currentTetrimino.shape.forEach((row, i) => {
				if (currentTetrimino.ghostPos[0] + i >= 0) {
					row.forEach((cell, u) => {
						if (cell != 0) {
							g[i + currentTetrimino.ghostPos[0]][u + currentTetrimino.ghostPos[1]] = `${cell} class="ghost"`;
						}
					});
				}
			});
		}

		currentTetrimino.shape.forEach((row, i) => {
			if (currentTetrimino.pos[0] + i >= 0) {
				row.forEach((cell, u) => {
					if (cell != 0) {
						g[i + currentTetrimino.pos[0]][u + currentTetrimino.pos[1]] = cell;
					}
				});
			}
		});
	} catch (e) {
		pause();
		throw e;
	}

	let html = "<decl>let</decl> <var>grid</var> = [";

	g.forEach(row => {
		html += "[";
		row.forEach(cell => {
			html += `<t${cell}/>,`;
		});
		html += `],<br>${"&nbsp;".repeat(12)}`;
	});

	html += "];";
	$("#game > #grid").html(
		html.replace(/,\]/g, "]").replace(/\],<br>(?:&nbsp;)+\]/, "]]")
	);
};

const drawNext = () => {
	bagShapes = [].concat(bag.shapes).concat(bag.nextShapes);
	let html = "<decl>let</decl> <var>next</var> = [";
	for (let i = 0; i < nextQueueSize; i++) {
		const shape = bagShapes[i];
		html += "["

		shape.shape.forEach(row => {
			html += "[";
			row.forEach(cell => {
				html += `<t${cell}/>,`;
			});
			html += `],<br>${"&nbsp;".repeat(13)}`;
		});

		html += `],<br><br>${"&nbsp;".repeat(12)}`;
	}
	html += `];`;

	$("#game > #next").html(
		html.replace(/,\]/g, "]").replace(/\],<br>(?:&nbsp;)+\]/g, "]]").replace(/\],<br><br>(?:&nbsp;)+\]/g, "]]")
	);
}