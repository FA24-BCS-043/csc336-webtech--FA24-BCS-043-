// Lab Mid - Task 3 (N = 43)
const PREMIUM_LIMIT = 43 * 100; // N x 100 = 4300

const grid = document.querySelector(".product-grid");
const searchInput = document.getElementById("productSearch");
const sortBtn = document.getElementById("sortBtn");
const noResults = document.getElementById("noResults");
const radios = document.querySelectorAll('input[name="category"]');

// always read the cards from the page, so the order after sorting is respected
function getItems() {
  return Array.from(grid.querySelectorAll(".product-item"));
}

// "Rs. 3,499" -> 3499
function getPrice(item) {
  const text = item.querySelector(".price").textContent;
  return parseInt(text.replace(/[^\d]/g, ""), 10);
}

// ---- Premium label (runs on page load) ----
getItems().forEach((item) => {
  if (getPrice(item) > PREMIUM_LIMIT) {
    const badge = document.createElement("span");
    badge.className = "premium-badge";
    badge.textContent = "Premium";
    item.querySelector(".product-card").appendChild(badge);
  }
});

// ---- Search (works together with the CSS category filter) ----
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = document.querySelector(
    'input[name="category"]:checked',
  ).value;
  let visibleCount = 0;

  getItems().forEach((item) => {
    const name = item.querySelector(".card-title").textContent.toLowerCase();
    const matchesName = name.includes(query);
    const matchesCategory =
      category === "all" || item.dataset.category === category;

    // the category filter hides cards with CSS; search hides them with this class.
    // A card shows only if neither hides it => it matches both.
    item.classList.toggle("search-hidden", !matchesName);

    if (matchesName && matchesCategory) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
}

// the navbar search form must not reload the page
document
  .getElementById("navSearchForm")
  .addEventListener("submit", (e) => e.preventDefault());

searchInput.addEventListener("input", applyFilters);
radios.forEach((radio) => radio.addEventListener("change", applyFilters));

// ---- Sort by price (toggles low->high, high->low) ----
let ascending = true;

sortBtn.addEventListener("click", () => {
  const sorted = getItems().sort((a, b) =>
    ascending ? getPrice(a) - getPrice(b) : getPrice(b) - getPrice(a),
  );

  // appendChild MOVES the existing elements, nothing is rebuilt
  sorted.forEach((item) => grid.appendChild(item));

  sortBtn.textContent = ascending
    ? "Sort by price (low to high)"
    : "Sort by price (high to low)";
  ascending = !ascending;
});
