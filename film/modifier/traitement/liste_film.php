<?php
header('Content-Type: application/json');

// Configuration de la base de données
$host = 'localhost';
$db = 'film';
$user = 'root';
$password = 'Dtae12&&';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des films
    $films = $pdo->query("SELECT id_film, titre, durre, id_acteur, nom_genre FROM film")->fetchAll(PDO::FETCH_ASSOC);
    $acteurs = $pdo->query("SELECT id_acteur FROM acteur")->fetchAll(PDO::FETCH_ASSOC);
    $genres = $pdo->query("SELECT nom_genre FROM genre")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['films' => $films, 'acteurs' => $acteurs, 'genres' => $genres]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
