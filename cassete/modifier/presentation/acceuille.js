document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#cassetteTable tbody");
    const saveChangesButton = document.getElementById("saveChanges");

    // Charger les données des cassettes et les informations liées
    function loadCassettes() {
        fetch("../traitement/liste_cassete.php")
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
                data.cassettes.forEach((cassette) => {
                    const row = document.createElement("tr");

                    // Numéro de la cassette
                    const cassetteCell = document.createElement("td");
                    cassetteCell.textContent = cassette.n_cassete;
                    row.appendChild(cassetteCell);

                    // Nombre de locations
                    const locationCell = document.createElement("td");
                    locationCell.contentEditable = true;
                    locationCell.textContent = cassette.nbre_location;
                    row.appendChild(locationCell);

                    // Magasin (sélecteur)
                    const magasinCell = document.createElement("td");
                    const magasinSelect = document.createElement("select");
                    // Ajouter les options de magasin
                    data.magasin.forEach((magasin) => {
                        const option = document.createElement("option");
                        option.value = magasin.id_magasin;
                        option.textContent = magasin.id_magasin;
                        if (magasin.id_magasin === cassette.id_magasin) {
                            option.selected = true;
                        }
                        magasinSelect.appendChild(option);
                    });
                    magasinCell.appendChild(magasinSelect);
                    row.appendChild(magasinCell);

                    // Film (sélecteur)
                    const filmCell = document.createElement("td");
                    const filmSelect = document.createElement("select");
                    // Ajouter les options de film
                    data.film.forEach((film) => {
                        const option = document.createElement("option");
                        option.value = film.id_film;
                        option.textContent = film.id_film;
                        if (film.id_film === cassette.id_film) {
                            option.selected = true;
                        }
                        filmSelect.appendChild(option);
                    });
                    filmCell.appendChild(filmSelect);
                    row.appendChild(filmCell);

                    // Client (sélecteur)
                    const clientCell = document.createElement("td");
                    const clientSelect = document.createElement("select");
                    // Ajouter les options de client
                    data.client.forEach((client) => {
                        const option = document.createElement("option");
                        option.value = client.id_client;
                        option.textContent = client.id_client;
                        if (client.id_client === cassette.id_client) {
                            option.selected = true;
                        }
                        clientSelect.appendChild(option);
                    });
                    clientCell.appendChild(clientSelect);
                    row.appendChild(clientCell);

                    tableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                alert("Impossible de charger les cassettes. Consultez la console pour plus d'informations.");
            });
    }

    // Sauvegarder les modifications
    saveChangesButton.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const nCassette = row.cells[0].textContent.trim();
            const newNbreLocation = row.cells[1].textContent.trim();
            const newMagasin = row.cells[2].querySelector("select").value;
            const newFilm = row.cells[3].querySelector("select").value;
            const newClient = row.cells[4].querySelector("select").value;

            // Envoi des données modifiées au serveur
            fetch("../traitement/modifier.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    n_cassete: nCassette,
                    nbre_location: newNbreLocation,
                    id_magasin: newMagasin,
                    id_film: newFilm,
                    id_client: newClient
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
                    alert("Impossible de sauvegarder les modifications. Consultez la console.");
                });
        });
    });

    // Charger les cassettes et les données liées au démarrage
    loadCassettes();
});
