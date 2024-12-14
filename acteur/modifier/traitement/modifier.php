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

    // Récupération des données JSON envoyées par le client
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['old_id'], $data['new_id'], $data['nom_acteur'])) {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        exit;
    }

    // Extraction des données
    $oldId = trim($data['old_id']);
    $newId = trim($data['new_id']);
    $newName = trim($data['nom_acteur']);

    // Validation des champs
    if (empty($oldId) || empty($newId) || empty($newName)) {
        echo json_encode(['success' => false, 'message' => 'Les champs ne doivent pas être vides']);
        exit;
    }

    // Vérification si l'ID existe déjà (uniquement si l'ID change)
    if ($oldId !== $newId) {
        $stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM acteur WHERE id_acteur = :newId");
        $stmtCheck->execute([':newId' => $newId]);
        if ($stmtCheck->fetchColumn() > 0) {
            echo json_encode(['success' => false, 'message' => "L'ID '$newId' est déjà utilisé."]);
            exit;
        }
    }

    // Mise à jour dans la base de données
    $stmt = $pdo->prepare("
        UPDATE acteur 
        SET id_acteur = :newId, nom_acteur = :newName 
        WHERE id_acteur = :oldId
    ");
    $stmt->execute([
        ':newId' => $newId,
        ':newName' => $newName,
        ':oldId' => $oldId,
    ]);

    // Vérification si une ligne a été affectée
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Modification réussie']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucune modification effectuée. Vérifiez les données.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur du serveur : ' . $e->getMessage()]);
}
