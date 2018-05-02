<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Puzzles | Jordan's Crate Game</title>
        <link rel="stylesheet" href="style/crategame.css" />
        <link rel="stylesheet" href="style/puzzlelist.css" />
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
        <table>
            <th class='big'>Puzzle Name</th>
            <th class='big'>Record Score</th>
                <?php
                require "DbHelper.php";
                $puzzles = DbHelper::getAllPuzzles();
                for($i = 0; $i < count($puzzles); $i++){
                    print <<<ENDLI
<tr class='clickable-row' onclick="window.location='crategame.php?id={$puzzles[$i]["seedlev"]}';">
    <td>
        <p class='big'>{$puzzles[$i]["puzname"]}</p>
        <p class='td-sub'>Discovered by {$puzzles[$i]["name"]}</p>
    </td>
    <td>
        <p class='big'>{$puzzles[$i]["score"]}</p>
        <p class='td-sub'>By {$puzzles[$i]["recname"]}</p>
    </td>
</tr>
ENDLI;
                }
                ?>
        </table>
    </body>
</html>
