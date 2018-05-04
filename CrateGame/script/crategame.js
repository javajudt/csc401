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

    var id = findGetParameter("id");
    var record = "just a sec...";
    updateRecord();
    var isLoggedIn = false;
    $.ajax({
        url: "is_user_logged_in.php",
        method: "GET"
    }).done(function (data) {
        console.log("User logged in: " + data);
        isLoggedIn = (data === "true");
    });

// This is a horrible way to do this because anybody could
// put whatever score they want.
    var score = findGetParameter("score");
    if (score) {
        saveScore(id, score);
    }

    var game = new Game(id);
    var board = new Board(game);

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

        var score = game.getScore();
        var gameOver = game.getLevelComplete();

        var scoreStr = "Score: " + score;
        var completeStr = gameOver ? " | Level Complete!" : "";
        var recordStr = " | Record: " + record;

        var header = document.getElementById("header");
        header.innerText = scoreStr + completeStr + recordStr;

        if (gameOver && (record === "UNSOLVED" || score < record)) {
            console.log("Showing save button");
            $("#save").show();
        }
    }

    function updateRecord() {
        $.ajax({
            url: "get_high_score.php",
            method: "GET",
            data: {puzId: id}
        }).done(function (data) {
            record = data;
            draw();
            console.log("record updated: " + record);
        });
    }

    $("#save_button").click(function () {
        if (isLoggedIn) {
            saveScore(id, game.getScore());
        } else {
            window.location.href = "./login.php?id=" + id + "&score=" + game.getScore();
        }
    });

    function saveScore(id, score) {
        $.ajax({
            url: "save_new_record.php",
            method: "POST",
            data: {puzId: id, recordScore: score}
        }).done(function () {
            $("#save").html("Your high score has been saved!");
            updateRecord();
        });
    }
};