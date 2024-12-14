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

    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['nom_genre'], $data['type_public'])) {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        exit;
    }

    $stmt = $pdo->prepare("
        UPDATE genre 
        SET type_public = :typePublic 
        WHERE nom_genre = :nomGenre
    ");
    $stmt->execute([
        ':typePublic' => $data['type_public'],
        ':nomGenre' => $data['nom_genre'],
    ]);

    echo json_encode(['success' => $stmt->rowCount() > 0]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
