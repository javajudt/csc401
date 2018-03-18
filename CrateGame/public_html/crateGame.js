"use strict";

window.onload = function () {
    var game = new Game();
    var board = new Board(game);

    window.onkeydown = function (ev) {
        if (!game.levelComplete) {
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
        }
    };
};