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

    // Récupération des cassettes avec les informations associées
    $stmt = $pdo->query("SELECT c.n_cassete, c.nbre_location, c.id_magasin, c.id_film, c.id_client
                         FROM cassette c
                         LEFT JOIN magasin m ON c.id_magasin = m.id_magasin
                         LEFT JOIN film f ON c.id_film = f.id_film
                         LEFT JOIN client cl ON c.id_client = cl.id_client");

    $cassettes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Charger les magasins, films et clients pour les sélecteurs
    $magasins = $pdo->query("SELECT id_magasin FROM magasin")->fetchAll(PDO::FETCH_ASSOC);
    $films = $pdo->query("SELECT id_film FROM film")->fetchAll(PDO::FETCH_ASSOC);
    $clients = $pdo->query("SELECT id_client FROM client")->fetchAll(PDO::FETCH_ASSOC);

    // Vérification si des cassettes ont été trouvées
    if (empty($cassettes)) {
        echo json_encode(['error' => 'Aucune cassette trouvée.']);
    } else {
        echo json_encode([
            'cassettes' => $cassettes,
            'magasin' => $magasins,
            'film' => $films,
            'client' => $clients
        ]);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur de serveur : ' . $e->getMessage()]);
}
?>
