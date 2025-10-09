let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = totalCount;
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className =
      "flex justify-between items-center bg-white p-2 border rounded";
    row.innerHTML = `
      <div>
        <p class="font-semibold">${item.name} (${item.quantity}x)</p>
        <p class="text-sm text-gray-500">₹${item.price} each</p>
      </div>
      <div class="flex items-center gap-2">
        <p class="text-green-700 font-bold">₹${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
      </div>
    `;
    container.appendChild(row);
  });

  updateCartTotal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

function updateCartTotal() {
  const container = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let totalDiv = document.getElementById("cartTotal");
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.id = "cartTotal";
    totalDiv.className =
      "text-right font-bold text-green-700 pt-4 border-t mt-4";
    container.appendChild(totalDiv);
  }
  totalDiv.textContent = `Total: ₹${total}`;
}

function initPage() {
  updateCartCount();
  renderCartItems();
}
