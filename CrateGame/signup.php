<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sign Up | Jordan's Crate Game</title>
        <link rel="stylesheet" href="style/sitewide.css" />
        <link rel="stylesheet" href="style/account_form.css" />
        <?php
        session_start();
        require "authenticate.php";
        if (challengeAuth()) {
            print "<script type='text/javascript'>window.location = '" . $_SERVER['DOCUMENT_ROOT'] . "/puzzlelist.php'</script>";
            die();
        }
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
        <div id="signup">
            <p>Sign up using the form below to take advantage of all the awesome privileges that accompany being registered! All fields are required.</p>
            <?php
            if (count($_POST) > 0) {
                $name = htmlentities(trim($_POST['name']));
                $email = htmlentities(trim($_POST['email']));
                $password = htmlentities($_POST['password']);
                $confirm = htmlentities($_POST['confirm']);

                if (strlen($name) === 0) {
                    $err['name'] = true;
                }if (strlen($email) === 0) {
                    $err['email'] = true;
                }if (strlen($password) === 0) {
                    $err['password'] = true;
                }if ($password !== $confirm || strlen($confirm) === 0) {
                    $err['confirm'] = true;
                }if ($password !== $confirm) {
                    $confirm_err = true;
                }
                if (!isset($err)) {
                    //Check if the email is already registered
                    require "DbHelper.php";
                    if (DbHelper::checkUserExists($email)) {
                        $err['email'] = true;
                        $dup = true;
                    } else {
                        $password = md5($password);
                        DbHelper::registerUser($name, $password, $email);

                        //Login the new user
                        tryAuth($email, $password);
                    }
                }
            }

            if ($_SERVER['REQUEST_METHOD'] === "GET" || isset($err)) {
                ?>
                <form action="<?php print $_SERVER['PHP_SELF']; ?>" method="POST">
                    <label class='<?php if ($err['name']) print 'error'; ?>' for='name'>Name</label>
                    <input class='text-input <?php if ($err['name']) print 'error'; ?>' type='text' name='name' title='A display name you want to use' value='<?php print $name; ?>' />

                    <label class='<?php if ($err['email']) print 'error'; ?>' for='email'>Email<?php if (isset($dup)) print " - This email address is already registered."; ?></label>
                    <input class='text-input <?php if ($err['email']) print 'error'; ?>' type='email' name='email' title='A valid email address' value='<?php print $email; ?>' />

                    <label class='<?php if ($err['password']) print 'error'; ?>' for='password'>Password</label>
                    <input class='text-input <?php if ($err['password']) print 'error'; ?>' type='password' name='password' title='A secure password' />

                    <label class='<?php if ($err['confirm']) print 'error'; ?>' for='confirm'>Confirm Password<?php if (isset($confirm_err)) print " - Passwords do not match"; ?></label>
                    <input class='text-input <?php if ($err['confirm']) print 'error'; ?>' type='password' name='confirm' title='Retype your password' />

                    <input type='submit' />
                </form>
                <?php
            } else {
                print <<<ENDLI
            <p>You have successfully registered with the following information:</p>
            <ul>
                <li>Name:  $name</li>
                <li>Email: $email</li>
            </ul>
ENDLI;
            }
            ?>
        </div>
    </body>
</html>
