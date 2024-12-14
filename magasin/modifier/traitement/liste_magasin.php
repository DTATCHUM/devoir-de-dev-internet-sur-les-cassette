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

    // Récupération des magasins
    $magasins = $pdo->query("SELECT id_magasin, nom, localisation FROM magasin")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['magasins' => $magasins]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
