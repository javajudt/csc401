<!DOCTYPE html>
<html>
    <head>
        <title>Jordan's Crate Game</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="crategame.css" />
        <script src="crategame.js"></script>
        <script src="gamelogic.js"></script>
        <script src="graphics.js"></script>
    </head>
    <body>
        <div id="navbar">
            <ul>
                <?php
                require "navbar.php";
                print printNavbar($_SERVER['PHP_SELF']);
                ?>
            </ul>
        </div>
        <div id="header" class='big'></div>
        <div id="game">
            <canvas id="canvas"></canvas>
        </div>
    </body>
</html>
