"use strict";

window.onload = function () {
    const canvSize = 500;
    const sqSize = 150;
    const imgSize = 100;

    var canvas = document.getElementById("canvas");
    canvas.width = canvSize;
    canvas.height = canvSize;
    canvas.style.border = "2px solid darkblue";
    canvas.style.backgroundColor = "skyblue";

    var context = canvas.getContext("2d");
    context.fillStyle = "#0000FF";

    var img = new Image();
    img.src = "square.png";
    img.alt = "Square";
    img.theta = 0;
    img.isRotating = false;
    img.rotate = function () {
        context.save();

        var mid = canvSize / 2;
        context.translate(mid, mid);
        context.rotate(this.theta * Math.PI / 180);
        context.translate(-mid, -mid);

        var imgCenter = (canvSize / 2) - (imgSize / 2);
        context.drawImage(this, imgCenter, imgCenter);

        context.restore();

        if (this.isRotating)
            this.theta++;
    };

    function draw() {
        // Draw new square over old image
        var sqCenter = canvSize / 2 - sqSize / 2;
        context.fillRect(sqCenter, sqCenter, sqSize, sqSize);

        img.rotate();
    }

    draw();

    // Rotate 1 degree every 5.56 ms to get close to 1 rotation in 2 seconds
    setInterval(function () {
        draw();
    }, 5.56);

    window.onclick = function () {
        img.isRotating = !img.isRotating;
    };
};