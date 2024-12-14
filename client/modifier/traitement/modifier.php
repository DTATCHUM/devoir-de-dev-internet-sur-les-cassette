<?php
header('Content-Type: application/json');

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

    // Vérifier si les données nécessaires sont présentes
    if (!isset($data['id_client'], $data['nom'], $data['adresse'], $data['id_magasin'])) {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        exit;
    }

    $idClient = trim($data['id_client']);
    $nom = trim($data['nom']);
    $adresse = trim($data['adresse']);
    $idMagasin = trim($data['id_magasin']);

    // Vérifier que les champs ne sont pas vides
    if (empty($idClient) || empty($nom) || empty($adresse) || empty($idMagasin)) {
        echo json_encode(['success' => false, 'message' => 'Les champs ne doivent pas être vides']);
        exit;
    }

    // Vérification si l'ID client existe dans la base de données
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM client WHERE id_client = :id_client");
    $stmt->execute([':id_client' => $idClient]);
    $count = $stmt->fetchColumn();

    // Si l'ID client n'existe pas, renvoyer une erreur
    if ($count == 0) {
        echo json_encode(['success' => false, 'message' => 'ID client introuvable']);
        exit;
    }

    // Mise à jour des informations du client
    $stmt = $pdo->prepare("
        UPDATE client 
        SET  nom = :nom, adresse = :adresse, id_magasin = :idMagasin 
        WHERE id_client = :id_client
    ");
    $stmt->execute([
        
        ':nom' => $nom,
        ':adresse' => $adresse,
        ':idMagasin' => $idMagasin,
        ':id_client' => $idClient
    ]);

    // Vérifier si une ligne a été affectée par la mise à jour
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Modification réussie']);
    } else {
        // echo json_encode(['success' => false, 'message' => 'Aucune modification effectuée']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
