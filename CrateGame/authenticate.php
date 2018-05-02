<?php

if (!function_exists("challengeAuth")) {

    /**
     * Check if somebody is logged in.
     * @return boolean
     */
    function challengeAuth() {
        session_start();
        if (isset($_SESSION['email'])) {
            return true;
        }
        return false;
    }

}

if (!function_exists("tryAuth")) {

    /**
     * Try to authenticate a user with the email and password.
     * @param type $email
     * @param type $md5Password Encrypted password
     * @return boolean
     */
    function tryAuth($email, $md5Password) {
        session_start();

        require_once "DbHelper.php";
        $user = DbHelper::getUser($email, $md5Password);

        if (!$user) {
            return false;
        }

        session_regenerate_id(true);
        $_SESSION['tag'] = $user['tag'];
        $_SESSION['email'] = $user['email'];
        return true;
    }

}

if (!function_exists("deauthenticate")) {

    /**
     * Log out the currently logged in user.
     */
    function deauthenticate() {
        session_start();
        session_destroy();
        $_SESSION = array();
    }

}
