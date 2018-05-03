<!DOCTYPE html>
<html>
    <head>
        <title>Jordan's Crate Game</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style/crategame.css" />
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
            </ul>
        </div>
        <div id="header" class='big'>
            <?php
            // Get and display record score, if any
            require "DbHelper.php";
            print "&nbsp;| ";
            $rec = DbHelper::getRecordScore($_GET['id']);
            print ($rec === "UNSOLVED" ? "" : "Record: ") . $rec;
            ?>
        </div>
        <div id="game">
            <canvas id="canvas"></canvas>
        </div>
    </body>
</html>
