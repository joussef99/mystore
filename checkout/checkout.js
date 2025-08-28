function renderOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!cart.length) {
    document.getElementById("orderSummary").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  const rows = cart.map(item => {
    const sub = item.price * item.qty;
    total += sub;
    return `<tr>
      <td>${item.name} x${item.qty}</td>
      <td>$${sub.toFixed(2)}</td>
    </tr>`;
  }).join("");

  document.getElementById("orderSummary").innerHTML = `
    <table>
      <thead>
        <tr><th>Item</th><th>Subtotal</th></tr>
      </thead>
      <tbody>
        ${rows}
        <tr class="total-line"><td>Total</td><td>$${total.toFixed(2)}</td></tr>
      </tbody>
    </table>
  `;
}

document.getElementById("checkoutForm").addEventListener("submit", e => {
  e.preventDefault();
  // Here you’d send the order to a backend API if you had one
  localStorage.removeItem("cart");
  document.getElementById("checkoutForm").reset();
  document.getElementById("orderSummary").innerHTML = "";
  document.getElementById("successMsg").style.display = "block";
});

renderOrderSummary();