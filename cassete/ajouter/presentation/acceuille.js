function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide de cassettes");
        return;
    }

    // Récupère la liste des magasins, films et clients via fetch
    Promise.all([
        fetch("../traitement/liste_magasin.php").then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des magasins.");
            }
            return response.json();
        }),
        fetch("../traitement/liste_film.php").then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des films.");
            }
            return response.json();
        }),
        fetch("../traitement/liste_client.php").then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des clients.");
            }
            return response.json();
        })
    ])
    .then(([magasins, films, clients]) => {
        if (magasins.length === 0) {
            alert("Aucun magasin disponible. Veuillez ajouter des magasins avant de continuer.");
            return;
        }
        if (films.length === 0) {
            alert("Aucun film disponible. Veuillez ajouter des films avant de continuer.");
            return;
        }
        if (clients.length === 0) {
            alert("Aucun client disponible. Veuillez ajouter des clients avant de continuer.");
            return;
        }

        // Création du formulaire
        let formulaireHtml = '';
        for (let i = 1; i <= nombre; i++) {
            formulaireHtml += `
                <h5>Cassette ${i}</h5>
                <label for="id_cassete${i}">Numéro cassette ${i}:</label>
                <input type="text" name="n_cassete${i}" id="id_cassete${i}" placeholder="Entrer le numéro de cassette ${i}" required><br>
                
                <label for="nom_cassete${i}">Nombre de locations cassette ${i}:</label>
                <input type="number" name="loca${i}" id="nom_cassete${i}" placeholder="Entrer le nombre de locations du cassette ${i}" required><br>
                
                <label for="id_magasin${i}">ID Magasin ${i}:</label>
                <select name="id_magasin${i}" id="id_magasin${i}" required>
                    <option value="" disabled selected>-- Sélectionner un magasin --</option>`;

            magasins.forEach(magasin => {
                formulaireHtml += `<option value="${magasin.id_magasin}">${magasin.id_magasin}</option>`;
            });

            formulaireHtml += `</select><br>`;

            // Sélectionner le film
            formulaireHtml += `
                <label for="id_film${i}">ID Film ${i}:</label>
                <select name="id_film${i}" id="id_film${i}" required>
                    <option value="" disabled selected>-- Sélectionner un film --</option>`;

            films.forEach(film => {
                formulaireHtml += `<option value="${film.id_film}">${film.id_film}</option>`;
            });

            formulaireHtml += `</select><br>`;

            // Sélectionner le client
            formulaireHtml += `
                <label for="id_client${i}">ID Client ${i}:</label>
                <select name="id_client${i}" id="id_client${i}" required>
                    <option value="" disabled selected>-- Sélectionner un client --</option>`;

            clients.forEach(client => {
                formulaireHtml += `<option value="${client.id_client}">${client.id_client}</option>`;
            });

            formulaireHtml += `</select><br><hr>`;
        }

        formulaireHtml += `<button type="submit">Valider</button>`;

        // Ajoute le formulaire au conteneur
        document.getElementById("formulaire-container").innerHTML = formulaireHtml;

        // Cache le bouton initialement
        document.getElementById("myButton").style.display = "none";
    })
    .catch(error => {
        alert(error.message || "Erreur inattendue.");
    });
}
