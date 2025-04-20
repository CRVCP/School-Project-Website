// Load existing cart or create empty one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
  cart.push(item);
  saveCart();
  alert("Item added.");
}

function openCart() {
  const modal = document.getElementById('cartModal');
  const list = document.getElementById('cartItems');
  list.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  modal.style.display = 'flex';
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

function clearCart() {
  cart = [];
  saveCart();
  document.getElementById('cartItems').innerHTML = '';
}

function processOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
  } else {
    alert("Thank you for your order.");
    clearCart();
    closeCart();
  }
}
