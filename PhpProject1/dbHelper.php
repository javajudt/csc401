<?php

$db_user = "root";
$db_password = "doug401";
$db_name = "cratedb";
$db_host = "127.0.0.1";

function connect() {
    if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
        die("Could not connect to database: " . mysqli_connect_error());
}

function disconnect() {
    mysqli_close($connection);
}

function getPuzzles() {
    $result = mysqli_query($connection, "SELECT * FROM puzzles");
}
