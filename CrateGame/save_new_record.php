<?php
session_start();
require "DbHelper.php";
DbHelper::saveScore($_POST['puzId'], $_SESSION['tag'], $_POST['recordScore']);
