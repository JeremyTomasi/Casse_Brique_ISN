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

$username = htmlspecialchars($_POST['username']);
$score = intval(htmlspecialchars($_POST['score']));

// Enregistre ou met à jour le joueur dans la BDD
$requete_highscores = $pdo->prepare("SELECT * FROM highscores WHERE username = ?");
$etatRequete = $requete_highscores->execute([$username]);
if($etatRequete){
  $user = $requete_highscores->fetch();
  if($user){
    if($user->score < $score){
      $updateScore = $pdo->prepare("UPDATE highscores SET score = ? WHERE username = ?");
      $updateScore->execute([$score,$username]);
      if($updateScore){
        echo "Mise a jour ok";
      }
    }
  } else {
    $insertScore = $pdo->prepare("INSERT INTO highscores (username,score) VALUES (:username,:score)");
    $insertScore->execute([
        "username" => $username,
        "score" => $score
    ]);
    if($insertScore){
      echo "Requete ok";
    }
  }
}




?>
