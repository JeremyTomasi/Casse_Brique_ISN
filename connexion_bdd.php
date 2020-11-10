<?php
require("vendor/autoload.php");

/*
Charge le fichier .env afin d'obtenir les variables d'environnement
*/
$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$db_host = $_ENV['DB_HOST'];
$db_name = $_ENV['DB_NAME'];
$db_user = $_ENV['DB_USER'];
$db_pass = $_ENV['DB_PASS'];

/*
Initialise la connexion à la base de données
*/
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name",$db_user,$db_pass,[
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
    ]);
} catch(PDOException $e){
    die($e->getMessage());
}