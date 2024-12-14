function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide de clients");
        return;
    }

    // Récupère la liste des magasins via fetch
    fetch("../traitement/liste_magasin.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des magasins.");
            }
            return response.json();
        })
        .then(magasins => {
            if (magasins.length === 0) {
                alert("Aucun magasin disponible. Veuillez ajouter des magasins avant de continuer.");
                return;
            }

            // Création du formulaire
            let formulaireHtml = '';
            for (let i = 1; i <= nombre; i++) {
                formulaireHtml += `
                    <h5>Client ${i}</h5>
                    <label for="id_client${i}">ID client ${i}:</label>
                    <input type="text" name="id_client${i}" id="id_client${i}" placeholder="Entrer l'ID du client ${i}" required><br>
                    <label for="nom_client${i}">Nom client ${i}:</label>
                    <input type="text" name="nom_client${i}" id="nom_client${i}" placeholder="Entrer le nom du client ${i}" required><br>
                    <label for="adresse_client${i}">Adresse client ${i}:</label>
                    <input type="text" name="adresse${i}" id="adresse_client${i}" placeholder="Entrer l'adresse du client ${i}" required><br>
                    <label for="id_magasin${i}">Magasin ${i}:</label>
                    <select name="id_magasin${i}" id="id_magasin${i}" required>
                        <option value="" disabled selected>-- Sélectionner un magasin --</option>`;
                
                magasins.forEach(magasin => {
                    formulaireHtml += `<option value="${magasin.id_magasin}">${magasin.id_magasin}</option>`;
                });

                formulaireHtml += `</select><br>`;
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
