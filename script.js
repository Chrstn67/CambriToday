document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour générer les options de la liste déroulante
  function generateDropdownOptions(especeNames) {
    especeNames.sort((a, b) => a.name.localeCompare(b.name)); // Tri des noms des animaux
    const options = especeNames.map((especeName) => {
      return `<option>${especeName.name}</option>`;
    });
    return options.join("");
  }

  // Parcourir toutes les cellules avec la classe "espece-cell"
  const especeCells = document.querySelectorAll(".espece-cell");

  especeCells.forEach((cell) => {
    const etage = cell.dataset.etage;
    const especeList = especeData[etage];
    if (especeList) {
      const select = document.createElement("select");
      select.innerHTML =
        `<option disabled selected value>--Choisir une espèce--</option>` +
        generateDropdownOptions(especeList);
      cell.appendChild(select);
      select.addEventListener("change", (event) => {
        const especeName = event.target.value;
        const especeInfo = especeList.find(
          (espece) => espece.name === especeName
        );

        // Sélectionnez l'élément de l'aside
        const animalInfo = document.getElementById("animal-info");

        // Sélectionnez l'élément du canvas
        const canvas = document.getElementById("canvas");

        // Mettez à jour les informations dans le canvas
        canvas.innerHTML = `
            <img src="${especeInfo.image}" alt="${especeInfo.name}">
            <h2>${especeInfo.name}</h2>
            <p> <span class="time-info">Période:</span> ${especeInfo.period}</p>
            <p> <span class="time-info">Époque:</span> ${especeInfo.epoque}</p>
            <p> <span class="time-info">Étage:</span> ${especeInfo.etage}</p>
            <p class="description">${especeInfo.description}</p>
          `;

        // Ajoutez la classe "open" pour ouvrir l'aside
        animalInfo.classList.add("open");
      });
    }
  });

  // Sélectionnez l'élément du bouton de fermeture et l'élément de l'aside
  const closeButton = document.getElementById("close-button");
  const animalInfo = document.getElementById("animal-info");

  // Ajoutez un gestionnaire d'événements de clic au bouton de fermeture
  closeButton.addEventListener("click", () => {
    // Supprimez la classe "open" pour fermer l'aside
    animalInfo.classList.remove("open");
  });
});
