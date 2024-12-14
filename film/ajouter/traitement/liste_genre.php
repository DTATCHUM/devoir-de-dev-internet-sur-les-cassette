<?php
// Inclure le fichier de connexion à la base de données
include("../../../acteur/ajouter/traitement/conection.php");

try {
    // Requête pour récupérer tous les genres
    $requete = "SELECT*FROM genre";
    $statement = $connection->prepare($requete);
    $statement->execute();

    // Récupérer les résultats sous forme de tableau associatif
    $genres = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Vérifier s'il y a des résultats
    if (count($genres) === 0) {
        // Aucun genre trouvé
        echo json_encode([]);
        exit;
    }

    // Envoyer les résultats au format JSON
    echo json_encode($genres);

} catch (PDOException $e) {
    // En cas d'erreur, envoyer un message d'erreur JSON
    http_response_code(500); // Code HTTP 500 : erreur serveur
    echo json_encode(["error" => "Erreur lors de la récupération des genres: " . $e->getMessage()]);
}
?>
