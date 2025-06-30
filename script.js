// Tableau de tes objets 3D
const objects = [
  {
    file: "moon.glb",
    title: "Lampe Lune",
    description: "Lampe en forme de Lune."
  },
  {
    file: "Croix.glb",
    title: "Croix",
    description: "Croix"
  },
  {
    file: "Georgia.glb",
    title: "Georgia",
    description: "Georgia"
  }
];

// Sélectionne la grille où ajouter les objets
const container = document.querySelector('.library-grid');

// Boucle pour générer le HTML pour chaque objet
objects.forEach(obj => {
  container.innerHTML += `
    <div class="library-item">
      <model-viewer
        src="images/${obj.file}"
        alt="${obj.description}"
        auto-rotate
        camera-controls
        background-color="#000000"
        exposure="0.15"
        environment-image="neutral"
        style="width: 100%; height: 400px;">
      </model-viewer>
      <h4>${obj.title}</h4>
      <p>${obj.description}</p>
      <a href="mailto:contact@stilus-studio.be?subject=Commande%20${encodeURIComponent(obj.title)}" class="btn">Acheter</a>
    </div>
  `;
});
