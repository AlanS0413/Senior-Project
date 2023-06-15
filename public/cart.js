
const cartProducts = async () => {
    const response = await axios.get('/data');
    const tbody = document.querySelector('container#cart');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    if (response && response.data) {
      for (const product of response.data) {
        const productAvail = response.data.findIndex(product => product.id === cart.id);
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