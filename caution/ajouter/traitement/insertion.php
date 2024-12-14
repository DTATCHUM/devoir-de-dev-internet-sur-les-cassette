<?php

include("../../../acteur/ajouter/traitement/conection.php");
echo"<link rel='stylesheet' href='../../../css/style.css'>";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = intval($_POST['nombre']); // Convertit $nombre en entier pour éviter des erreurs
    $requete = "INSERT INTO caution (id_caution,montant,durre) VALUES (:id_caution, :montant,:durre)";
    $preprequet = $connection->prepare($requete);

    try {
        $cautions_insérés = 0;

        for ($i = 1; $i <= $nombre; $i++) {
            $id_caution = 'id_caution' . $i;
            $montant = 'montant' . $i;
            $durre='durre' .$i;
            // Vérifiez si les clés existent dans $_POST
            if (isset($_POST[$id_caution]) && isset($_POST[$montant])) {
                $id = $_POST[$id_caution];
                $nom = floatval($_POST[$montant]);  // Conversion en nombre
                $time = $_POST[$durre];
            
                // Vérification si le montant est un nombre valide
                if (is_numeric($nom)) {
                    // Prépare et exécute la requête
                    $preprequet->bindParam(':id_caution', $id);
                    $preprequet->bindParam(':montant', $nom);
                    $preprequet->bindParam(':durre', $time);
            
                    try {
                        $preprequet->execute();
                        $cautions_insérés++;
                    } catch (PDOException $e) {
                        if ($e->getCode() == 23000) {
                            echo "L'ID de l'caution '$id' existe déjà, veuillez le changer.<br>";
                            echo "<a href='../presentation/acceuille.html'>Cliquez ici pour changer</a>";
                        } else {
                            echo "Erreur lors de l'insertion de l'caution '$id' : " . $e->getMessage() . "<br>";
                        }
                    }
                } else {
                    echo "Le montant '$nom' n'est pas valide. Veuillez entrer un nombre valide.<br>";
                }
            } else {
                echo "Données manquantes pour l'caution $i.<br>";
            }
            
        }

        echo "$cautions_insérés caution(s) inséré(s) avec succès.";
    } catch (PDOException $e2) {
        echo "Erreur générale : " . $e2->getMessage();
    }
} else {
    echo "Erreur de récupération des données.";
}
?>
