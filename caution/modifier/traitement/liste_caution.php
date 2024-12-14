<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Inclure le fichier de connexion à la base de données
include("../../../acteur/ajouter/traitement/conection.php");

try {
    // Requête pour récupérer toutes les cautions
    $requete = "SELECT id_caution, montant, durre FROM caution";
    $statement = $connection->prepare($requete);
    $statement->execute();

    // Récupérer les résultats sous forme de tableau associatif
    $cautions = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Vérifier s'il y a des résultats
    if ($cautions) {
        echo json_encode($cautions);
    } else {
        echo json_encode([]);
    }

} catch (PDOException $e) {
    // En cas d'erreur, envoyer un message d'erreur JSON
    http_response_code(500); // Code HTTP 500 : erreur serveur
    echo json_encode(["error" => "Erreur lors de la récupération des cautions: " . $e->getMessage()]);
}
?>
