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

    // Récupérer les données de la table `cassette`
    $stmt = $pdo->prepare("SELECT n_cassete, nbre_location, id_magasin, id_film, id_client FROM cassette");
    $stmt->execute();

    // Récupérer toutes les cassettes
    $cassettes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($cassettes) {
        echo json_encode($cassettes);
    } else {
        echo json_encode(['error' => 'Aucune cassette trouvée']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
