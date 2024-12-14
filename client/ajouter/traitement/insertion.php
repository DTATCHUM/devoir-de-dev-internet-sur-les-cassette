<?php
include("../../../acteur/ajouter/traitement/conection.php");
echo "<link rel='stylesheet' href='../../../css/style.css'>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier pour éviter des erreurs

    // Requête SQL d'insertion
    $requete = "INSERT INTO client (id_client, nom, adresse, id_magasin) VALUES (:id_client, :nom, :adresse, :id_magasin)";
    $preprequet = $connection->prepare($requete);

    try {
        $clients_insérés = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            // Génération des clés pour récupérer les données dans $_POST
            $id_client_key = 'id_client' . $i;
            $nom_client_key = 'nom_client' . $i;
            $adresse_key = 'adresse' . $i;
            $id_magasin_key = 'id_magasin' . $i;

            // Vérifiez si les données nécessaires existent dans $_POST
            if (isset($_POST[$id_client_key], $_POST[$nom_client_key], $_POST[$adresse_key], $_POST[$id_magasin_key])) {
                $id_client = $_POST[$id_client_key];
                $nom_client = $_POST[$nom_client_key];
                $adresse = $_POST[$adresse_key];
                $id_magasin = $_POST[$id_magasin_key];

                // Lier les paramètres et exécuter la requête
                $preprequet->bindParam(':id_client', $id_client);
                $preprequet->bindParam(':nom', $nom_client);
                $preprequet->bindParam(':adresse', $adresse);
                $preprequet->bindParam(':id_magasin', $id_magasin);

                try {
                    $preprequet->execute();
                    $clients_insérés++;
                } catch (PDOException $e) {
                    if ($e->getCode() == 23000) {
                        // Gestion d'une clé primaire ou contrainte unique existante
                        echo "L'ID du client '$id_client' existe déjà. Veuillez le changer.<br>";
                        echo "<a href='../presentation/acceuille.html'>Cliquez ici pour modifier</a>";
                    } else {
                        // Autres erreurs SQL
                        echo "Erreur lors de l'insertion du client '$id_client' : " . $e->getMessage() . "<br>";
                    }
                }
            } else {
                // Si les données sont manquantes pour un client donné
                echo "Données manquantes pour le client $i.<br>";
            }
        }

        // Message de succès global
        echo "<br>$clients_insérés client(s) inséré(s) avec succès.";
    } catch (PDOException $e2) {
        // Gestion des erreurs générales
        echo "Erreur générale : " . $e2->getMessage();
    }
} else {
    // Gestion des requêtes autres que POST
    echo "Erreur de récupération des données.";
}
?>
