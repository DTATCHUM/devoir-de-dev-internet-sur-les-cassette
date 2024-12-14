document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#cautionTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");

    // Charger les données depuis le serveur
    function loadCautions() {
        fetch("../traitement/liste_caution.php")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données : " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    alert("Erreur : " + data.error);
                    return;
                }

                tableBody.innerHTML = ""; // Vide le tableau

                // Ajouter les lignes au tableau
                data.forEach((caution) => {
                    const row = document.createElement("tr");

                    // Cellule pour l'ID (éditable)
                    const idCell = document.createElement("td");
                    idCell.contentEditable = true;
                    idCell.textContent = caution.id_caution;
                    idCell.dataset.oldId = caution.id_caution; // Stocke l'ancien ID

                    // Cellule pour le montant (éditable)
                    const montantCell = document.createElement("td");
                    montantCell.contentEditable = true;
                    montantCell.textContent = caution.montant;

                    // Cellule pour la durée (éditable)
                    const durreCell = document.createElement("td");
                    durreCell.contentEditable = true;
                    durreCell.textContent = caution.durre;

                    row.appendChild(idCell);
                    row.appendChild(montantCell);
                    row.appendChild(durreCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les cautions. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const oldId = row.cells[0].dataset.oldId;
            const newId = row.cells[0].textContent.trim();
            const newMontant = row.cells[1].textContent.trim(); 
            const newdurre = row.cells[2].textContent.trim();   

            // Afficher les données dans la console avant d'envoyer
            console.log({ oldId, newId, newMontant, newdurre });

            // Vérifier que les données sont complètes
            if (oldId && newId && newMontant && newdurre) {
                fetch("../traitement/modifier.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        old_id: oldId,
                        new_id: newId,
                        montant: newMontant,
                        durre: newdurre,
                    }),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur du serveur lors de la modification : " + response.status);
                    }
                    return response.json();
                })
                .then((result) => {
                    if (result.success) {
                        console.log("Modification réussie pour ID " + oldId);
                        row.cells[0].dataset.oldId = newId;
                        row.cells[1].dataset.oldMontant = newMontant;
                        row.cells[2].dataset.olddurre = newdurre;
                        alert("Modifications enregistrées avec succès !");
                    } else {
                        console.error("Erreur : " + result.message);
                        alert("Erreur lors de la modification : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'envoi des données :", error);
                    alert("Impossible de sauvegarder les modifications. Consultez la console.");
                });
            } else {
                console.error("Données manquantes : ", { oldId, newId, newMontant, newdurre });
                alert("Veuillez remplir toutes les informations.");
            }
        });
    });

    // Charger les cautions au démarrage
    loadCautions();
});
