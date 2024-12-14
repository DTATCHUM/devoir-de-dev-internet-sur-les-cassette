document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#jouerTable tbody");
    const deleteSelectedButton = document.getElementById("deleteSelected");

    // Charger les données depuis le serveur
    function loadRoles() {
        fetch("../traitement/liste_jouer.php")
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
                data.forEach((role) => {
                    const row = document.createElement("tr");

                    // Colonne case à cocher
                    const checkboxCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.dataset.role = role.role; // Ajouter l'ID du rôle à la case à cocher
                    checkboxCell.appendChild(checkbox);

                    // Cellule pour le rôle
                    const roleCell = document.createElement("td");
                    roleCell.textContent = role.role;

                    // Cellule pour l'ID de l'acteur
                    const idActeurCell = document.createElement("td");
                    idActeurCell.textContent = role.id_acteur;

                    // Cellule pour l'ID du film
                    const idFilmCell = document.createElement("td");
                    idFilmCell.textContent = role.id_film;

                    row.appendChild(checkboxCell);
                    row.appendChild(roleCell);
                    row.appendChild(idActeurCell);
                    row.appendChild(idFilmCell);
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les rôles. Consultez la console pour plus d'informations.");
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
        const selectedRoles = [];

        selectedCheckboxes.forEach((checkbox) => {
            selectedRoles.push(checkbox.dataset.role);
        });

        if (selectedRoles.length > 0) {
            fetch("../traitement/supreimer.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roles: selectedRoles
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
                        alert("Rôles supprimés avec succès !");
                    } else {
                        alert("Erreur : " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression :", error);
                    alert("Impossible de supprimer les rôles. Consultez la console.");
                });
        } else {
            alert("Aucune ligne sélectionnée pour suppression.");
        }
    });

    // Charger les rôles au démarrage
    loadRoles();
});
