function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);
    console.log(nombre);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide d'cautions");
        return;
    }

    // Création du formulaire sans la balise <form>
    let formulaireHtml = '';

    // Ajout des champs pour chaque caution
    for (let i = 1; i <= nombre; i++) {
        formulaireHtml += `
            <h5>caution ${i}</h5>
            <label for="id_caution${i}">ID caution ${i}:</label>
            <input type="text" name="id_caution${i}" id="id_caution${i}" placeholder="Entrer l'ID de l'caution ${i}" required><br>
            <label for="nom_caution${i}">Montant caution ${i}:</label>
            <input type="number" name="montant${i}" id="nom_caution${i}" placeholder="Entrer le montant de caution ${i}" required><br>
            
            <label for="id_caution${i}">Durre caution ${i}:</label>
            <input type="time" name="durre${i}" id="id_caution${i}" placeholder="Entrer la durre de lacaution ${i}" required><br>
            <hr>`;
                
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
