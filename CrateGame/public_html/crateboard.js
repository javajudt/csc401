"use strict";

var Game = function(){
    
};

var board = new Board();
window.onload = function () {
    document.body.innerHTML = board;
};

window.onkeydown = function (ev) {
    if (!board.levelComplete) {
        if (ev.key === 'w' || ev.key === 'W' || ev.key === 'ArrowUp') {
            if (!board.trySetDirection(board.N))
                board.move();
        } else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') {
            if (!board.trySetDirection(board.E))
                board.move();
        } else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') {
            if (!board.trySetDirection(board.S))
                board.move();
        } else if (ev.key === 'a' || ev.key === 'A' || ev.key === 'ArrowLeft') {
            if (!board.trySetDirection(board.W))
                board.move();
        } else if (ev.key === ' ') {
            board.blowUp();
        }

        document.body.innerHTML = board;
    }
};

function Board() {
    const N = 0, E = 1, S = 2, W = 3;
    this.N = N;
    this.E = E;
    this.S = S;
    this.W = W;
    var playerText = ["^", ">", "v", "<"];

    var size = getRandom(8, 12);

    var startPosition = [getRandom(0, size - 1), size - 1];
    var playerPosition = [startPosition[0], startPosition[1]];
    var playerDirection = this.N;
    var crates = [];

    this.score = 0;
    this.levelComplete = false;

    for (var j = 0; j < size; j++) {
        var row = [];
        for (var i = 0; i < size; i++) {
            var crate = getRandom(0, 99);
            if (crate < 60 || // 60% chance no crate, and don't put a crate on top of the player (weight = 0)
                    (i === playerPosition[0] && j === playerPosition[1]))
                crate = 0;
            else if (crate < 80) // 20% chance weight=1
                crate = 1;
            else if (crate < 90) // 10% chance weight=2
                crate = 2;
            else // 10% chance weight=3
                crate = 3;

            row.push(crate);
        }
        crates.push(row);
    }

    var targetPosition = [];
    while (!targetPosition[0]) {
        var tx = getRandom(1, size - 2); // Not on edge of board
        var ty = getRandom(1, size - 2);
        if (crates[ty][tx] !== 0)
            targetPosition.push(tx, ty);
    }

    this.toString = function () {
        var str = "Score: " + this.score;
        if (this.levelComplete)
            str += " | Level Complete!";
        str += "<br /><table";
        if (this.levelComplete)
            str += " class='complete'";
        str += ">";
        for (j = 0; j < size; j++) {
            str += "<tr>";
            for (i = 0; i < size; i++) {
                str += "<td";
                if (i === targetPosition[0] && j === targetPosition[1])
                    str += " class='target'>" + (crates[j][i] + 5);
                else if (i === playerPosition[0] && j === playerPosition[1])
                    str += " class='player'>" + playerText[playerDirection];
                else if (i === startPosition[0] && j === startPosition[1])
                    str += " class='start'>" + crates[j][i];
                else if (crates[j][i] === 0)
                    str += " class='nocrate'>0";
                else
                    str += ">" + crates[j][i];
                str += "</td>";
            }
            str += "</tr>";
        }
        str += "</table>";
        return str;
    };

    this.trySetDirection = function (direction) {
        if (direction !== N && direction !== E && direction !== S && direction !== W)
            alert("Invalid direction specified");
        else if (playerDirection === direction)
            return false;
        else {
            // additional point for rotating 180 degrees
            if ((playerDirection === N && direction === S) ||
                    (playerDirection === E && direction === W) ||
                    (playerDirection === S && direction === N) ||
                    (playerDirection === W && direction === E))
                this.score++;

            this.score++;
            playerDirection = direction;
            return true;
        }
    };

    this.move = function () {
        if (!tryMove(playerPosition[0], playerPosition[1], 0))
            return;

        if (playerDirection === N) {
            playerPosition[1]--;
        } else if (playerDirection === E) {
            playerPosition[0]++;
        } else if (playerDirection === S) {
            playerPosition[1]++;
        } else if (playerDirection === W) {
            playerPosition[0]--;
        }

        this.score++;
        // Level complete when the target reaches the start
        if (targetPosition[0] === startPosition[0] &&
                targetPosition[1] === startPosition[1])
            this.levelComplete = true;
    };

    this.blowUp = function () {
        var crate = getPositionInFront(playerPosition[0], playerPosition[1]);
        if (!isOutOfBounds(crate[0], crate[1]) &&
                (crates[crate[1]][crate[0]] !== 0) &&
                (crate[0] !== targetPosition[0] || crate[1] !== targetPosition[1])) {
            crates[crate[1]][crate[0]] = 0;
            this.score += 100;
        }
    };

    function isOutOfBounds(x, y) {
        return (x === -1 || y === -1 || x === size || y === size);
    }

    function getPositionInFront(x, y) {
        if (playerDirection === N)
            y--;
        else if (playerDirection === E)
            x++;
        else if (playerDirection === S)
            y++;
        else if (playerDirection === W)
            x--;

        return [x, y];
    }

    function tryMove(x, y, totalWeight) {
        if (totalWeight > 3)
            return false;

        var crate = getPositionInFront(x, y);
        if (isOutOfBounds(crate[0], crate[1]))
            return false;

        var crateInFrontVal = crates[crate[1]][crate[0]];
        if (crateInFrontVal === 0 || tryMove(crate[0], crate[1], totalWeight + crateInFrontVal)) {
            if (x === targetPosition[0] && y === targetPosition[1]) // move target crate
                targetPosition = [crate[0], crate[1]];

            crates[crate[1]][crate[0]] = crates[y][x];
            crates[y][x] = 0;
            return true;
        }
    }

    // From Math.random() Mozilla docs
    // Min/max are inclusive
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};