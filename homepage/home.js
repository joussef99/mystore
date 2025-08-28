import { addToCart, resetCart ,initBackToTop } from '../shared.js';



const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter"); 
const reset = document.getElementById("reset-cart");

document.addEventListener("DOMContentLoaded", () => {
  initBackToTop();     // enables the arrow
  updateCartCountUI(); // keeps count in sync
});

let allProducts = [];

export function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-md-4 col-lg-3";

    card.innerHTML = `
  <div class="card h-100 shadow-sm border-0">
    <img src="${product.img}" class="card-img-top" alt="${
      product.type
    }" style="height:300px; object-fit:cover;" />
    <div class="card-body d-flex flex-column">
      <h3 class="card-title fw-bold text-dark">${product.type}</h3>
      <p class="text-muted small mb-1">${product.category}</p>
      <p class="card-text small flex-grow-1">${product.description}</p>
      <p class="fw-bold text-dark fs-5 mb-3">$${product.price.toFixed(2)}</p>
      <div class="mt-auto d-flex justify-content-between">
        <button class="btn btn-sm btn-primary add-to-cart" data-id="${
          product.id
        }">
          <i class="bi bi-cart-fill me-1"></i> Add to Cart
        </button>
        <button class="btn btn-sm btn-outline-secondary view-details" data-id="${
          product.id
        }">
          <i class="bi bi-info-circle me-1"></i> Details
        </button>
      </div>
    </div>
  </div>
`;

    productList.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.id;
    const product = products.find(p => p.id == productId);
    addToCart(product);
  });
});

  document.querySelectorAll(".view-details").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      // Save the clicked product's data in localStorage
      const clickedProduct = products.find(p => p.id == productId);
      localStorage.setItem("selectedProduct", JSON.stringify(clickedProduct));

      // Navigate to the details page
      window.location.href = `../product-details/details.html?id=${productId}`;
    });
  });
}

 reset.addEventListener("click", resetCart );

fetch("../products.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products;
    renderProducts(allProducts);
  })
  .catch((error) => console.error("Error loading products:", error));

function applyFilters() {
  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;

  let filtered = [...allProducts];

  // Category filter
  if (selectedCategory !== "all") {
    filtered = filtered.filter(
      (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()  
    );
  }

  // Price filter
  if (selectedPrice) {
    if (selectedPrice.includes("-")) {
      const [min, max] = selectedPrice.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    } else if (selectedPrice.includes("+")) {
      const min = Number(selectedPrice.replace("+", ""));
      filtered = filtered.filter((p) => p.price >= min);
    }
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);

// =====================  slider ================================= 

const slidesData = [
  {
    img: "../imgs/slider1.jpg",
    title: "Latest Collection",
    text: "Explore our new arrivals for the season"
  },
  {
    img: "../imgs/slider2.jpg",
    title: "Step in Style",
    text: "Trendy footwear for every occasion"
  },
  {
    img: "../imgs/slider3.jpg",
    title: "Hot Deals",
    text: "Grab your favorites at unbeatable prices"
  }
];

let slideIndex = 0;

function renderSlides() {
  const slider = document.getElementById("slider");
  slider.innerHTML = "";

  slidesData.forEach((slide) => {
    const slideDiv = document.createElement("div");
    slideDiv.className = "slide fade";
    slideDiv.innerHTML = `
      <img src="${slide.img}" alt="${slide.title}">
      <div class="slide-caption">
        <h2>${slide.title}</h2>
        <p>${slide.text}</p>
      </div>
    `;
    slider.appendChild(slideDiv);
  });
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  Array.from(slides).forEach(s => s.classList.remove("active"));
  slides[slideIndex].classList.add("active");
}



document.querySelector(".prev").addEventListener("click", () => showSlide(--slideIndex));
document.querySelector(".next").addEventListener("click", () => showSlide(++slideIndex));

function autoSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

renderSlides();
showSlide(slideIndex);
setInterval(autoSlide, 5000);

// ================= cart page ==========================

document.getElementById("cartLink").addEventListener("click", () => {
  window.location.href = "../cart/cart.html";
});


