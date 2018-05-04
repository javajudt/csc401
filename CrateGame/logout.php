<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style/sitewide.css" />
        <link rel="stylesheet" href="style/account_form.css" />
        <title></title>
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
        <?php
        require "authenticate.php";
        deauthenticate();
        
        ?>
        <p>You have been logged out. Thanks for visiting, and come back soon!</p>
    </body>
</html>
