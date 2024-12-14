<?php

include("../../../acteur/ajouter/traitement/conection.php");
echo"<link rel='stylesheet' href='../../../css/style.css'>";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier pour éviter des erreurs
    $requete = "INSERT INTO magasin (id_magasin, nom,localisation) VALUES (:id_magasin, :nom,:localisation)";
    $preprequet = $connection->prepare($requete);

    try {
        $magasins_insérés = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            $id_magasin = 'id_magasin' . $i;
            $nom_magasin = 'nom_magasin' . $i;
               $local='localisation'.$i;
            // Vérifiez si les clés existent dans $_POST
            if (isset($_POST[$id_magasin]) && isset($_POST[$nom_magasin])&& isset($_POST[$local])) {
                $id = $_POST[$id_magasin];
                $nom = $_POST[$nom_magasin];
                $localisation=$_POST[$local];
                // Prépare et exécute la requête
                $preprequet->bindParam(':id_magasin', $id);
                $preprequet->bindParam(':nom', $nom);
                $preprequet->bindParam(':localisation', $localisation);

                try {
                    $preprequet->execute();
                    $magasins_insérés++;
                } catch (PDOException $e) {
                    if ($e->getCode() == 23000) {
                        echo "L'ID du magasin '$id' existe déjà, veuillez le changer.<br>";
                        echo"<a href='../presentation/acceuille.html'>cliquez ici pour changer</a>";
                    } else {
                        echo "Erreur lors de l'insertion de l'magasin '$id' : " . $e->getMessage() . "<br>";
                    }
                }
            } else {
                echo "Données manquantes pour l'magasin $i.<br>";
            }
        }

        echo "<br>$magasins_insérés magasin(s) inséré(s) avec succès.";
    } catch (PDOException $e2) {
        echo "Erreur générale : " . $e2->getMessage();
    }
} else {
    echo "Erreur de récupération des données.";
}
?>
