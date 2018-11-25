$.ajaxSetup({
	async: false
});

const include = (src) => {
	$.getScript(src.endsWith(".js") ? src : src + ".js");
};

include("Tetrimino");
include("Bag");
include("keys");
include("draw");
include("tetris");