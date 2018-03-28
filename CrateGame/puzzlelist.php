<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Puzzles | Jordan's Crate Game</title>
        <?php
        require "dblogin.php";
        ?>
    </head>
    <body>
        <table>
            <th>Puzzle Name</th>
        <?php
        if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
            die("Could not connect to database: " . mysqli_connect_error());

        if (!$connection || !isset($connection))
            die("Could not get puzzles: not connected");

        if (!$query = mysqli_query($connection, "SELECT seedlev, puzname FROM puzzles"))
            die("Could not get puzzles: " . mysqli_error($connection));
        
        while ($result = mysqli_fetch_assoc($query)) {
            $out .= "<tr><td><a href='crateboard.html?id=" . $result["seedlev"] . "'>" . $result["puzname"] . "</a></td></tr>";
            $seeds[$result["puzname"]] = $result["seedlev"];
        }
        print $out;

        mysqli_close($connection);
        ?>
        </table>
    </body>
</html>
