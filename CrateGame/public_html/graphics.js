// Script for drawing the game on a canvas

"use strict";

function Board(game) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // Prepare image objects
    var player = new Image();
    player.src = "images/loader.png";
    var crate1 = new Image();
    crate1.src = "images/crate_1.png";
    var crate1t = new Image();
    crate1t.src = "images/crate_1_target.png";
    var crate2 = new Image();
    crate2.src = "images/crate_2.png";
    var crate2t = new Image();
    crate2t.src = "images/crate_2_target.png";
    var crate3 = new Image();
    crate3.src = "images/crate_3.png";
    var crate3t = new Image();
    crate3t.src = "images/crate_3_target.png";

    this.draw = function () {
        // Function wrapper to clean up "draw" code
        function drawImage(image, x, y) {
            context.drawImage(image, x, y, blockSize, blockSize);
        }

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

        var crates = game.getCrates();
        var startPos = game.getStartPosition();
        context.fillStyle = "#FF9933";
        for (var j = 0; j < game.getSize(); j++) {
            for (var i = 0; i < game.getSize(); i++) {
                // Draw grid square
                var x = blockSize * i;
                var y = blockSize * j;

                // Change color for starting point
                if (startPos.equals({x: i, y: j}))
                    context.fillStyle = "#FBFB00";
                context.fillRect(x, y, blockSize, blockSize);
                context.strokeRect(x, y, blockSize, blockSize);
                context.fillStyle = "#FF9933";

                // Draw crates
                var target = game.getTargetPosition();
                if (crates[j][i] === 1) {
                    if (target.equals({x: i, y: j}))
                        drawImage(crate1t, x, y);
                    else
                        drawImage(crate1, x, y);
                } else if (crates[j][i] === 2) {
                    if (target.equals({x: i, y: j}))
                        drawImage(crate2t, x, y);
                    else
                        drawImage(crate2, x, y);
                } else if (crates[j][i] === 3) {
                    if (target.equals({x: i, y: j}))
                        drawImage(crate3t, x, y);
                    else
                        drawImage(crate3, x, y);
                }
            }
        }

        // Draw player image
        var playerPos = game.getPlayerPosition();
        var direction = game.getPlayerDirection();
        context.save();
        context.translate(blockSize * playerPos.x, blockSize * playerPos.y);
        // Rotate as appropriate
        if (direction === game.E) {
            context.rotate(Math.PI / 2);
            context.translate(0, -blockSize);
        } else if (direction === game.S) {
            context.rotate(Math.PI);
            context.translate(-blockSize, -blockSize);
        } else if (direction === game.W) {
            context.rotate(-Math.PI / 2);
            context.translate(-blockSize, 0);
        }

        drawImage(player, 0, 0);
        context.restore();
    };

    // Ensure all images get drawn initially
    player.onload = this.draw;
    crate1.onload = this.draw;
    crate1t.onload = this.draw;
    crate2.onload = this.draw;
    crate2t.onload = this.draw;
    crate3.onload = this.draw;
    crate3t.onload = this.draw;
}