// Tableau de tes objets 3D
const objects = [
  {
    id: 1,
    file: "moon.glb",
    title: "Lampe Lune",
    description: "Lampe en forme de Lune interactive en 3D."
  },
  {
    id: 2,
    file: "croix.glb",
    title: "Croix",
    description: "Croix 3D stylisée."
  },
  {
    id: 3,
    file: "georgia.glb",
    title: "Georgia",
    description: "Modèle Georgia en 3D."
  }
];

const container = document.querySelector('.library-grid');

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
      <h4>Objet ${obj.id} : ${obj.title}</h4>
      <p>${obj.description}</p>
      <button onclick='addToCart(${JSON.stringify(obj)}, 1)' class="btn">Add</button>
    </div>
  `;
});


const cart = [];

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    let quantityDisplay = `x${item.quantity}`;
    if (item.quantity >= 10) {
      quantityDisplay += ' <span style="color:red;font-weight:bold;">Max</span>';
    }
    cartItems.innerHTML += `
      <li>
        ${item.title} ${quantityDisplay} 
        <button onclick="decreaseQuantity(${index})" class="cart-btn">-</button>
        <button onclick="increaseQuantity(${index})" class="cart-btn">+</button>
      </li>
    `;
  });
}




function addToCart(obj, quantity) {
  const existing = cart.find(item => item.id === obj.id);
  if (existing) {
    if (existing.quantity + quantity > 10) {
      existing.quantity = 10; // plafonne à 10
      alert("Vous ne pouvez pas ajouter plus de 10 exemplaires de ce produit.");
    } else {
      existing.quantity += quantity;
    }
  } else {
    if (quantity > 10) quantity = 10;
    cart.push({...obj, quantity});
  }
  updateCartDisplay();
}


function increaseQuantity(index) {
  if (cart[index].quantity < 10) {
    cart[index].quantity++;
  } else {
    alert("Vous ne pouvez pas ajouter plus de 10 exemplaires de cet article.");
  }
  updateCartDisplay();
}


function decreaseQuantity(index) {
  cart[index].quantity--;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    let body = "Bonjour,\n\nJe souhaite commander les objets suivants :\n";
    cart.forEach(item => {
      body += `- ID ${item.id} : ${item.title} (x${item.quantity})\n`;
    });
    body += "\nMerci de me confirmer la disponibilité et le prix.\n\nCordialement,";

    window.location.href = `mailto:contact@stilus-studio.be?subject=Nouvelle commande&body=${encodeURIComponent(body)}`;
  });
});


