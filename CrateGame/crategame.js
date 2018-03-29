// Main driver script

"use strict";

window.onload = function () {
    var game = new Game();
    var board = new Board(game);
    var header = document.getElementById("header");
    
    draw();

    window.onkeydown = function (ev) {
        if (!game.getLevelComplete()) {
            if (ev.key === 'w' || ev.key === 'W' || ev.key === 'ArrowUp') {
                if (!game.trySetDirection(game.N))
                    game.move();
            } else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') {
                if (!game.trySetDirection(game.E))
                    game.move();
            } else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') {
                if (!game.trySetDirection(game.S))
                    game.move();
            } else if (ev.key === 'a' || ev.key === 'A' || ev.key === 'ArrowLeft') {
                if (!game.trySetDirection(game.W))
                    game.move();
            } else if (ev.key === ' ') {
                game.blowUp();
            }

            draw();
        }
    };

    // Redraw board when the window size changes
    window.onresize = draw;

    function draw() {
        board.draw();
        header.innerText = "Score: " + game.getScore();
        if (game.getLevelComplete())
            header.innerText += " | Level Complete!";
    }
};