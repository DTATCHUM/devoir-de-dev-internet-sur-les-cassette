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

    if (!isset($data['ids']) || empty($data['ids'])) {
        echo json_encode(['success' => false, 'message' => 'Aucun ID spécifié']);
        exit;
    }

    // Extraire les IDs
    $ids = $data['ids'];

    // Créer une liste de placeholders pour la requête SQL
    $placeholders = rtrim(str_repeat('?, ', count($ids)), ', ');

    // Suppression des rentes dont les IDs sont dans la liste
    $stmt = $pdo->prepare("DELETE FROM rendre WHERE id_rente IN ($placeholders)");
    $stmt->execute($ids);

    // Vérification du nombre de lignes supprimées
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Rentes supprimées avec succès']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucune rente trouvée à supprimer']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
