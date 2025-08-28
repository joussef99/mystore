// ================= Shared Cart Functions =================
export function addToCart(product) {
  if (!product || !product.id) {
    console.warn("addToCart: Invalid product object", product);
    return;
  }

  const cart = getCart();
  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCountUI(cart);
}


export function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function updateCartCountUI(cart = getCart()) {
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    const totalItems = cart.reduce((sum, p) => sum + (p.qty || 0), 0);
    cartCountEl.textContent = totalItems > 99 ? "99+" : totalItems;
  }
}

// ================= Shared Logout =================

export function resetCart() {
  saveCart([]);
  localStorage.removeItem("cart");
  window.location.href = "/login page/login.html";
}

export function initBackToTop() {
  let btn = document.getElementById("backToTop");
  
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 100 ? "flex" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}