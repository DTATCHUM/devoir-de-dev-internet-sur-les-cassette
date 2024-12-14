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

    // Récupérer les données de la table `rendre`
    $stmt = $pdo->prepare("SELECT id_rente, date_rente, id_magasin, id_client FROM rendre");
    $stmt->execute();

    // Récupérer toutes les données
    $rentes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($rentes) {
        echo json_encode($rentes);
    } else {
        echo json_encode(['error' => 'Aucune rente trouvée']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
