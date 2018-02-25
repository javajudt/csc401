"use strict";

(function () {
    var Board = function () {
        const N = 0;
        const E = 1;
        const S = 2;
        const W = 3;
        var playerText = ["^", ">", "v", "<"];

        var size = getRandom(8, 12);
        var playerPosition = [getRandom(0, size - 1), size - 1];
        var playerDirection = N;
        var crates = [];

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
            ;
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
            var str = "<table>";
            for (j = 0; j < size; j++) {
                str += "<tr>";
                for (i = 0; i < size; i++) {
                    str += "<td";
                    if (i === targetPosition[0] && j === targetPosition[1])
                        str += " class='target'>" + (crates[j][i] + 5);
                    else if (i === playerPosition[0] && j === playerPosition[1])
                        str += " class='player'>" + playerText[playerDirection];
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
    };

    window.onload = function () {
        var board = new Board();
        document.body.innerHTML = board;
    };
})();

// From Math.random() Mozilla docs
// Min/max are inclusive
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
;