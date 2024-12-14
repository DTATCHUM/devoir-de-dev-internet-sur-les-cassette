document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#empruntTable tbody");
    const deleteSelectedButton = document.getElementById("deleteSelected");

    // Charger les données depuis le serveur
    function loadEmprunts() {
        fetch("../traitement/liste_emprunt.php")
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
                data.forEach((emprunt) => {
                    const row = document.createElement("tr");

                    // Colonne case à cocher
                    const checkboxCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.dataset.idEmprunt = emprunt.id_emprunt; // Ajouter l'ID de l'emprunt à la case à cocher
                    checkboxCell.appendChild(checkbox);

                    // Cellule pour l'ID de l'emprunt
                    const idEmpruntCell = document.createElement("td");
                    idEmpruntCell.textContent = emprunt.id_emprunt;

                    // Cellule pour la date d'emprunt
                    const dateEmpruntCell = document.createElement("td");
                    dateEmpruntCell.textContent = emprunt.date_emprunt;

                    // Cellule pour la date de retour
                    const dateRetourCell = document.createElement("td");
                    dateRetourCell.textContent = emprunt.date_retour;

                    // Cellule pour l'ID du magasin
                    const idMagasinCell = document.createElement("td");
                    idMagasinCell.textContent = emprunt.id_magasin;

                    // Cellule pour l'ID du client
                    const idClientCell = document.createElement("td");
                    idClientCell.textContent = emprunt.id_client;

                    row.appendChild(checkboxCell);
                    row.appendChild(idEmpruntCell);
                    row.appendChild(dateEmpruntCell);
                    row.appendChild(dateRetourCell);
                    row.appendChild(idMagasinCell);
                    row.appendChild(idClientCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les emprunts. Consultez la console pour plus d'informations.");
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
        const selectedEmprunts = [];

        selectedCheckboxes.forEach((checkbox) => {
            selectedEmprunts.push(checkbox.dataset.idEmprunt);
        });

        if (selectedEmprunts.length > 0) {
            fetch("../traitement/supresion.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emprunts: selectedEmprunts
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
                        alert("Emprunts supprimés avec succès !");
                    } else {
                        alert("Erreur : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression :", error);
                    alert("Impossible de supprimer les emprunts. Consultez la console.");
                });
        } else {
            alert("Aucune ligne sélectionnée pour suppression.");
        }
    });

    // Charger les emprunts au démarrage
    loadEmprunts();
});
