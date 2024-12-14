document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#cautionTable tbody");
    const deleteSelectedButton = document.getElementById("deleteSelected");

    // Charger les données depuis le serveur
    function loadCautions() {
        fetch("../../modifier/traitement/liste_caution.php")
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

                    // Colonne case à cocher
                    const checkboxCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.dataset.id = caution.id_caution; // Ajouter l'ID à la case à cocher
                    checkboxCell.appendChild(checkbox);

                    // Cellule pour l'ID
                    const idCell = document.createElement("td");
                    idCell.textContent = caution.id_caution;

                    // Cellule pour le montant
                    const montantCell = document.createElement("td");
                    montantCell.textContent = caution.montant;

                    // Cellule pour la durée
                    const dureeCell = document.createElement("td");
                    dureeCell.textContent = caution.durre;

                    row.appendChild(checkboxCell);
                    row.appendChild(idCell);
                    row.appendChild(montantCell);
                    row.appendChild(dureeCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les cautions. Consultez la console pour plus d'informations.");
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

    // Charger les cautions au démarrage
    loadCautions();
});
