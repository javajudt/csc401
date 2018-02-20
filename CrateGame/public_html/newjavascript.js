"use strict";

(function () {
    var Board = function () {
        const N = 0;
        const E = 1;
        const S = 2;
        const W = 3;
        
        var size = getRandom(8, 12);
        var playerPosition = [getRandom(0, size - 1), 0];
        var playerDirection = N;
        var crates = [];
        
        for (i = 0; i < size; i++){
            var row = [];
            for (j = 0; j < size; j++){
                var square = getRandom(0,99);
                if (square < 20) // 20% chance weight=1
                    square = 1;
                else if (square < 30) // 10% chance weight=2
                    square = 2;
                else if (square < 40) // 10% chance weight=3
                    square = 3;
                else // 60% chance no crate (weight=0)
                    square = 0;
                
                row.push(square);
            };
            crates.push(row);
        }
        
        var targetPosition = [];
        while(!targetPosition){
            var tx = getRandom(1,size-2); // Not on edge of board
            var ty = getRandom(1,size-2);
            if (crates[tx, ty] !== 0)
                targetPosition.push(tx,ty);
        }
        
        this.toString = function(){
            var str = "";
            for (i = 0; i < size; i++){
                for (j = 0; j < size; j++){
                    if ([i,j] === targetPosition)
                        str += "X";
                    else if ([i,j] === playerPosition)
                        str += printPlayer();
                    else
                        str += crates[i][j];
                    
                    str += " ";
                }
                str += "\n";
            }
            return str;
        };
        
        var printPlayer = function(){
            if (playerDirection === N)
                return "^";
            else if (playerDirection === E)
                return ">";
            else if (playerDirection === S)
                return "v";
            else if (playerDirection === W)
                return "<";
        };
    };
    
    var board = new Board();
    window.onclick = function () {
        document.writeln(board);
    };
})();

// From Math.random() Mozilla docs
// Inclusive min/max
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};