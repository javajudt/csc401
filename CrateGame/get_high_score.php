<?php
require "DbHelper.php";
print DbHelper::getRecordScore($_GET['puzId']);