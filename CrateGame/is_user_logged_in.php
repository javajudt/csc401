<?php
require "authenticate.php";
if (challengeAuth()){
    print "true";
} else {
    print "false";
}