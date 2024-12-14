document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#filmTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");

    // Charger les données des films
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
                data.films.forEach((film) => {
                    const row = document.createElement("tr");

                    // ID Film
                    const idFilmCell = document.createElement("td");
                    idFilmCell.contentEditable = true; // Modifiable
                    idFilmCell.textContent = film.id_film;
                    row.appendChild(idFilmCell);

                    // Titre
                    const titreCell = document.createElement("td");
                    titreCell.contentEditable = true; // Modifiable
                    titreCell.textContent = film.titre;
                    row.appendChild(titreCell);

                    // Durée
                    const dureeCell = document.createElement("td");
                    dureeCell.contentEditable = true; // Modifiable
                    dureeCell.textContent = film.durre;
                    row.appendChild(dureeCell);

                    // Acteur (sélecteur)
                    const acteurCell = document.createElement("td");
                    const acteurSelect = document.createElement("select");
                    data.acteurs.forEach((acteur) => {
                        const option = document.createElement("option");
                        option.value = acteur.id_acteur;
                        option.textContent = acteur.id_acteur;
                        if (acteur.id_acteur === film.id_acteur) {
                            option.selected = true;
                        }
                        acteurSelect.appendChild(option);
                    });
                    acteurCell.appendChild(acteurSelect);
                    row.appendChild(acteurCell);

                    // Genre (sélecteur)
                    const genreCell = document.createElement("td");
                    const genreSelect = document.createElement("select");
                    data.genres.forEach((genre) => {
                        const option = document.createElement("option");
                        option.value = genre.nom_genre;
                        option.textContent = genre.nom_genre;
                        if (genre.nom_genre === film.nom_genre) {
                            option.selected = true;
                        }
                        genreSelect.appendChild(option);
                    });
                    genreCell.appendChild(genreSelect);
                    row.appendChild(genreCell);

                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les films. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const idFilm = row.cells[0].textContent.trim();
            const titre = row.cells[1].textContent.trim();
            const duree = row.cells[2].textContent.trim();
            const idActeur = row.cells[3].querySelector("select").value;
            const genre = row.cells[4].querySelector("select").value;

            // Envoi des données modifiées au serveur
            fetch("../traitement/modifier.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_film: idFilm,
                    titre: titre,
                    durre: duree,
                    id_acteur: idActeur,
                    nom_genre: genre,
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
                    // alert("Impossible de sauvegarder les modifications. Consultez la console.");
                });
        });
    });

    // Charger les films au démarrage
    loadFilms();
});
