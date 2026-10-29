// Midterm Task 3: Working cart badge and mini cart
// Roll Number: FA24-BCS-038 (N = 38)
// Limit formula: (N mod 4) + 2 = (38 mod 4) + 2 = 2 + 2 = 4
const MAX_ITEM_LIMIT = (38 % 4) + 2; // Exactly 4 items per product
window.MAX_ITEM_LIMIT = MAX_ITEM_LIMIT;

// Cart state array: stores added products
const cart = [];
window.cart = cart;

function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const cartBadge = document.getElementById('cart-badge');
  const miniCartPanel = document.getElementById('mini-cart-panel');
  const miniCartItems = document.getElementById('mini-cart-items');
  const miniCartCount = document.getElementById('mini-cart-count');
  const miniCartTotal = document.getElementById('mini-cart-total');

  // Find all product cards on the listing page
  const productCards = document.querySelectorAll('article');

  // Attach event listeners to "Add to Cart" buttons on existing cards
  productCards.forEach((card) => {
    const btn = card.querySelector('button');
    const nameEl = card.querySelector('h3');

    if (!btn || !nameEl) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Read product name from the card DOM
      const name = nameEl.textContent.trim();

      // Read price from the card DOM (looks for $ sign)
      let price = 0;
      const allTextElements = card.querySelectorAll('span, p, div');
      for (const el of allTextElements) {
        const text = el.textContent.trim();
        if (text.startsWith('$')) {
          price = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
          break;
        }
      }

      // Check current quantity of this product in cart
      const currentCount = cart.filter((item) => item.name === name).length;

      if (currentCount < MAX_ITEM_LIMIT) {
        // Add product to cart array
        cart.push({
          id: Date.now() + Math.random(),
          name: name,
          price: price,
        });

        // Update UI (badge, mini-cart, and button limit states)
        updateCartUI();
      }
    });
  });

  // Calculate total price using Array.prototype.reduce() as strictly required
  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
  }

  // Update badge, mini-cart list, total, and card buttons
  function updateCartUI() {
    const totalCount = cart.length;

    // 1. Update Cart Badge
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      if (totalCount > 0) {
        cartBadge.classList.add('has-items');
      } else {
        cartBadge.classList.remove('has-items');
      }
    }

    // 2. Update Mini-Cart Count
    if (miniCartCount) {
      miniCartCount.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
    }

    // 3. Update Total using reduce()
    if (miniCartTotal) {
      const total = calculateTotal();
      miniCartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // 4. Render Mini-Cart Items list
    if (miniCartItems) {
      if (cart.length === 0) {
        miniCartItems.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
      } else {
        // Group items for clean listing
        const grouped = {};
        cart.forEach((item) => {
          if (!grouped[item.name]) {
            grouped[item.name] = {
              name: item.name,
              price: item.price,
              count: 0,
            };
          }
          grouped[item.name].count += 1;
        });

        miniCartItems.innerHTML = '';
        Object.values(grouped).forEach((grp) => {
          const itemRow = document.createElement('div');
          itemRow.className = 'mini-cart-item';
          itemRow.innerHTML = `
            <div class="mini-cart-item-info">
              <p class="mini-cart-item-name">${grp.name}</p>
              <p class="mini-cart-item-meta">$${grp.price.toFixed(2)} × ${grp.count} = $${(grp.price * grp.count).toFixed(2)}</p>
            </div>
            <button type="button" class="mini-cart-remove-btn" aria-label="Remove one ${grp.name}">Remove</button>
          `;

          // Remove button: removes ONE of that product from cart
          const removeBtn = itemRow.querySelector('.mini-cart-remove-btn');
          removeBtn.addEventListener('click', () => {
            removeOneProduct(grp.name);
          });

          miniCartItems.appendChild(itemRow);
        });
      }
    }

    // 5. Update Product Card Buttons (Limit reached vs Add to Cart)
    productCards.forEach((card) => {
      const btn = card.querySelector('button');
      const nameEl = card.querySelector('h3');
      if (!btn || !nameEl) return;

      const name = nameEl.textContent.trim();
      const countInCart = cart.filter((item) => item.name === name).length;

      if (countInCart >= MAX_ITEM_LIMIT) {
        btn.textContent = 'Limit reached';
        btn.disabled = true;
        btn.classList.add('limit-reached');
      } else {
        btn.textContent = 'Add to Cart';
        btn.disabled = false;
        btn.classList.remove('limit-reached');
      }
    });
  }

  // Remove ONE item of the given product name from cart
  function removeOneProduct(productName) {
    let indexToRemove = -1;
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].name === productName) {
        indexToRemove = i;
        break;
      }
    }

    if (indexToRemove !== -1) {
      cart.splice(indexToRemove, 1);
      updateCartUI();
    }
  }

  // Toggle mini-cart panel on cart icon click
  if (cartBtn && miniCartPanel) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      miniCartPanel.classList.toggle('hidden');
    });

    // Close when clicking outside panel
    document.addEventListener('click', (e) => {
      if (!cartBtn.contains(e.target) && !miniCartPanel.contains(e.target)) {
        miniCartPanel.classList.add('hidden');
      }
    });
  }

  // Expose updateCartUI for testing
  window.updateCartUI = updateCartUI;
  window.removeOneProduct = removeOneProduct;

  // Initial sync
  updateCartUI();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCart);
} else {
  initCart();
}
