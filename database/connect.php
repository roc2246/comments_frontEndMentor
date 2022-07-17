<?php

/**
 * Connection parameters
 *
 * PHP version 7.4
 *
 * @category Libraries
 * @package  Pages
 * @author   Riley Childs <riley.childs@yahoo.com>
 * @license  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
 * @link     http://wh963069.ispot.cc/projects/comments/database/connect.php
 */
error_reporting(E_ALL);
ini_set('display_errors', 'On');
// phpinfo();
$servername = 'localhost';
$username = 'root';
$password = 'root';
$database = 'comments';

// $servername = 'wh963069.ispot.cc';
// $username = 'childswe_eCommerce';
// $password = 'sd234s';
// $database = 'childswe_eCommerce';

$connection = new mysqli($servername, $username, $password, $database);

// if (!$connection) {
//      die("Database connection failed");
// }
// https://www.php.net/manual/en/mysqli.installation.php
if (!mysqli_query($connection, "SET a=1")) {
     printf("Error message: %s\n", mysqli_error($connection));
}

if (http_response_code() !== 500) {
     echo "TEST";
} 
?>