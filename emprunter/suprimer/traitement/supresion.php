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

    // Récupérer les données JSON envoyées par le client
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['emprunts']) || empty($data['emprunts'])) {
        echo json_encode(['success' => false, 'message' => 'Aucun emprunt spécifié']);
        exit;
    }

    // Extraire les emprunts
    $emprunts = $data['emprunts'];

    // Créer une liste de placeholders pour la requête SQL
    $placeholders = rtrim(str_repeat('?, ', count($emprunts)), ', ');

    // Suppression des emprunts dont les IDs sont dans la liste
    $stmt = $pdo->prepare("DELETE FROM emprunt WHERE id_emprunt IN ($placeholders)");
    $stmt->execute($emprunts);

    // Vérification du nombre de lignes supprimées
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Emprunts supprimés avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucun emprunt trouvé à supprimer']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
