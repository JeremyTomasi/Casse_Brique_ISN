<?php
require('connexion_bdd.php');

// Récupère la liste des scores depuis la base de données
$listHighscores = $pdo->query("SELECT * FROM highscores ORDER BY score DESC ")->fetchAll();