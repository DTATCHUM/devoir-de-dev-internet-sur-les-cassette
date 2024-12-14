function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);
    console.log(nombre);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide d'acteurs");
        return;
    }

    // Création du formulaire sans la balise <form>
    let formulaireHtml = '';

    // Ajout des champs pour chaque acteur
    for (let i = 1; i <= nombre; i++) {
        formulaireHtml += `
            <h5>Acteur ${i}</h5>
            <label for="id_acteur${i}">ID Acteur ${i}:</label>
            <input type="text" name="id_acteur${i}" id="id_acteur${i}" placeholder="Entrer l'ID de l'acteur ${i}" required><br>
            <label for="nom_acteur${i}">Nom Acteur ${i}:</label>
            <input type="text" name="nom_acteur${i}" id="nom_acteur${i}" placeholder="Entrer le nom de l'acteur ${i}" required><br>`;
                
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
