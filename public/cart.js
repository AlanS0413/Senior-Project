
const loadProducts = async () => {
    const response = await axios.get('/cart');
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    if (response && response.data && response.data.cart && response.data.product) {
      for (const product of response.data.product) {
        const productAvail = response.data.product.findIndex(product => product.id === cart.id);
        if (cartIndex >= 0) {
          const cartItem = response.data.cart[cartIndex];
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${product.brand}</td>
            <td>${product.name}</td>
            <td>${product.size}</td>
            <td>${product.sku}</td>
            <td>
              <button class='btn btn-danger' onclick='deletePlace(${cart.id})'>Remove item</button>
            </td>
          `;
          tbody.appendChild(tr);
        }
      }
    }
  };