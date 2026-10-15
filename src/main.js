
import products from './data/products.json';

// Core pagination state
const ITEMS_PER_PAGE = 5;
let currentPage = 1;

// Target DOM hooks
const productGrid = document.getElementById('product-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

/**
 * Calculates total pages required for the data set
 * @returns {number}
 */
const getTotalPages = () => Math.ceil(products.length / ITEMS_PER_PAGE);

/**
 * Builds HTML template for an individual product card
 * @param {Object} product
 * @returns {string}
 */
function createProductCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img 
          src="${product.imageUrl}" 
          alt="${product.name}" 
          class="product-image"
          loading="lazy"
        />
      </div>
      <div class="product-content">
        <span class="badge">${product.category}</span>
        <h2 class="product-title">${product.name}</h2>
        <p class="product-desc">${product.description}</p>
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
    </article>
  `;
}

/**
 * Slices product dataset and renders items to the DOM
 */
function renderStorePage() {
  if (!productGrid) return;

  const totalPages = getTotalPages();
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = products.slice(startIndex, endIndex);

  // Render cards directly into the DOM
  productGrid.innerHTML = paginatedItems.map(createProductCard).join('');

  // Update Page Indicator
  if (pageIndicator) {
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  // Update button boundary states
  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;
  }
  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages;
  }
}

/**
 * Attaches event listeners for Store Page pagination
 */
function setupPagination() {
  if (!productGrid || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderStorePage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      currentPage++;
      renderStorePage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Initial render on page load
  renderStorePage();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', setupPagination);