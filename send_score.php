<?php
include('connexion_bdd.php');
$username = htmlspecialchars($_POST['username']);
$score = intval(htmlspecialchars($_POST['score']));

$searchUser = $pdo->prepare("SELECT * FROM highscores WHERE username = :username");
$executeSearchUser = $searchUser->execute(["username" => $username]);
$user = $searchUser->fetch();
if($user){
  if($score > $user->score){
    $updateUser = $pdo->prepare("UPDATE highscores SET score = :score WHERE username = :username")->execute(['score' => $score, "username" => $username]);
    if($updateUser){
      echo "Mise a jour user ok";
    }
  }
}

/**
$insertScore = $pdo->prepare("INSERT INTO highscores (username, score) VALUES (:username,:score)")->execute([
    "username" => $username,
    "score" => $score
]);

if($insertScore){
  echo "Requete ok";
}
 * **/



?>
