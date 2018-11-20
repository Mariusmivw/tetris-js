const include = (fileName) => {
	let scriptEl = document.createElement("script");
	scriptEl.src = fileName.endsWith(".js") ? fileName : `${fileName}.js`;
	document.head.append(scriptEl);
};

include("Tetrimino");



const draw = (grid) => {
	let html = "<let>let</let> <var>grid</var> = [";
	for (const row of grid) {
		html += "[";
		for (const item of row) {
			html += `<t${item}/>,`;
		}
		html += `],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
	}
	html += "];";
	$("#game").html(
		html.replace(/,\]/g, "]").replace(/\],<br>(?:&nbsp;)+\]/, "]]")
	);
};

var grid = [
	[3, 4, 5, 6, 7, 0, 1, 2, 3, 4],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[1, 2, 3, 4, 5, 6, 7, 0, 1, 2],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[7, 0, 1, 2, 3, 4, 5, 6, 7, 0],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	[5, 6, 7, 0, 1, 2, 3, 4, 5, 6],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[3, 4, 5, 6, 7, 0, 1, 2, 3, 4],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[1, 2, 3, 4, 5, 6, 7, 0, 1, 2],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
	[7, 0, 1, 2, 3, 4, 5, 6, 7, 0],
	[6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
	[5, 6, 7, 0, 1, 2, 3, 4, 5, 6],
	[4, 5, 6, 7, 0, 1, 2, 3, 4, 5],
	[3, 4, 5, 6, 7, 0, 1, 2, 3, 4],
	[2, 3, 4, 5, 6, 7, 0, 1, 2, 3],
	[1, 2, 3, 4, 5, 6, 7, 0, 1, 2],
	[0, 1, 2, 3, 4, 5, 6, 7, 0, 1],
];

draw(grid);