document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#cassetteTable tbody");
    const deleteSelectedButton = document.getElementById("deleteSelected");

    // Charger les données des cassettes depuis le serveur
    function loadCassettes() {
        fetch("../traitement/liste_cassette.php")
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
                data.forEach((cassette) => {
                    const row = document.createElement("tr");

                    // Colonne case à cocher
                    const checkboxCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.dataset.id = cassette.n_cassete; // Ajouter le numéro de cassette à la case à cocher
                    checkboxCell.appendChild(checkbox);

                    // Cellule pour le numéro de cassette
                    const idCell = document.createElement("td");
                    idCell.textContent = cassette.n_cassete;

                    // Cellules pour les autres informations
                    const locationCell = document.createElement("td");
                    locationCell.textContent = cassette.nbre_location;

                    const magasinCell = document.createElement("td");
                    magasinCell.textContent = cassette.id_magasin;

                    const filmCell = document.createElement("td");
                    filmCell.textContent = cassette.id_film;

                    const clientCell = document.createElement("td");
                    clientCell.textContent = cassette.id_client;

                    row.appendChild(checkboxCell);
                    row.appendChild(idCell);
                    row.appendChild(locationCell);
                    row.appendChild(magasinCell);
                    row.appendChild(filmCell);
                    row.appendChild(clientCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les cassettes. Consultez la console pour plus d'informations.");
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

    // Supprimer les cassettes sélectionnées
    deleteSelectedButton.addEventListener("click", function () {
        const selectedCheckboxes = tableBody.querySelectorAll("input[type='checkbox']:checked");
        const selectedIds = [];

        selectedCheckboxes.forEach((checkbox) => {
            selectedIds.push(checkbox.dataset.id);
        });

        if (selectedIds.length > 0) {
            fetch("../traitement/supression.php", {
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
                        alert("Cassettes supprimées avec succès !");
                    } else {
                        alert("Erreur : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression :", error);
                    alert("Impossible de supprimer les cassettes. Consultez la console.");
                });
        } else {
            alert("Aucune cassette sélectionnée pour suppression.");
        }
    });

    // Charger les cassettes au démarrage
    loadCassettes();
});
