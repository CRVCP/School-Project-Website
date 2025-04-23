// cart.js - Shopping cart functionality for Book Haven Bookstore

// Initialize cart on page load
if (!localStorage.getItem('cartItems')) {
  // Initialize empty cart if it doesn't exist in localStorage
  localStorage.setItem('cartItems', JSON.stringify([]));
}

/**
 * Add item to cart
 * @param {string} itemName - Name of the item
 * @param {number} price - Price of the item (optional)
 */
function addToCart(itemName, price) {
  // If only one parameter is provided, parse it (compatibility with gallery.html)
  if (price === undefined && itemName.includes('$')) {
    const parts = itemName.split('$');
    itemName = parts[0].trim();
    price = parseFloat(parts[1].trim());
  }
  
  // Get current cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cartItems'));
  
  // Add new item to cart
  cart.push({ name: itemName, price: price });
  
  // Save updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cart));
  
  // Show confirmation alert
  alert(`${itemName} has been added to your cart.`);
}

/**
 * Open cart modal and display items
 */
function openCart() {
  // Get cart modal element
  const modal = document.getElementById('cartModal');
  
  // Display the modal
  modal.style.display = 'flex';
  
  // Display cart items
  displayCartItems();
}

/**
 * Close cart modal
 */
function closeCart() {
  // Get cart modal element
  const modal = document.getElementById('cartModal');
  
  // Hide the modal
  modal.style.display = 'none';
}

/**
 * Display cart items in the modal
 */
function displayCartItems() {
  // Get cart items list element
  const cartItemsList = document.getElementById('cartItems');
  
  // Get cart items from localStorage
  const cart = JSON.parse(localStorage.getItem('cartItems'));
  
  // Clear current list
  cartItemsList.innerHTML = '';
  
  // If cart is empty, show message
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty</li>';
    return;
  }
  
  // Add each item to the list
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(li);
    total += parseFloat(item.price);
  });
  
  // Add total
  const totalLi = document.createElement('li');
  totalLi.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartItemsList.appendChild(totalLi);
}

/**
 * Clear all items from cart
 */
function clearCart() {
  // Clear cart in localStorage
  localStorage.setItem('cartItems', JSON.stringify([]));
  
  // Update display
  displayCartItems();
  
  // Show confirmation alert
  alert('Your cart has been cleared.');
}

/**
 * Process the order
 */
function processOrder() {
  // Get cart items from localStorage
  const cart = JSON.parse(localStorage.getItem('cartItems'));
  
  // If cart is empty, show message and return
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Create order summary
  let summary = "Thank you for your order! Here's what you ordered:\n\n";
  let total = 0;
  
  // Add each item to summary
  cart.forEach(item => {
    summary += `• ${item.name} - $${item.price}\n`;
    total += parseFloat(item.price);
  });
  
  // Add total to summary
  summary += `\nTotal: $${total.toFixed(2)}`;
  
  // Show order summary
  alert(summary);
  
  // Clear cart after order
  localStorage.setItem('cartItems', JSON.stringify([]));
  
  // Update display
  displayCartItems();
}