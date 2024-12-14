function generer(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let nombre = parseInt(document.getElementById("nombre").value);
    console.log(nombre);

    // Vérifie si la valeur est valide
    if (isNaN(nombre) || nombre <= 0) {
        alert("Veuillez entrer un nombre valide d' genre");
        return;
    }

    // Création du formulaire sans la balise <form>
    let formulaireHtml = '';

    // Ajout des champs pour chaque  genre
    for (let i = 1; i <= nombre; i++) {
        formulaireHtml += `
            <h5> genre ${i}</h5>
            <label for="id_ genre${i}">Nom  genre ${i}:</label>
            <input type="text" name="nom_genre${i}" id="id_ genre${i}" placeholder="Entrer le nom  du  genre ${i}" required><br>
            <label for="nom_ genre${i}">Type public ${i}:</label>
            <input type="text" name="type_public${i}" id="nom_ genre${i}" placeholder="Entrer le type public de du genre ${i}" required><br>
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
