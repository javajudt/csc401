<?php

class DbHelper {

    private static $table_name_puzzles = "puzzles";
    private static $table_name_users = "users";
    private static $connection = null;

    /**
     * Tries to register a new user.
     * @param type $name Name of the user
     * @param type $md5Password Encrypted password
     * @param type $email Email
     */
    public static function registerUser($name, $md5Password, $email) {
        $conObj = new Connection();
        $con = $conObj->connection;
        $name = mysqli_real_escape_string($con, $name);
        $md5Password = mysqli_real_escape_string($con, $md5Password);
        $email = mysqli_real_escape_string($con, $email);

        $sql = "INSERT INTO " . self::$table_name_users . "(tag,password,email) VALUES('$name','$md5Password','$email')";
        if (!mysqli_query($con, $sql)) {
            die("Could not add user: " . mysqli_error($con));
        }
    }

    /**
     * Checks whether an email address is registered.
     * @param type $email
     * @return boolean
     */
    public static function checkUserExists($email) {
        $conObj = new Connection();
        $con = $conObj->connection;
        $email = mysqli_real_escape_string($con, $email);

        $sql = "SELECT count(*) FROM " . self::$table_name_users . " WHERE email='$email' LIMIT 1";
        if (!$query = mysqli_query($con, $sql)) {
            die("Could not get user count: " . mysqli_error($con));
        }

        $result = mysqli_fetch_row($query);
        if ($result[0] === 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Gets user info if an entry matches the email and password.
     * @param type $email Email
     * @param type $md5Password Encrypted password
     * @return False if user does not exist, otherwise associative array with user info ('tag','email')
     */
    public static function getUser($email, $md5Password) {
        $conObj = new Connection();
        $con = $conObj->connection;
        $email = mysqli_real_escape_string($con, $email);
        $md5Password = mysqli_real_escape_string($con, $md5Password);

        $sql = "SELECT tag,email FROM " . self::$table_name_users . " WHERE email='$email' AND password='$md5Password' LIMIT 1";
        if (!$query = mysqli_query($con, $sql)) {
            die("Could not get user: " . mysqli_error($con));
        }

        if (mysqli_num_rows($query) !== 1) {
            return false;
        }
        $result = mysqli_fetch_assoc($query);
        return $result;
    }

    /**
     * Gets all saved puzzle info.
     * @return Array of arrays of puzzle info ('seedlev','puzname','name','recname','score','when')
     */
    public static function getAllPuzzles() {
        $sql = "SELECT * FROM " . self::$table_name_puzzles;
        $conObj = new Connection();
        $con = $conObj->connection;
        if (!$query = mysqli_query($con, $sql)) {
            die("Could not get puzzles: " . mysqli_error($con));
        }

        $result = mysqli_fetch_assoc($query);
        $data = array();
        for ($i = 0; $result; $i++) {
            $data[$i] = $result;
            $result = mysqli_fetch_assoc($query);
        }

        return $data;
    }

    /**
     * Returns the record score for a puzzle, or "UNSOLVED" if there is no record.
     * @param type $puzId Puzzle ID
     * @return string The stored score or "UNSOLVED"
     */
    public static function getRecordScore($puzId) {
        if (!$puzId) {
            return "UNSOLVED";
        }

        $conObj = new Connection();
        $con = $conObj->connection;
        $puzId = mysqli_real_escape_string($con, $puzId);

        $sql = "SELECT score FROM " . self::$table_name_puzzles . " WHERE seedlev=" . $puzId;
        if (!$query = mysqli_query($con, $sql)) {
            die("Could not get record score: " . mysqli_error($con));
        }

        if (mysqli_num_rows($query) != 1) {
            return "UNSOLVED";
        }

        $result = mysqli_fetch_row($query);
        return $result[0];
    }

    /**
     * Saves a new record score.
     * @param type $puzId ID of the puzzle
     * @param type $recordName Name of the record holder
     * @param type $recordScore New record score
     */
    public static function saveScore($puzId, $recordName, $recordScore) {
        $conObj = new Connection();
        $con = $conObj->connection;
        $puzId = mysqli_real_escape_string($con, $puzId);
        $recordName = mysqli_real_escape_string($con, $recordName);
        $recordScore = mysqli_real_escape_string($con, $recordScore);
        
        if (self::getRecordScore($puzId) === "UNSOLVED") {
            $sql = "INSERT INTO " . self::$table_name_puzzles . "(seedlev,name,recname,score) VALUES($puzId,'$recordName','$recordName',$recordScore)";
        } else {
            $sql = "UPDATE " . self::$table_name_puzzles . " SET recname='$recordName', score=$recordScore WHERE seedlev=$puzId";
        }
        
        if (!$query = mysqli_query($con, $sql)) {
            die("Could not save score: " . mysqli_error($con));
        }
    }
}

class Connection{
    
    private static $db_user = "root";
    private static $db_password = "doug401";
    private static $db_name = "cratedb";
    private static $db_host = "127.0.0.1";
    
    public $connection;
    
    public function __construct(){
        if (!$this->connection = mysqli_connect(self::$db_host, self::$db_user, self::$db_password, self::$db_name)) {
            die("Could not connect to database: " . mysqli_connect_error());
        }
    }
    
    public function __destruct() {
        if ($this->connection) {
            mysqli_close($this->connection);
            $this->connection = null;
        }
    }
}