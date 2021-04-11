<?php
session_start();
ob_start();
$db = new PDO("mysql:host=localhost;dbname=reglog", 'root', '');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);