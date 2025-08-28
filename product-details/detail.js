import { addToCart, resetCart } from "../shared.js";


const product = JSON.parse(localStorage.getItem("selectedProduct") || "null");
const reset = document.getElementById("reset-cart");

document.addEventListener("DOMContentLoaded", () => {
  initBackToTop();
  updateCartCountUI(); 
});

if (!product) {
  document.querySelector(".container").innerHTML = "<p>No product found.</p>";
} else {
  document.getElementById("prodImg").src = product.img;
  document.getElementById("prodName").textContent = product.type;
  document.getElementById("prodPrice").textContent = `$${product.price.toFixed(
    2
  )}`;
  document.getElementById("prodDesc").textContent = product.description;
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(product);
  });
}

reset.addEventListener("click", resetCart);



