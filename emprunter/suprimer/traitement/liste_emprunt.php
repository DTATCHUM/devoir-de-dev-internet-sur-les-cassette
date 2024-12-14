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

    // Récupérer les données de la table `emprunt`
    $stmt = $pdo->prepare("SELECT id_emprunt, date_emprunt, date_retour, id_magasin, id_client FROM emprunt");
    $stmt->execute();

    // Récupérer toutes les données
    $emprunts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($emprunts) {
        echo json_encode($emprunts);
    } else {
        echo json_encode(['error' => 'Aucun emprunt trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
