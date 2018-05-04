<?php

/**
 * This function facilitates creating the navbar across web pages. This way if 
 * something changes, the change is automatically applied to all pages.
 * @param type $calling_page The server file that calls this function, intended to be supplied by $_SERVER['PHP_SELF'].
 * @return type Returns the navbar HTML string.
 */
function printNavbar($calling_page) {
    session_start();
    $pages['crategame'] = "Play";
    $pages['puzzlelist'] = "Puzzle List";

    require_once "authenticate.php";
    if (challengeAuth()) {
        $pages['logout'] = "Welcome, {$_SESSION['tag']}! (Logout)";
    } else {
        $pages['signup'] = "Sign Up";
        $pages['login'] = "Login";
    }

    $nav = "";
    foreach ($pages as $key => $page) {
        $selected = strpos($calling_page, $key);
        $nav .= "<li class='" . ($selected ? "selected" : "") . "'><a class='" . ($selected ? "selected" : "");
        // Set tab link. If crategame, choose random int for id.
        $nav .= "' href='$key.php" . ($key === "crategame" ? ("?id=" . rand()) : "") . "'>$page</a></li>";
    }
    return $nav;
}
