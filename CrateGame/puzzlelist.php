<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Puzzles | Jordan's Crate Game</title>
        <link rel="stylesheet" href="crategame.css" />
        <?php
        require "dblogin.php";
        ?>
    </head>
    <body>
        <table>
            <th class='big'>Puzzle Name</th>
            <th class='big'>Record Score</th>
        <?php
        if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
            die("Could not connect to database: " . mysqli_connect_error());

        if (!$query = mysqli_query($connection, "SELECT * FROM $puzzle_table"))
            die("Could not get puzzles: " . mysqli_error($connection));
        
        while ($result = mysqli_fetch_assoc($query)) {
            print <<<ENDLI
<tr class='clickable-row' onclick="window.location='crategame.php?id={$result["seedlev"]}';">
    <td>
        <p class='big'>{$result["puzname"]}</p>
        <p class='td-sub'>Discovered by {$result["name"]}</p>
    </td>
    <td>
        <p class='big'>{$result["score"]}</p>
        <p class='td-sub'>By {$result["recname"]}</p>
    </td>
</tr>
ENDLI;
        }

        mysqli_close($connection);
        ?>
        </table>
    </body>
</html>
