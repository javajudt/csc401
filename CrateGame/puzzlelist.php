<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Puzzles | Jordan's Crate Game</title>
        <link rel="stylesheet" href="crateGame.css" />
        <?php
        require "dblogin.php";
        ?>
    </head>
    <body>
        <table>
            <th>Puzzle Name</th>
            <th>Record Score</th>
        <?php
        if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
            die("Could not connect to database: " . mysqli_connect_error());

        if (!$connection || !isset($connection))
            die("Could not get puzzles: not connected");

        if (!$query = mysqli_query($connection, "SELECT * FROM puzzles"))
            die("Could not get puzzles: " . mysqli_error($connection));
        
        while ($result = mysqli_fetch_assoc($query)) {
            print <<<ENDLI
<tr class='clickable-row' onclick="window.location='crateGame.html?id={$result["seedlev"]}';">
    <td>
        <p>{$result["puzname"]}</p>
        <p class='td-sub'>Discovered by {$result["name"]}</p>
    </td>
    <td>
        <p>{$result["score"]}</p>
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
