<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Cool Database Stuff</title>
        <?php
        require "dblogin.php";
        ?>
    </head>
    <body>
        <?php
        if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
            die("Could not connect to database: " . mysqli_connect_error());

        if (!$connection || !isset($connection))
            die("Could not get puzzles: not connected");

        if (!$query = mysqli_query($connection, "SELECT puzname FROM puzzles"))
            die("Could not get puzzles: " . mysqli_error($connection));

        while ($result = mysqli_fetch_assoc($query)) {
            $out .= $result["puzname"] . "<br />";
        }
        print $out;

        mysqli_close($connection);
        ?>
    </body>
</html>
