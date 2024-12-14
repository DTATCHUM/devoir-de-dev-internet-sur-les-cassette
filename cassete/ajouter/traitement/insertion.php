<?php
include("../../../acteur/ajouter/traitement/conection.php");
echo "<link rel='stylesheet' href='../../../css/style.css'>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier pour éviter des erreurs

    // Requête SQL d'insertion
    $requete = "INSERT INTO cassette (n_cassete, nbre_location, id_magasin,id_film,id_client) VALUES (:n_cassete,:nbre_location,:id_magasin,:id_film,:id_client)";
    $preprequet = $connection->prepare($requete);

    try {
        $cassetes_insérés = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            // Génération des clés pour récupérer les données dans $_POST
            $id_cassete_key = 'n_cassete' . $i;
            $louer = 'loca' . $i;
            $id_magasin = 'id_magasin' . $i;
            $id_film = 'id_film' . $i;
            $id_client = 'id_client' . $i;

            // Vérifiez si les données nécessaires existent dans $_POST
            if (isset($_POST[$id_cassete_key], $_POST[$louer], $_POST[$id_film], $_POST[$id_magasin])) {
                $id_cassete = $_POST[$id_cassete_key];
                $location=  intval( $_POST[$louer]);
                $id_movie = $_POST[$id_film];
                $id_magasin = $_POST[$id_magasin];
                $id_costomer = $_POST[$id_client];

                // Lier les paramètres et exécuter la requête
                $preprequet->bindParam(':n_cassete', $id_cassete);
                $preprequet->bindParam(':nbre_location', $location);
                
                $preprequet->bindParam(':id_magasin', $id_magasin);
                $preprequet->bindParam(':id_film', $id_movie);
                $preprequet->bindParam(':id_client', $id_costomer);
                try {
                    $preprequet->execute();
                    $cassetes_insérés++;
                } catch (PDOException $e) {
                    if ($e->getCode() == 23000) {
                        // Gestion d'une clé primaire ou contrainte unique existante
                        echo "L'ID de la  cassete '$id_cassete' existe déjà. Veuillez le changer.<br>";
                        echo "<a href='../presentation/acceuille.html'>Cliquez ici pour modifier</a>";
                    } else {
                        // Autres erreurs SQL
                        echo "Erreur lors de l'insertion du cassete '$id_cassete' : " . $e->getMessage() . "<br>";
                    }
                }
            } else {
                // Si les données sont manquantes pour un cassete donné
                echo "Données manquantes pour le cassete $i.<br>";
            }
        }

        // Message de succès global
        echo "<br>$cassetes_insérés cassete(s) inséré(s) avec succès.";
    } catch (PDOException $e2) {
        // Gestion des erreurs générales
        echo "Erreur générale : " . $e2->getMessage();
    }
} else {
    // Gestion des requêtes autres que POST
    echo "Erreur de récupération des données.";
}
?>
