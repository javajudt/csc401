"use strict";

(function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#FF0000";
    context.fillRect(0,0,150,75);
//    var img = new Image();
//    img.src = "square.png";
//    img.alt = "Square";
    setInterval(function(){
        //document.writeln("hi");
    }, 5000);
})();