<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sign Up | Jordan's Crate Game</title>
        <link rel="stylesheet" href="crategame.css" />
        <?php
        require "dblogin.php";
        ?>
    </head>
    <body>
        <?php
        $name = mysqli_real_escape_string(htmlentities(trim($_POST['name'])));
        $email = mysqli_real_escape_string(htmlentities(trim($_POST['email'])));
        $password = mysqli_real_escape_string(htmlentities($_POST['password']));
        $confirm = mysqli_real_escape_string(htmlentities($_POST['confirm']));

        if (count($_POST) > 0) {
            print "<pre>";
            print_r($_POST);
            print "</pre>";

            if (strlen($name) === 0)
                $err['name'] = true;
            if (strlen($email) === 0)
                $err['email'] = true;
            if (strlen($password) === 0)
                $err['password'] = true;
            if ($password !== $confirm || strlen($confirm) === 0)
                $err['confirm'] = true;

            if (!isset($err)) {
                if (!$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name))
                    die("Could not connect to database: " . mysqli_connect_error());

                $password = md5($password);
                if (!$query = mysqli_query($connection, "INSERT INTO "
                        . "$users_table('tag','password','email') "
                        . "VALUES('$name','$password','$email')"))
                    die("Could not add user: " . mysqli_error($connection));

                mysqli_close($connection);
            }
        }
        
        if ($_SERVER['REQUEST_METHOD'] === "GET" || isset($err)){
            ?>
            <form action="<?php print $SERVER['PHP_SELF']; ?>" method="POST">
                <label class='<?php if ($err['name']) print 'error'; ?>' for='name'>Name</label>
                <input class='<?php if ($err['name']) print 'error'; ?>' type='text' name='name' title='A display name you want to use' value='<?php print $name; ?>' />

                <label class='<?php if ($err['email']) print 'error'; ?>' for='email'>Email</label>
                <input class='<?php if ($err['email']) print 'error'; ?>' type='email' name='email' title='A valid email address' value='<?php print $email; ?>' />

                <label class='<?php if ($err['password']) print 'error'; ?>' for='password'>Password</label>
                <input class='<?php if ($err['password']) print 'error'; ?>' type='password' name='password' title='A secure password' />

                <label class='<?php if ($err['confirm']) print 'error'; ?>' for='confirm'>Confirm Password</label>
                <input class='<?php if ($err['confirm']) print 'error'; ?>' type='password' name='confirm' title='Retype your password' />

                <input type='submit' />
            </form>
        <?php
        }
        
        ?>
    </body>
</html>
