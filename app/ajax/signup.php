<?php

require_once '../connection.php';
require_once 'emailcheck.php';

if (isset($_GET['email'])) {
    $name = $_GET['name'];
    $email = $_GET['email'];
    $password = $_GET['password'];
    $password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO `users`(`name`, `email`, `password`) VALUES (:name, :email, :password)";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        echo true;
    } else {
        echo false;
    }
}