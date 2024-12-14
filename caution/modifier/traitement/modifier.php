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

    if (!isset($data['old_id'], $data['new_id'], $data['montant'], $data['durre'])) {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        exit;
    }

    // Extraction des données
    $oldId = trim($data['old_id']);
    $newId = trim($data['new_id']);
    $newMontant = trim($data['montant']);
    $newdurre = trim($data['durre']);

    // Validation des champs
    if (empty($oldId) || empty($newId) || empty($newMontant) || empty($newdurre)) {
        echo json_encode(['success' => false, 'message' => 'Les champs ne doivent pas être vides']);
        exit;
    }

    // Vérification si l'ID existe déjà (uniquement si l'ID change)
    if ($oldId !== $newId) {
        $stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM caution WHERE id_caution = :newId");
        $stmtCheck->execute([':newId' => $newId]);
        if ($stmtCheck->fetchColumn() > 0) {
            echo json_encode(['success' => false, 'message' => "L'ID '$newId' est déjà utilisé."]);
            exit;
        }
    }

    // Mise à jour dans la base de données
    $stmt = $pdo->prepare("
        UPDATE caution 
        SET id_caution = :newId, montant = :newMontant, durre = :newdurre 
        WHERE id_caution = :oldId
    ");
    $stmt->execute([
        ':newId' => $newId,
        ':newMontant' => $newMontant,
        ':newdurre' => $newdurre,
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
?>
