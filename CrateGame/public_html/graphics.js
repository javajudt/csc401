"use strict";

function Board(game) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // Determine size of square canvas
    var useableHeight = window.innerHeight - document.getElementById("header").offsetHeight - 25;
    var useableWidth = window.innerWidth - 25;
    var canvasSize;
    if (useableWidth > useableHeight)
        canvasSize = useableHeight;
    else
        canvasSize = useableWidth;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Determine size of each grid block
    var blockSize = canvasSize / game.getSize();

    // Prepare image objects
    var player = new Image();
    player.src = "loader.png";

    var crate1 = new Image();
    crate1.src = "crate_1.png";
    var crate1t = new Image();
    crate1t.src = "crate_1_target.png";
    var crate2 = new Image();
    crate2.src = "crate_2.png";
    var crate2t = new Image();
    crate2t.src = "crate_2_target.png";
    var crate3 = new Image();
    crate3.src = "crate_3.png";
    var crate3t = new Image();
    crate3t.src = "crate_3_target.png";

    this.draw = function () {
        var crates = game.getCrates();
        var startPos = game.getStartPosition();
        context.fillStyle = "#FF9933";
        // Draw grid
        for (var j = 0; j < game.getSize(); j++) {
            for (var i = 0; i < game.getSize(); i++) {
                // Draw grid square
                var x = blockSize * i;
                var y = blockSize * j;

                // Draw starting point
                if (startPos.equals({x: i, y: j}))
                    context.fillStyle = "#FBFB00";
                context.fillRect(x, y, blockSize, blockSize);
                context.strokeRect(x, y, blockSize, blockSize);
                context.fillStyle = "#FF9933";

                // Draw crates
                if (crates[j][i] === 1) {
                    context.drawImage(crate1, x, y, blockSize, blockSize);
                } else if (crates[j][i] === 2) {
                    context.drawImage(crate2, x, y, blockSize, blockSize);
                } else if (crates[j][i] === 3) {
                    context.drawImage(crate3, x, y, blockSize, blockSize);
                }
            }
        }
        
        // Draw player image
        var playerPos = game.getPlayerPosition();
        context.drawImage(player, blockSize * playerPos.x, blockSize * playerPos.y, blockSize, blockSize);
    };
    
    crate3t.onload = this.draw;
}