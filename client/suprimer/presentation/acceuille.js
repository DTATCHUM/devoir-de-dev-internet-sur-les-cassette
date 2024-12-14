document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#clientTable tbody");
    const deleteSelectedButton = document.getElementById("deleteSelected");

    // Charger les données depuis le serveur
    function loadClients() {
        fetch("../traitement/liste_client.php")
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
                data.forEach((client) => {
                    const row = document.createElement("tr");

                    // Colonne case à cocher
                    const checkboxCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.dataset.id = client.id_client; // Ajouter l'ID à la case à cocher
                    checkboxCell.appendChild(checkbox);

                    // Cellule pour l'ID client
                    const idCell = document.createElement("td");
                    idCell.textContent = client.id_client;

                    // Cellule pour le nom
                    const nomCell = document.createElement("td");
                    nomCell.textContent = client.nom;

                    // Cellule pour l'adresse
                    const adresseCell = document.createElement("td");
                    adresseCell.textContent = client.adresse;

                    // Cellule pour l'ID magasin
                    const magasinCell = document.createElement("td");
                    magasinCell.textContent = client.id_magasin;

                    row.appendChild(checkboxCell);
                    row.appendChild(idCell);
                    row.appendChild(nomCell);
                    row.appendChild(adresseCell);
                    row.appendChild(magasinCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les clients. Consultez la console pour plus d'informations.");
            });
    }

    // Gérer la sélection/désélection des lignes
    tableBody.addEventListener("change", function (event) {
        if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
            const row = event.target.closest("tr");
            if (event.target.checked) {
                row.classList.add("selected");
            } else {
                row.classList.remove("selected");
            }
        }
    });

    // Supprimer les lignes sélectionnées
    deleteSelectedButton.addEventListener("click", function () {
        const selectedCheckboxes = tableBody.querySelectorAll("input[type='checkbox']:checked");
        const selectedIds = [];

        selectedCheckboxes.forEach((checkbox) => {
            selectedIds.push(checkbox.dataset.id);
        });

        if (selectedIds.length > 0) {
            fetch("../traitement/suppression.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ids: selectedIds
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur du serveur lors de la suppression : " + response.status);
                    }
                    return response.json();
                })
                .then((result) => {
                    if (result.success) {
                        // Supprimer les lignes du tableau
                        selectedCheckboxes.forEach((checkbox) => {
                            const row = checkbox.closest("tr");
                            row.remove();
                        });
                        alert("Lignes supprimées avec succès !");
                    } else {
                        alert("Erreur : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression :", error);
                    alert("Impossible de supprimer les lignes. Consultez la console.");
                });
        } else {
            alert("Aucune ligne sélectionnée pour suppression.");
        }
    });

    // Charger les clients au démarrage
    loadClients();
});
