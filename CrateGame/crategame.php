<!DOCTYPE html>
<html>
    <head>
        <title>Jordan's Crate Game</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style/sitewide.css" />
        <link rel="stylesheet" href="style/crategame.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="script/crategame.js"></script>
        <script src="script/gamelogic.js"></script>
        <script src="script/graphics.js"></script>
        <?php
        session_start();
        ?>
    </head>
    <body>
        <div id="navbar">
            <ul>
                <?php
                require "navbar.php";
                print printNavbar($_SERVER['PHP_SELF']);
                ?>
                <li><a href='crategame.php?id=<?php print $_GET['id']; ?>'>Reset</a></li>
                <li><a href='crategame.php?id=<?php print rand(); ?>'>New Puzzle</a></li>
            </ul>
        </div>
        <div id="header" class='big'></div>
        <div id='save' hidden='hidden'>
            <p>Congrats, you got a new high score!</p>
            <button id='save_button'>Save Score</button>
        </div>
        <div id="game">
            <canvas id="canvas"></canvas>
        </div>
    </body>
</html>
