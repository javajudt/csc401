// Main driver script

"use strict";

window.onload = function () {
    // Thanks https://stackoverflow.com/a/5448595/8149837
    function findGetParameter(parameterName) {
        var result = null,
                tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName)
                result = decodeURIComponent(tmp[1]);
        }
        return result;
    }

    var game = new Game(findGetParameter("id"));
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