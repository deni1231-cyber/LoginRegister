<?php

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    
    $sql = "SELECT * FROM `users` WHERE `email` = :email";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount()) {
        echo 'true';
    } else {
        echo 'false';
    }
}