document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#filmTable tbody");
    const deleteSelectedButton = document.getElementById("deleteSelected");

    // Charger les données depuis le serveur
    function loadFilms() {
        fetch("../traitement/liste_film.php")
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
                data.forEach((film) => {
                    const row = document.createElement("tr");

                    // Colonne case à cocher
                    const checkboxCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.dataset.id = film.id_film; // Ajouter l'ID à la case à cocher
                    checkboxCell.appendChild(checkbox);

                    // Cellule pour l'ID film
                    const idCell = document.createElement("td");
                    idCell.textContent = film.id_film;

                    // Cellule pour le titre
                    const titreCell = document.createElement("td");
                    titreCell.textContent = film.titre;

                    // Cellule pour la durée
                    const durreCell = document.createElement("td");
                    durreCell.textContent = film.durre;

                    // Cellule pour l'ID acteur
                    const acteurCell = document.createElement("td");
                    acteurCell.textContent = film.id_acteur;

                    // Cellule pour le nom du genre
                    const genreCell = document.createElement("td");
                    genreCell.textContent = film.nom_genre;

                    row.appendChild(checkboxCell);
                    row.appendChild(idCell);
                    row.appendChild(titreCell);
                    row.appendChild(durreCell);
                    row.appendChild(acteurCell);
                    row.appendChild(genreCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les films. Consultez la console pour plus d'informations.");
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

    // Charger les films au démarrage
    loadFilms();
});
