import { addToCart, resetCart ,initBackToTop } from '../shared.js';


function renderCart() {
  const cartContent = document.getElementById("cartContent");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.length) {
    cartContent.innerHTML = `<div class="empty-cart">
      <p>Your cart is empty.</p>
      <a href="../home/home.html" class="checkout-btn">Continue Shopping</a>
    </div>`;
    return;
  }

  let total = 0;
  const rows = cart.map((item, index) => {
    total += item.price * item.qty;
    return `
      <tr>
        <td><img src="${item.img}" alt="${item.name}"></td>
        <td>${item.type}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <button class="qty-btn" data-action="dec" data-index="${index}">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-index="${index}">+</button>
        </td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
        <td>
          <button class="qty-btn" data-action="remove" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  cartContent.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Image</th><th>Product</th><th>Price</th>
          <th>Qty</th><th>Subtotal</th><th>Remove</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="cart-summary">Total: $${total.toFixed(2)}</div>
    <a href="../checkout/checkout.html" class="checkout-btn">Proceed to Checkout</a>
  `;
}


function updateQty(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!cart[index]) return;

  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("cartContent").addEventListener("click", (e) => {
  const btn = e.target.closest("button.qty-btn");
  if (!btn) return;

  const index = Number(btn.dataset.index);
  const action = btn.dataset.action;

  if (action === "inc") updateQty(index, 1);
  if (action === "dec") updateQty(index, -1);
  if (action === "remove") removeItem(index);
});
renderCart();

