<?php require('receive_score.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/app.css">
    <title>Casse-Brique</title>
    <script src="js/app.js" type="module" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  </head>

  <body>
    <header id="title">Jeu du Casse-Brique</header>
    <nav id="menu">
        <ul>
            <li id="play" class="liste">Jouer au jeu</li>
            <li id="highscores" class="liste">Scores</li>
        </ul>
    </nav>
    <section id="sectionJeu">
        <canvas id="playZone" width="600px" height="400px"></canvas>
        <div id="score"></div>
        <div id="nbreVies"></div>
        <div id="etatRequete"></div>
    </section>

  <section id="sectionHighscores">
    <table>
        <thead>
            <tr>
                <td>Position</td>
                <td>Username</td>
                <td>Score</td>
            </tr>
        </thead>
        <tbody>
            <?php
            $compteur = 1;
            foreach($listHighscores as $highscore): ?>
            <tr>
                <td>
                    <?= $compteur; ?>
                </td>
                <td><?= $highscore->username; ?></td>
                <td><?= $highscore->score; ?></td>
            </tr>
            <?php
            $compteur++;
            endforeach; ?>
        </tbody>
    </table>
  </section>

    <p id="copyright">&copy; Jérémy Tomasi , Edouard Fontaine & et Nicolas Leriche</p>

  </body>

</html>
