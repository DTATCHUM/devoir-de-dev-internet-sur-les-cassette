document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#clientTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");

    // Charger les données des clients
    function loadClients() {
        fetch("../traitement/liste_client.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert("Erreur : " + data.error);
                    return;
                }

                tableBody.innerHTML = ""; // Vide le tableau

                data.clients.forEach((client) => {
                    const row = document.createElement("tr");

                    // ID Client (cellule éditable)
                    const idClientCell = document.createElement("td");
                    idClientCell.contentEditable = true; // Rendre l'ID modifiable
                    idClientCell.textContent = client.id_client;
                    row.appendChild(idClientCell);

                    // Nom
                    const nomCell = document.createElement("td");
                    nomCell.contentEditable = true;
                    nomCell.textContent = client.nom;
                    row.appendChild(nomCell);

                    // Adresse
                    const adresseCell = document.createElement("td");
                    adresseCell.contentEditable = true;
                    adresseCell.textContent = client.adresse;
                    row.appendChild(adresseCell);

                    // Magasin (sélecteur)
                    const magasinCell = document.createElement("td");
                    const magasinSelect = document.createElement("select");
                    data.magasins.forEach((magasin) => {
                        const option = document.createElement("option");
                        option.value = magasin.id_magasin;
                        option.textContent = magasin.id_magasin;
                        if (magasin.id_magasin === client.id_magasin) {
                            option.selected = true;
                        }
                        magasinSelect.appendChild(option);
                    });
                    magasinCell.appendChild(magasinSelect);
                    row.appendChild(magasinCell);

                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les clients. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");
    
        rows.forEach((row) => {
            const idClient = row.cells[0].textContent.trim(); // Récupérer l'ID client comme texte
            const newNom = row.cells[1].textContent.trim();
            const newAdresse = row.cells[2].textContent.trim();
            const newMagasin = row.cells[3].querySelector("select").value;
    
            // Vérifier que les données sont présentes avant d'envoyer la requête
            if (!idClient || !newNom || !newAdresse || !newMagasin) {
                alert("Certaines données sont manquantes pour l'ID client " + idClient);
                return; // Ne pas envoyer la requête si des données sont manquantes
            }
    
            // Envoi des données modifiées au serveur
            fetch("../traitement/modifier.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_client: idClient,
                    nom: newNom,
                    adresse: newAdresse,
                    id_magasin: newMagasin
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        alert("Modifications enregistrées avec succès !");
                    } else {
                        alert("Erreur lors de la modification : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'envoi des données :", error);
                    // alert("Impossible de sauvegarder les modifications. Consultez la console.");
                });
        });
    });
        // Charger les clients au démarrage
    loadClients();
});
