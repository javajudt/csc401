// Script for manipulating game properties

"use strict";

function Game() {
    const N = 0, E = 1, S = 2, W = 3;
    this.N = N;
    this.E = E;
    this.S = S;
    this.W = W;

    // Set object properties
    var size = getRandom(8, 12);
    var startPosition = new Point(getRandom(0, size - 1), size - 1);
    var playerPosition = new Point(startPosition.x, startPosition.y);
    var targetPosition;
    var playerDirection = N;
    var crates = [];
    var score = 0;
    var levelComplete = false;
    
    this.getSize = function(){
        return size;
    };
    
    this.getStartPosition = function(){
        return startPosition;
    };
    
    this.getPlayerPosition = function(){
        return playerPosition;
    };
    
    this.getTargetPosition = function(){
        return targetPosition;
    };
    
    this.getPlayerDirection = function(){
        return playerDirection;
    };
    
    this.getCrates = function(){
        return crates;
    };
    
    this.getScore = function(){
        return score;
    };
    
    this.getLevelComplete = function(){
        return levelComplete;
    };

    // Generate crates
    for (var j = 0; j < size; j++) {
        var row = [];
        for (var i = 0; i < size; i++) {
            var crate = getRandom(0, 99);
            // 60% chance no crate, and don't put a crate on top of the player (weight = 0)
            if (crate < 60 || playerPosition.equals(new Point(i, j)))
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

    // Set target crate
    while (!targetPosition) {
        var tx = getRandom(1, size - 2); // Not on edge of board
        var ty = getRandom(1, size - 2);
        if (crates[ty][tx] !== 0)
            targetPosition = new Point(tx, ty);
    }

    // Changes the player direction to the direction specified.
    // Returns true if the direction was changed, and false if it stayed the same. 
    // Invalid direction does not return.
    this.trySetDirection = function (direction) {
        if (direction !== N && direction !== E && direction !== S && direction !== W)
            console.log("Invalid direction in gameLogic.Game.trySetDirection");
        else if (playerDirection === direction)
            return false;
        else {
            // additional point for rotating 180 degrees
            if ((playerDirection === N && direction === S) ||
                    (playerDirection === E && direction === W) ||
                    (playerDirection === S && direction === N) ||
                    (playerDirection === W && direction === E))
                score++;

            score++;
            playerDirection = direction;
            return true;
        }
    };

    // Moves the player forward 1 block in the facing direction.
    this.move = function () {
        if (!tryMove(playerPosition, 0))
            return;

        if (playerDirection === N)
            playerPosition.moveNorth();
        else if (playerDirection === E)
            playerPosition.moveEast();
        else if (playerDirection === S)
            playerPosition.moveSouth();
        else if (playerDirection === W)
            playerPosition.moveWest();

        score++;

        // Level complete when the target reaches the start
        if (targetPosition.equals(startPosition))
            levelComplete = true;
    };

    // Blows up the crate immediately in front of the player, if any.
    this.blowUp = function () {
        var crate = playerPosition.getPointInFront(playerDirection);
        if (!crate.isOutOfBounds() &&
                (crates[crate.y][crate.x] !== 0) &&
                (!crate.equals(targetPosition))) {
            crates[crate.y][crate.x] = 0;
            score += 100;
        }
    };
    
    // Returns true if it is possible to move forward.
    // Returns false when the player trys to move off of the board
    // or trys to move too much weight.
    function tryMove(point, totalWeight) {
        if (totalWeight > 3)
            return false;

        var crate = point.getPointInFront(playerDirection);
        if (crate.isOutOfBounds())
            return false;

        var crateInFrontVal = crates[crate.y][crate.x];
        if (crateInFrontVal === 0 || tryMove(crate, totalWeight + crateInFrontVal)) {
            if (point.equals(targetPosition)) // move target crate
                targetPosition = crate;

            crates[crate.y][crate.x] = crates[point.y][point.x];
            crates[point.y][point.x] = 0;
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

    // Point object for storing x and y values.
    function Point(x, y) {
        this.x = x;
        this.y = y;

        this.moveNorth = function () {
            this.y--;
        };

        this.moveEast = function () {
            this.x++;
        };

        this.moveSouth = function () {
            this.y++;
        };

        this.moveWest = function () {
            this.x--;
        };

        this.equals = function (point) {
            return (this.x === point.x) && (this.y === point.y);
        };

        // Returns the Point directly in front of this Point, based on the player's facing direction.
        this.getPointInFront = function (direction) {
            var point = new Point(this.x, this.y);
            if (direction === N)
                point.moveNorth();
            else if (direction === E)
                point.moveEast();
            else if (direction === S)
                point.moveSouth();
            else if (direction === W)
                point.moveWest();

            return point;
        };

        // Returns true if the specified position is out of bounds of the board.
        // Returns false otherwise.
        this.isOutOfBounds = function () {
            return (this.x < 0 || this.y < 0 || this.x >= size || this.y >= size);
        };
    }
}