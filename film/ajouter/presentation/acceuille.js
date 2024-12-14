function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide de films");
        return;
    }

    // Récupère les acteur et les genres via fetch
    Promise.all([
        fetch("../traitement/liste_acteur.php").then(response => {
            if (!response.ok) throw new Error("Erreur lors de la récupération des acteurs.");
            return response.json();
        }),
        fetch("../traitement/liste_genre.php").then(response => {
            if (!response.ok) throw new Error("Erreur lors de la récupération des genres.");
            return response.json();
        })
    ])
        .then(([acteur, genres]) => {
            if (acteur.length === 0) {
                alert("Aucun acteur disponible. Veuillez ajouter des acteurs avant de continuer.");
                return;
            }
            if (genres.length === 0) {
                alert("Aucun genre disponible. Veuillez ajouter des genres avant de continuer.");
                return;
            }

            // Création du formulaire
            let formulaireHtml = '';
            for (let i = 1; i <= nombre; i++) {
                formulaireHtml += `
                    <h5>Film ${i}</h5>
                    <label for="id_film${i}">ID film ${i}:</label>
                    <input type="text" name="id_film${i}" id="id_film${i}" placeholder="Entrer l'ID du film ${i}" required><br>
                    <label for="nom_film${i}">Titre film ${i}:</label>
                    <input type="text" name="titre_film${i}" id="nom_film${i}" placeholder="Entrer le nom du film ${i}" required><br>
                    <label for="adresse_film${i}">Durée film ${i}:</label>
                    <input type="time" name="durre${i}" id="adresse_film${i}" placeholder="Entrer la durée du film ${i}" required><br>
                    
                    <label for="id_acteur${i}">ID Acteur ${i}:</label>
                    <select name="id_acteur${i}" id="id_acteur${i}" required>
                        <option value="" disabled selected>-- Sélectionner un acteur --</option>`;
                
                acteur.forEach(acteurItem => {
                    formulaireHtml += `<option value="${acteurItem.id_acteur}">${acteurItem.id_acteur}</option>`;
                });

                formulaireHtml += `
                    </select><br>
                    
                    <label for="nom_genre${i}">Nom Genre ${i}:</label>
                    <select name="nom_genre${i}" id="nom_genre${i}" required>
                        <option value="" disabled selected>-- Sélectionner un nom  de genre --</option>`;
                
                genres.forEach(genre => {
                    formulaireHtml += `<option value="${genre.nom_genre}">${genre.nom_genre}</option>`;
                });

                formulaireHtml += `</select><br>
                <hr>`;
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
