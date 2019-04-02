<?php
require('connexion_bdd.php');

$listHighscores = $pdo->query("SELECT * FROM highscores ORDER BY score DESC LIMIT 8")->fetchAll();
