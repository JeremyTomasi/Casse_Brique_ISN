<?php
include('connexion_bdd.php');

// Echappe les entrées utilisateurs afin d'eviter des attaques au niveau de la BDD
$username = htmlspecialchars($_POST['username']);
$score = intval(htmlspecialchars($_POST['score']));

// Recherche si l'utilisateur existe déja dans la BDD
$searchUser = $pdo->prepare("SELECT * FROM highscores WHERE username = :username");
$executeSearchUser = $searchUser->execute(["username" => $username]);
$user = $searchUser->fetch();

// Si l'utlisateur existe dans la BDD, on met à jour son meilleur score
if($user){
  if($score >= $user->score){
    $updateUser = $pdo->prepare("UPDATE highscores SET score = :score WHERE username = :username")->execute(['score' => $score, "username" => $username]);

    // Si la requête a bien été effectuée, on affiche un message lui disant que son score a bien été mis à jour !
    if($updateUser){
      echo "Votre score a été mis a jour !";
    }
  }
} else {
// Sinon on insère le nom de l'utlisateur et son score dans la base de données
  $insertScore = $pdo->prepare("INSERT INTO highscores (username, score) VALUES (:username,:score)")->execute([
      "username" => $username,
      "score" => $score
  ]);

// Si la requête a bien été effectuée, on affiche un message à l'utilisateur pour lui dire que son score a bien été enregistré !
  if($insertScore){
    echo "Votre score a été enregistré !";
  }
}


?>
