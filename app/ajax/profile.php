<?php
require_once '../connection.php';

if (isset($_POST['name'])) {
    $sql = "UPDATE `users` SET`name`='" . $_POST['name'] . "' WHERE `id` = :id";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
    if ($stmt->execute()) {
        echo true;
    } else {
        echo false;
    }
}

if (isset($_POST['about'])) {
    $sql = "UPDATE `users` SET`about`='" . $_POST['about'] . "' WHERE `id` = :id";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
    if ($stmt->execute()) {
        echo true;
    } else {
        echo false;
    }
}

if (isset($_POST['phone'])) {
    $sql = "UPDATE `users` SET`phone`='" . $_POST['phone'] . "' WHERE `id` = :id";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
    if ($stmt->execute()) {
        echo true;
    } else {
        echo false;
    }
}

if (isset($_POST['fb_link'])) {
    $sql = "UPDATE `users` SET`facebook`='" . $_POST['fb_link'] . "' WHERE `id` = :id";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
    if ($stmt->execute()) {
        echo true;
    } else {
        echo false;
    }
}

if (isset($_POST['twitter_link'])) {
    $sql = "UPDATE `users` SET`twitter`='" . $_POST['twitter_link'] . "' WHERE `id` = :id";
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':id', $_SESSION['user_id'], PDO::PARAM_INT);
    if ($stmt->execute()) {
        echo true;
    } else {
        echo false;
    }
}