document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#magasinTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");

    // Charger les magasins
    function loadMagasins() {
        fetch("../traitement/liste_magasin.php")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des magasins : " + response.status);
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
                data.magasins.forEach((magasin) => {
                    const row = document.createElement("tr");

                    // ID Magasin
                    const idMagasinCell = document.createElement("td");
                    idMagasinCell.textContent = magasin.id_magasin;
                    idMagasinCell.contentEditable = false; // Non modifiable
                    row.appendChild(idMagasinCell);

                    // Nom du Magasin
                    const nomCell = document.createElement("td");
                    nomCell.textContent = magasin.nom;
                    nomCell.contentEditable = true; // Modifiable
                    row.appendChild(nomCell);

                    // Localisation
                    const localisationCell = document.createElement("td");
                    localisationCell.textContent = magasin.localisation;
                    localisationCell.contentEditable = true; // Modifiable
                    row.appendChild(localisationCell);

                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des magasins :", error);
                alert("Impossible de charger les magasins. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const idMagasin = row.cells[0].textContent.trim();
            const nom = row.cells[1].textContent.trim();
            const localisation = row.cells[2].textContent.trim();

            // Envoi des données modifiées au serveur
            fetch("../traitement/modiffier.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_magasin: idMagasin,
                    nom: nom,
                    localisation: localisation,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        alert("Modifications enregistrées avec succès !");
                    } else {
                        // alert("Erreur lors de la modification : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'envoi des données :", error);
                    alert("Impossible de sauvegarder les modifications. Consultez la console.");
                });
        });
    });

    // Charger les magasins au démarrage
    loadMagasins();
});
