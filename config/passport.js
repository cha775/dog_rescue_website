// frontend/script.js
fetch('/api/shop/products')
  .then(response => response.json())
  .then(data => {
    // Render products on the page
  })
  .catch(error => console.error('Error fetching products:', error));
