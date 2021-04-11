<?php
require_once '../connection.php';
require_once '../ajax/emailcheck.php';

if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $password = $_GET['password'];

    $sql = "SELECT * FROM `users` WHERE `email` = :email";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['id'];
       echo true;
    } else {
        echo false;
    }
}