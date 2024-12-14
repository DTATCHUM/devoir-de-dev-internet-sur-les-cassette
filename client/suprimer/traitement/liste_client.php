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

    // Récupérer les données de la table `client`
    $stmt = $pdo->prepare("SELECT id_client, nom, adresse, id_magasin FROM client");
    $stmt->execute();

    // Récupérer toutes les données
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($clients) {
        echo json_encode($clients);
    } else {
        echo json_encode(['error' => 'Aucun client trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
