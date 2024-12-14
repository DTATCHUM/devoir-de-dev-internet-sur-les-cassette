document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#genreTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");

    // Charger les données des genres
    function loadGenres() {
        fetch("../traitement/liste_genre.php")
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
                data.genres.forEach((genre) => {
                    const row = document.createElement("tr");

                    // Nom du Genre
                    const nomGenreCell = document.createElement("td");
                    nomGenreCell.textContent = genre.nom_genre;
                    nomGenreCell.contentEditable = true; // Modifiable
                    row.appendChild(nomGenreCell);

                    // Type de Public
                    const typePublicCell = document.createElement("td");
                    typePublicCell.textContent = genre.type_public;
                    typePublicCell.contentEditable = true; // Modifiable
                    row.appendChild(typePublicCell);

                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les genres. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const nomGenre = row.cells[0].textContent.trim();
            const typePublic = row.cells[1].textContent.trim();

            // Envoi des données modifiées au serveur
            fetch("../traitement/modifier.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom_genre: nomGenre,
                    type_public: typePublic,
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

    // Charger les genres au démarrage
    loadGenres();
});
