<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Sign Up | Jordan's Crate Game</title>
        <link rel="stylesheet" href="crategame.css" />
    </head>
    <body>
        <?php
        if (count($_POST) > 0) {
            print "<pre>";
            print_r($_POST);
            print "</pre>";
        }
        
        
        
        ?>
        <form action="<?php print $SERVER['PHP_SELF']; ?>" method="POST">
            <label for='name'>Name</label>
            <input type='text' name='name' title='A display name you want to use' value='<?php if(isset($_POST['name'])) print $_POST['name']; ?>' />
            
            <label for='email'>Email</label>
            <input type='email' name='email' title='A valid email address' value='<?php if(isset($_POST['email'])) print $_POST['email']; ?>' />
            
            <label for='password'>Password</label>
            <input type='password' name='password' title='A secure password' />
            
            <label for='confirm'>Confirm Password</label>
            <input type='password' name='confirm' title='Retype your password' />
            
            <input type='submit' />
        </form>
    </body>
</html>
