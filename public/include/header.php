<?php require_once '../app/connection.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" href="img/icon.png" type="img/icon.png" />
  <link rel="stylesheet" href="../public/css/font-awesome.min.css">
  <link rel="stylesheet" href="../public/css/bootstrap.min.css">
  <link rel="stylesheet" href="../public/css/style.css">
  <title>Login Ajax</title>
</head>
<body>
<div class="main">
<nav class="navbar navbar-dark bg-info">
  <div class="container">
    <span class="navbar-brand">Login Ajax</span>
    <div class="">
      <div class="navbar-nav flex-row">
        <li class="nav-item">
          <a class="nav-link" href="index.php">Home</a>
        </li>
        <?php
            if (isset($_SESSION['user_id'])){
              echo '<li class="nav-item ml-3"><a class="nav-link" href="../public/profile.php">Profile</a></li>';
              echo '<li class="nav-item ml-3"><a class="nav-link" href="../public/logout.php">Logout</a></li>';
            } 
        ?>
    </div>
  </div>
</nav>