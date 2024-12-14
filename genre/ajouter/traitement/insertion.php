<?php

include("../../../acteur/ajouter/traitement/conection.php");
echo "<link rel='stylesheet' href='../../../css/style.css'>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier

    // Requête SQL corrigée
    $requete = "INSERT INTO genre (nom_genre, type_public) VALUES (:nom_genre, :type_public)";
    $preprequet = $connection->prepare($requete);

    try {
        $genres_inseres = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            // Génération dynamique des noms de champs
            $nom_genre = 'nom_genre' . $i;
            $type_public = 'type_public' . $i;

            // Vérifie si les données existent dans $_POST
            if (isset($_POST[$nom_genre]) && isset($_POST[$type_public])) {
                $nom = $_POST[$nom_genre];
                $type = $_POST[$type_public];

                // Lier les paramètres à la requête préparée
                $preprequet->bindParam(':nom_genre', $nom);
                $preprequet->bindParam(':type_public', $type);

                $preprequet->execute();
                $genres_inseres++;
            } else {
                echo "Données manquantes pour le genre $i.<br>";
            }
        }

        echo "<br>$genres_inseres genre(s) inséré(s) avec succès.";
    } catch (PDOException $e) {
        echo "Erreur lors de l'insertion : " . $e->getMessage();
    }
} else {
    echo "Erreur de récupération des données.";
}
?>
