<?php
include("../../../acteur/ajouter/traitement/conection.php");

header('Content-Type: application/json');

// Exemple de requête pour récupérer les clients
$query = "SELECT id_client FROM client"; // Assurez-vous que la table clients existe
$stmt = $connection->prepare($query);
$stmt->execute();
$clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($clients);
?>
