// ===== PRODUCT DATA =====
var products = [
  { name: "Cashmere Overcoat",   category: "Clothing",    price: "₹420", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80" },
  { name: "Silk Slip Dress",     category: "Clothing",    price: "₹280", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80" },
  { name: "Linen Blazer",        category: "Clothing",    price: "₹340", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" },
  { name: "Wide-Leg Trousers",   category: "Clothing",    price: "₹195", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80" },
  { name: "Chunky Knit Sweater", category: "Clothing",    price: "₹215", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
  { name: "Leather Tote Bag",    category: "Bags",        price: "₹390", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
  { name: "Canvas Weekend Bag",  category: "Bags",        price: "₹245", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
  { name: "Mini Crossbody",      category: "Bags",        price: "₹185", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80" },
  { name: "Gold Chain Necklace", category: "Accessories", price: "₹125", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80" },
  { name: "Silk Scarf",          category: "Accessories", price: "₹95",  img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80" },
  { name: "Tortoise Sunglasses", category: "Accessories", price: "₹165", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80" },
  { name: "Suede Ankle Boots",   category: "Footwear",    price: "₹320", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" },
  { name: "Leather Loafers",     category: "Footwear",    price: "₹275", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { name: "Block Heel Mules",    category: "Footwear",    price: "₹235", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80" }
];

// Track which category filter is active
var activeCategory = "All";

// ===== SHOW PRODUCTS =====
function showProducts() {
  var grid = document.getElementById("productsGrid");
  if (!grid) return;

  var searchText = document.getElementById("searchInput").value.toLowerCase();
  grid.innerHTML = "";
  var count = 0;

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    var matchesCategory = (activeCategory === "All" || product.category === activeCategory);
    var matchesSearch = (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );

    if (matchesCategory && matchesSearch) {
      var card = document.createElement("div");
      card.className = "product-card";

      // Each card gets a slightly longer delay so they appear one by one
      // delay = index * 0.08 seconds (e.g. 0s, 0.08s, 0.16s ...)
      card.style.animationDelay = (count * 0.08) + "s";

      card.innerHTML =
        '<img src="' + product.img + '" alt="' + product.name + '">' +
        '<div class="product-info">' +
          '<span>' + product.category + '</span>' +
          '<h3>' + product.name + '</h3>' +
          '<p>' + product.price + '</p>' +
          '<button onclick="addToCart(\'' + product.name + '\', this)">Add to Cart</button>' +
        '</div>';

      grid.appendChild(card);
      count++;
    }
  }

  if (count === 0) {
    grid.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
  }
}

// ===== FILTER FUNCTION =====
function filterProducts(category, clickedButton) {
  activeCategory = category;

  var allButtons = document.querySelectorAll(".filter-buttons button");
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("active");
  }

  clickedButton.classList.add("active");
  showProducts();
}

// ===== ADD TO CART =====
function addToCart(productName, button) {
  button.textContent = "✓ Added!";
  button.style.backgroundColor = "#f0c040";
  button.style.color = "#222";

  setTimeout(function () {
    button.textContent = "Add to Cart";
    button.style.backgroundColor = "";
    button.style.color = "";
  }, 1500);
}

// ===== CONTACT FORM SUBMIT =====
function submitForm(event) {
  event.preventDefault();
  document.getElementById("contactForm").style.display = "none";
  // Add "show" class so the bounceIn animation plays
  document.getElementById("successMessage").classList.add("show");
}

// ===== NEWSLETTER SUBSCRIBE =====
function subscribeNewsletter(event) {
  event.preventDefault();
  var input = event.target.querySelector("input");
  var button = event.target.querySelector("button");
  button.textContent = "✓ Subscribed!";
  input.value = "";
  setTimeout(function () {
    button.textContent = "Subscribe";
  }, 3000);
}

// =============================================
// SCROLL REVEAL ANIMATION
// This watches all elements with class "reveal".
// When they scroll into view, it adds class "visible"
// which triggers the CSS transition (opacity + slideUp).
// =============================================
function handleScrollReveal() {
  // Get every element that has class "reveal"
  var elements = document.querySelectorAll(".reveal");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // getBoundingClientRect() tells us where the element is on screen
    var position = element.getBoundingClientRect();

    // If the top of the element is within the screen height, show it
    if (position.top < window.innerHeight - 80) {
      element.classList.add("visible");
    }
  }
}

// ===== INIT =====
window.onload = function () {
  showProducts();

  // Run scroll check once on load (for elements already visible)
  handleScrollReveal();

  // Run scroll check every time the user scrolls
  window.addEventListener("scroll", handleScrollReveal);
};