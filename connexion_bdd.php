<?php
$db_name = "casse_brique";
$db_host = "localhost";
$db_user = "projetisn";
$db_pass = "projetisn";

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name",$db_user,$db_pass,[
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
    ]);
} catch(PDOException $e){
    die($e->getMessage());
}
