<?php
// Activer le rapport des erreurs PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../../../acteur/ajouter/traitement/conection.php");
echo "<link rel='stylesheet' href='../../../css/style.css'>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifie que la variable 'nombre' existe et est un entier valide
    if (!isset($_POST['nombre']) || !is_numeric($_POST['nombre'])) {
        echo "Erreur : nombre de films non défini ou invalide.";
        exit;
    }

    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier

    // Requête SQL d'insertion
    $requete = "INSERT INTO film (id_film, titre, durre, id_acteur, nom_genre) VALUES (:id_film, :titre, :durre, :id_acteur, :nom_genre)";
    $preprequet = $connection->prepare($requete);

    try {
        $films_insérés = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            // Génération des clés pour récupérer les données dans $_POST
            $id_film_key = 'id_film' . $i;
            $titre_key = 'titre_film' . $i;
            $durre_key = 'durre' . $i;
            $id_acteur_key = 'id_acteur' . $i;
            $nom_genre_key = 'nom_genre' . $i;

            // Vérifiez si les données nécessaires existent dans $_POST
            if (
                isset($_POST[$id_film_key], $_POST[$titre_key], $_POST[$durre_key], $_POST[$id_acteur_key], $_POST[$nom_genre_key])
                && !empty($_POST[$id_film_key])
                && !empty($_POST[$titre_key])
                && !empty($_POST[$durre_key])
                && !empty($_POST[$id_acteur_key])
                && !empty($_POST[$nom_genre_key])
            ) {
                // Récupération des valeurs
                $id_film = $_POST[$id_film_key];
                $title = $_POST[$titre_key];
                $time = $_POST[$durre_key];
                $id_actor = $_POST[$id_acteur_key];
                $name_genre = $_POST[$nom_genre_key];

                // Lier les paramètres et exécuter la requête
                $preprequet->bindParam(':id_film', $id_film);
                $preprequet->bindParam(':titre', $title);
                $preprequet->bindParam(':durre', $time);
                $preprequet->bindParam(':id_acteur', $id_actor);
                $preprequet->bindParam(':nom_genre', $name_genre);

                try {
                    if ($preprequet->execute()) {
                        // echo "Film '$id_film' inséré avec succès.<br>";
                        $films_insérés++;
                    } else {
                        $errorInfo = $preprequet->errorInfo();
                        echo "Erreur SQL lors de l'insertion du film '$id_film' : " . $errorInfo[2] . "<br>";
                    }
                } catch (PDOException $e) {
                    if ($e->getCode() == 23000) {
                        // Gestion d'une clé primaire ou contrainte unique existante
                        echo "L'ID du film '$id_film' existe déjà. Veuillez le changer.<br>";
                    } else {
                        // Autres erreurs SQL
                        echo "Erreur lors de l'insertion du film '$id_film' : " . $e->getMessage() . "<br>";
                    }
                }
            } else {
                // Si les données sont manquantes pour un film donné
                echo "Données manquantes ou invalides pour le film $i.<br>";
            }
        }

        // Message de succès global
        echo "<br>$films_insérés film(s) inséré(s) avec succès.";
    } catch (PDOException $e2) {
        // Gestion des erreurs générales
        echo "Erreur générale : " . $e2->getMessage();
    }
} else {
    // Gestion des requêtes autres que POST
    echo "Erreur : méthode HTTP non autorisée.";
}
?>
