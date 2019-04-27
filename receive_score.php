<?php
require('connexion_bdd.php');

$listHighscores = $pdo->query("SELECT * FROM highscores")->fetchAll();