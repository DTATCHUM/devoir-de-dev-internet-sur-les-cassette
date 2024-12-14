function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);
    console.log(nombre);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide d'magasins");
        return;
    }

    // Création du formulaire sans la balise <form>
    let formulaireHtml = '';

    // Ajout des champs pour chaque magasin
    for (let i = 1; i <= nombre; i++) {
        formulaireHtml += `
            <h5>magasin ${i}</h5>
            <label for="id_magasin${i}">ID magasin ${i}:</label>
            <input type="text" name="id_magasin${i}" id="id_magasin${i}" placeholder="Entrer l'ID de l'magasin ${i}" required><br>
            <label for="nom_magasin${i}">Nom magasin ${i}:</label>
            <input type="text" name="nom_magasin${i}" id="nom_magasin${i}" placeholder="Entrer le nom de l'magasin ${i}" required><br>
                <label for="nom_magasin${i}">localisation magasin ${i}:</label>
            <input type="text" name="localisation${i}" id="localisation${i}" placeholder="Entrer la localisation du magasin ${i}" required><br>
            <hr>
            `;
                
        }

    // Ajout du bouton de soumission
    formulaireHtml += `<button type="submit">Valider</button>`;

    // Ajoute le formulaire au conteneur
    document.getElementById("formulaire-container").innerHTML = formulaireHtml;

    // Sélectionner le bouton et l'input spécifique
    const button = document.getElementById("myButton");
    const inputNombre = document.getElementById("nombre");

    // Fonction pour cacher le bouton lorsque l'on clique dessus
    button.style.display = "none";  // Cacher le bouton initialement lorsqu'on clique dessus

    // Fonction pour faire réapparaître le bouton quand un input spécifique (nombre) est cliqué
    inputNombre.addEventListener("focus", () => {
        button.style.display = "block";  // Afficher le bouton quand l'input "nombre" est sélectionné
    });
}
