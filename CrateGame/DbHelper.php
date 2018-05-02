<?php

class DbHelper {

    private static $db_user = "root";
    private static $db_password = "doug401";
    private static $db_name = "cratedb";
    private static $table_name_puzzles = "puzzles";
    private static $table_name_users = "users";
    private static $db_host = "127.0.0.1";
    private static $connection = null;

    /**
     * Tries to register a new user.
     * @param type $name Name of the user
     * @param type $md5Password Encrypted password
     * @param type $email Email
     */
    public static function registerUser($name, $md5Password, $email) {
        self::connect();
        $name = mysqli_real_escape_string(self::$connection, $name);
        $md5Password = mysqli_real_escape_string(self::$connection, $md5Password);
        $email = mysqli_real_escape_string(self::$connection, $email);

        $sql = "INSERT INTO " . self::$table_name_users . "(tag,password,email) VALUES('$name','$md5Password','$email')";
        if (!mysqli_query(self::$connection, $sql)) {
            die("Could not add user: " . mysqli_error(self::$connection));
        }

        self::disconnect();
    }

    /**
     * Checks whether an email address is registered.
     * @param type $email
     * @return boolean
     */
    public static function checkUserExists($email) {
        self::connect();
        $email = mysqli_real_escape_string(self::$connection, $email);

        $sql = "SELECT count(*) FROM " . self::$table_name_users . " WHERE email='$email' LIMIT 1";
        if (!$query = mysqli_query(self::$connection, $sql)) {
            die("Could not get user: " . mysqli_error(self::$connection));
        }

        $result = mysqli_fetch_row($query);
        self::disconnect();
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
        self::connect();
        $email = mysqli_real_escape_string(self::$connection, $email);
        $md5Password = mysqli_real_escape_string(self::$connection, $md5Password);

        $sql = "SELECT tag,email FROM " . self::$table_name_users . " WHERE email='$email' AND password='$md5Password' LIMIT 1";
        if (!$query = mysqli_query(self::$connection, $sql)) {
            die("Could not get user: " . mysqli_error(self::$connection));
        }
        
        self::disconnect();
        if (mysqli_num_rows($query) !== 1){
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
        self::connect();
        
        $sql = "SELECT * FROM " . self::$table_name_puzzles;
        if (!$query = mysqli_query(self::$connection, $sql)){
            die("Could not get puzzles: " . mysqli_error(self::$connection));
        }
        $result = mysqli_fetch_assoc($query);
        $data = array();
        for($i = 0; $result; $i++){
            $data[$i] = $result;
            $result = mysqli_fetch_assoc($query);
        }
        
        self::disconnect();
        return $data;
    }

    public static function savePuzzle($puzId, $puzName, $discoverName, $recordName, $recordScore) {
        self::connect();
        $puzId = mysqli_real_escape_string(self::$connection, $puzId);
        $puzName = mysqli_real_escape_string(self::$connection, $puzName);
        $discoverName = mysqli_real_escape_string(self::$connection, $discoverName);
        $recordName = mysqli_real_escape_string(self::$connection, $recordName);
        $recordScore = mysqli_real_escape_string(self::$connection, $recordScore);
        
        self::disconnect();
    }

    public static function saveScore($puzId, $recordName, $recordScore) {
        self::connect();
        $puzId = mysqli_real_escape_string(self::$connection, $puzId);
        $recordName = mysqli_real_escape_string(self::$connection, $recordName);
        $recordScore = mysqli_real_escape_string(self::$connection, $recordScore);
        
        self::disconnect();
    }

    private static function connect() {
        if (!self::$connection = mysqli_connect(self::$db_host, self::$db_user, self::$db_password, self::$db_name)) {
            die("Could not connect to database: " . mysqli_connect_error());
        }
    }

    private static function disconnect() {
        if (self::$connection) {
            mysqli_close(self::$connection);
            self::$connection = null;
        }
    }

}
