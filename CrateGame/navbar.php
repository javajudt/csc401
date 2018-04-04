<?php
/**
 * This function facilitates creating the navbar across web pages. This way if 
 * something changes, the change is automatically applied to all pages.
 * @param type $calling_page The server file that calls this function, intended to be supplied by $_SERVER['PHP_SELF'].
 * @return type Returns the navbar HTML string.
 */
function printNavbar($calling_page) {
    $pages['crategame'] = "Play";
    $pages['puzzlelist'] = "Puzzle List";
    $pages['signup'] = "Sign Up";
    
    $nav = "";
    foreach ($pages as $key => $page) {
        $selected = strpos($calling_page, $key);
        $nav .= "<li class='";
        if ($selected) $nav .= "selected";
        $nav .= "'><a class='";
        if ($selected) $nav .= "selected";
        $nav .= "' href='$key.php'>$page</a></li>";
    }
    return $nav;
}
