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

    // Récupération des genres
    $genres = $pdo->query("SELECT nom_genre, type_public FROM genre")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['genres' => $genres]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
