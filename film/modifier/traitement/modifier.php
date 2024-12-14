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

    if (!isset($data['id_film'], $data['titre'], $data['durre'], $data['id_acteur'], $data['nom_genre'])) {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        exit;
    }

    $stmt = $pdo->prepare("
        UPDATE film 
        SET titre = :titre, durre = :durre, id_acteur = :idActeur, nom_genre = :nomGenre 
        WHERE id_film = :idFilm
    ");
    $stmt->execute([
        ':titre' => $data['titre'],
        ':durre' => $data['durre'],
        ':idActeur' => $data['id_acteur'],
        ':nomGenre' => $data['nom_genre'],
        ':idFilm' => $data['id_film'],
    ]);

    echo json_encode(['success' => $stmt->rowCount() > 0]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
