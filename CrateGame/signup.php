<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sign Up | Jordan's Crate Game</title>
        <link rel="stylesheet" href="crategame.css" />
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
            $name = htmlentities(trim($_POST['name']));
            $email = htmlentities(trim($_POST['email']));
            $password = htmlentities($_POST['password']);
            $confirm = htmlentities($_POST['confirm']);

            if (count($_POST) > 0) {
                if (strlen($name) === 0)
                    $err['name'] = true;
                if (strlen($email) === 0)
                    $err['email'] = true;
                if (strlen($password) === 0)
                    $err['password'] = true;
                if ($password !== $confirm || strlen($confirm) === 0)
                    $err['confirm'] = true;
                if ($password !== $confirm)
                    $confirm_err = true;

                if (!isset($err)) {
                    require "dblogin.php";
                    if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
                        die("Could not connect to database: " . mysqli_connect_error());

                    mysqli_real_escape_string($connection, $name);
                    mysqli_real_escape_string($connection, $email);
                    mysqli_real_escape_string($connection, $password);

                    $password = md5($password);
                    if (!$query = mysqli_query($connection, "INSERT INTO "
                            . "$users_table(tag,password,email) "
                            . "VALUES('$name','$password','$email')")) {
                        if (strpos(mysqli_error($connection), "Duplicate") === 0) {
                            $err['email'] = true;
                            $dup = true;
                        } else
                            die("Could not add user: " . mysqli_error($connection));
                    }

                    mysqli_close($connection);
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
