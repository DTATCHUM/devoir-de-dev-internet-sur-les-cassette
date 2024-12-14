<?php
header('Content-Type: application/json');

// Configuration de la base de données
$host = 'localhost';
$db = 'film';
$user = 'root';
$password = 'Dtae12&&';

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les données de la table `magasin`
    $stmt = $pdo->prepare("SELECT id_magasin, nom, localisation, heure_enregistrement FROM magasin");
    $stmt->execute();

    // Récupérer toutes les données
    $magasins = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($magasins) {
        echo json_encode($magasins);
    } else {
        echo json_encode(['error' => 'Aucun magasin trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
