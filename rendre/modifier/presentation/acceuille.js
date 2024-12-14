document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#actorTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");


    // Charger les données depuis le serveur
    function loadActors() {
        fetch("../traitement/liste_acteur.php")
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
                data.forEach((actor) => {
                    const row = document.createElement("tr");

                    // Cellule pour l'ID (éditable)
                    const idCell = document.createElement("td");
                    idCell.contentEditable = true;
                    idCell.textContent = actor.id_acteur;
                    idCell.dataset.oldId = actor.id_acteur; // Stocke l'ancien ID

                    // Cellule pour le nom (éditable)
                    const nameCell = document.createElement("td");
                    nameCell.contentEditable = true;
                    nameCell.textContent = actor.nom_acteur;

                    row.appendChild(idCell);
                    row.appendChild(nameCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les acteurs. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const oldId = row.cells[0].dataset.oldId;
            const newId = row.cells[0].textContent.trim();
            const newName = row.cells[1].textContent.trim();

            // Si l'ID ou le nom a changé
            if (oldId !== newId || newName !== row.cells[1].dataset.oldName) {
                // Envoyer les données modifiées au serveur
                fetch("../traitement/modifier.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        old_id: oldId,
                        new_id: newId,
                        nom_acteur: newName,
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
                            row.cells[0].dataset.oldId = newId; // Met à jour l'ancien ID
                            row.cells[1].dataset.oldName = newName; // Met à jour l'ancien nom
                            alert("Modifications enregistrées avec succès !");
                        } else {
                            console.error("Erreur : " + result.message);
                            // alert("Erreur lors de la modification : " + result.message);
                        }
                    })
                    .catch((error) => {
                        console.error("Erreur lors de l'envoi des données :", error);
                        alert("Impossible de sauvegarder les modifications. Consultez la console.");
                    });
            }
        });
    });

    // Charger les acteurs au démarrage
    loadActors();
});
