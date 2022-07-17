<?php
/**
 * Main Page for Comments
 *
 * PHP version 7.4
 *
 * @category PHP
 * @package  Pages
 * @author   Riley Childs <riley.childs@yahoo.com>
 * @license  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
 * @link     http://wh963069.ispot.cc/projects/comments/index.php
 */

require 'database/connect.php';
/**
 * Retrieves comment data
 *
 * @return Div element
 */
function getComments()
{
    global $connection;
    $query = "SELECT * FROM comments";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query FAILED' . mysqli_error($connection));
    }
    while ($row = mysqli_fetch_assoc($result)) {
        $comment = "<div class='comment'>";
        $comment .= "  <div class='comment__vote'>";
        $comment .= "    <div>";
        $comment .= "      <img src='images/icon-plus.svg' alt='' class='upvote'>";
        $comment .= "    </div>";
        $comment .= "    <p class='rating'>" . $row['score'] . "</p>";
        $comment .= "   </div>";
        $comment .= "</div>";
        echo $comment;
    }
}
?>