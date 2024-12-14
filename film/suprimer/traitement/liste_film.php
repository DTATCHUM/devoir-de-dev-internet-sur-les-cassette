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

    // Récupérer les données de la table `film`
    $stmt = $pdo->prepare("SELECT id_film, titre, durre, id_acteur, nom_genre FROM film");
    $stmt->execute();

    // Récupérer toutes les données
    $films = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($films) {
        echo json_encode($films);
    } else {
        echo json_encode(['error' => 'Aucun film trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur du serveur : ' . $e->getMessage()]);
}
?>
