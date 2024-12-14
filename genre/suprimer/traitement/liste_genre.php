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

    // Récupérer les données de la table `genre`
    $stmt = $pdo->prepare("SELECT nom_genre, type_public FROM genre");
    $stmt->execute();

    // Récupérer toutes les données
    $genres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($genres) {
        echo json_encode($genres);
    } else {
        echo json_encode(['error' => 'Aucun genre trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
