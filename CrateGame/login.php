<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Login | Jordan's Crate Game</title>
        <link rel="stylesheet" href="style/crategame.css" />
        <link rel="stylesheet" href="style/account_form.css" />
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
        <div id="signin">
            <p>Already have an account? Sign in!</p>
            <?php
            if (count($_POST) > 0) {
                $email = htmlentities(trim($_POST['email']));
                $password = htmlentities($_POST['password']);

                if (strlen($email) === 0)
                    $err['email'] = true;
                if (strlen($password) === 0)
                    $err['password'] = true;

                if (!isset($err)) {
                    //Login
                    if (!tryAuth($email, md5($password))) {
                        $err['email'] = true;
                        $err['password'] = true;
                        $incorrect = true;
                    }
                }
            }

            if ($_SERVER['REQUEST_METHOD'] === "GET" || isset($err)) {
                if ($incorrect) {
                    print "<p id='incorrect'>Email or password is incorrect.</p>";
                }
                ?>
                <form action="<?php print $_SERVER['PHP_SELF']; ?>" method="POST">
                    <label class='<?php if ($err['email']) print 'error'; ?>' for='email'>Email</label>
                    <input class='text-input <?php if ($err['email']) print 'error'; ?>' type='email' name='email' value='<?php print $email; ?>' />

                    <label class='<?php if ($err['password']) print 'error'; ?>' for='password'>Password</label>
                    <input class='text-input <?php if ($err['password']) print 'error'; ?>' type='password' name='password' />

                    <input type='submit' />
                </form>
                <?php
            } else {
                print "<p>Welcome, {$_SESSION['tag']}!</p>";
                ?>
            <ul>
                <li><a href='crategame.php'>Play a random game</a></li>
                <li><a href='puzzlelist.php'>View the puzzle list</a></li>
            </ul>
            
                <?php
            }
            ?>
        </div>
    </body>
</html>
