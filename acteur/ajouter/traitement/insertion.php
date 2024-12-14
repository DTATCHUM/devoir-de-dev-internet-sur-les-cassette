<?php

include("conection.php");
echo"<link rel='stylesheet' href='../../../css/style.css'>";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier pour éviter des erreurs
    $requete = "INSERT INTO acteur (id_acteur, nom_acteur) VALUES (:id_acteur, :nom_acteur)";
    $preprequet = $connection->prepare($requete);

    try {
        $acteurs_insérés = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            $id_acteur = 'id_acteur' . $i;
            $nom_acteur = 'nom_acteur' . $i;

            // Vérifiez si les clés existent dans $_POST
            if (isset($_POST[$id_acteur]) && isset($_POST[$nom_acteur])) {
                $id = $_POST[$id_acteur];
                $nom = $_POST[$nom_acteur];

                // Prépare et exécute la requête
                $preprequet->bindParam(':id_acteur', $id);
                $preprequet->bindParam(':nom_acteur', $nom);

                try {
                    $preprequet->execute();
                    $acteurs_insérés++;
                } catch (PDOException $e) {
                    if ($e->getCode() == 23000) {
                        echo "L'ID de l'acteur '$id' existe déjà, veuillez le changer.<br>";
                        echo"<a href='../presentation/acceuille.html'>cliquez ici pour changer</a>";
                    } else {
                        echo "Erreur lors de l'insertion de l'acteur '$id' : " . $e->getMessage() . "<br>";
                    }
                }
            } else {
                echo "Données manquantes pour l'acteur $i.<br>";
            }
        }

        echo "$acteurs_insérés acteur(s) inséré(s) avec succès.";
    } catch (PDOException $e2) {
        echo "Erreur générale : " . $e2->getMessage();
    }
} else {
    echo "Erreur de récupération des données.";
}
?>
