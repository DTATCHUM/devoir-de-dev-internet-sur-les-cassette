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

    // Récupération des données envoyées par le client
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['n_cassete'], $data['nbre_location'], $data['id_magasin'], $data['id_film'], $data['id_client'])) {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        exit;
    }

    // Extraction des données
    $nCassette = trim($data['n_cassete']);
    $nbreLocation = trim($data['nbre_location']);
    $idMagasin = trim($data['id_magasin']);
    $idFilm = trim($data['id_film']);
    $idClient = trim($data['id_client']);

    // Validation des champs
    if (empty($nCassette) || empty($nbreLocation) || empty($idMagasin) || empty($idFilm) || empty($idClient)) {
        echo json_encode(['success' => false, 'message' => 'Les champs ne doivent pas être vides']);
        exit;
    }

    // Mise à jour dans la base de données
    $stmt = $pdo->prepare("
        UPDATE cassette 
        SET nbre_location = :nbreLocation, id_magasin = :idMagasin, id_film = :idFilm, id_client = :idClient 
        WHERE n_cassete = :nCassette
    ");
    $stmt->execute([
        ':nbreLocation' => $nbreLocation,
        ':idMagasin' => $idMagasin,
        ':idFilm' => $idFilm,
        ':idClient' => $idClient,
        ':nCassette' => $nCassette,
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
