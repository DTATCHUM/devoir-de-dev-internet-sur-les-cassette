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

    // Récupérer les données de la table `jouer`
    $stmt = $pdo->prepare("SELECT role, id_acteur, id_film FROM jouer");
    $stmt->execute();

    // Récupérer toutes les données
    $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($roles) {
        echo json_encode($roles);
    } else {
        echo json_encode(['error' => 'Aucun rôle trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
