"use strict";

function Game() {
    const N = 0, E = 1, S = 2, W = 3;
    this.N = N;
    this.E = E;
    this.S = S;
    this.W = W;

    // Set object properties
    this.size = getRandom(8, 12);
    this.startPosition = new Point(getRandom(0, size - 1), size - 1);
    this.playerPosition = new Point(this.startPosition.x, this.startPosition.y);
    this.playerDirection = N;
    this.crates = [];
    this.score = 0;
    this.levelComplete = false;

    // Generate crates
    for (var j = 0; j < size; j++) {
        var row = [];
        for (var i = 0; i < size; i++) {
            var crate = getRandom(0, 99);
            if (crate < 60 || // 60% chance no crate, and don't put a crate on top of the player (weight = 0)
                    (i === this.playerPosition.x && j === this.playerPosition.y))
                crate = 0;
            else if (crate < 80) // 20% chance weight=1
                crate = 1;
            else if (crate < 90) // 10% chance weight=2
                crate = 2;
            else // 10% chance weight=3
                crate = 3;

            row.push(crate);
        }
        this.crates.push(row);
    }

    // Set target crate
    while (!this.targetPosition) {
        var tx = getRandom(1, this.size - 2); // Not on edge of board
        var ty = getRandom(1, this.size - 2);
        if (this.crates[ty][tx] !== 0)
            this.targetPosition = new Point(tx, ty);
    }

    // Changes the player direction to the direction specified.
    // Returns true if the direction was changed, and false if it stayed the same. 
    // Invalid direction does not return.
    this.trySetDirection = function (direction) {
        if (direction !== N && direction !== E && direction !== S && direction !== W)
            console.log("Invalid direction in gameLogic.Game.trySetDirection");
        else if (this.playerDirection === direction)
            return false;
        else {
            // additional point for rotating 180 degrees
            if ((this.playerDirection === N && direction === S) ||
                    (this.playerDirection === E && direction === W) ||
                    (this.playerDirection === S && direction === N) ||
                    (this.playerDirection === W && direction === E))
                this.score++;

            this.score++;
            this.playerDirection = direction;
            return true;
        }
    };

    // Moves the player forward 1 block in the facing direction.
    this.move = function () {
        if (!tryMove(this.playerPosition, 0))
            return;

        if (this.playerDirection === N)
            this.playerPosition.moveNorth();
        else if (this.playerDirection === E)
            this.playerPosition.moveEast();
        else if (this.playerDirection === S)
            this.playerPosition.moveSouth();
        else if (this.playerDirection === W)
            this.playerPosition.moveWest();

        this.score++;

        // Level complete when the target reaches the start
        if (this.targetPosition.equals(this.startPosition))
            this.levelComplete = true;
    };

    // Blows up the crate immediately in front of the player, if any.
    this.blowUp = function () {
        var crate = getPositionInFront(this.playerPosition);
        if (!isOutOfBounds(crate) &&
                (this.crates[crate.y][crate.x] !== 0) &&
                (!crate.equals(this.targetPosition))) {
            this.crates[crate.y][crate.x] = 0;
            this.score += 100;
        }
    };

    // Returns true if the specified position is out of bounds of the board.
    // Returns false otherwise.
    function isOutOfBounds(point) {
        return (point.x < 0 || point.y < 0 || point.x >= this.size || point.y >= this.size);
    }

    // Returns the coordinates directly in front of the specified coordinates.
    function getPositionInFront(point) {
        if (this.playerDirection === N)
            point.moveNorth();
        else if (this.playerDirection === E)
            point.moveEast();
        else if (this.playerDirection === S)
            point.moveSouth();
        else if (this.playerDirection === W)
            point.moveWest();

        return point;
    }

    // Returns true if it is possible to move forward.
    // Returns false when the player trys to move off of the board
    // or trys to move too much weight.
    function tryMove(point, totalWeight) {
        if (totalWeight > 3)
            return false;

        var crate = getPositionInFront(point);
        if (isOutOfBounds(crate))
            return false;

        var crateInFrontVal = this.crates[crate.y][crate.x];
        if (crateInFrontVal === 0 || tryMove(crate, totalWeight + crateInFrontVal)) {
            if (point.equals(this.targetPosition)) // move target crate
                this.targetPosition = crate;

            this.crates[crate.y][crate.x] = this.crates[point.y][point.x];
            this.crates[point.y][point.x] = 0;
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
    }

/*
    // Possibly use this
    function Crate(point, weight, isTarget) {
        this.point = point;
        this.weight = weight;

        // Parameter isTarget is optional, so check if it's falsey
        if (!isTarget)
            this.isTarget = false;
        else
            this.isTarget = isTarget;
    }*/
}