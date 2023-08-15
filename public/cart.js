/**
 * Frontend JavaScript functions to handle cart-related functionality.
 * This script communicates with the backend server to manage the user's cart items.
 * @module cartScript
 */

/**
 * Fetches cart data from the server and populates the cart display with cart items.
 * @function
 * @memberof module:cartScript
 * @returns {undefined}
 */
const cartProducts = async () => {
    try {
        // Fetch cart data from the server
        const response = await axios.get('/data');
        const tbody = document.querySelector('container#cart');

        // Remove existing table rows from the cart display
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // If response data exists, populate the cart display with cart items
        if (response && response.data) {
            for (const product of response.data) {
                const cartIndex = response.data.findIndex(p => p.id === product.id);

                // If cart item exists, create a table row for it
                if (cartIndex >= 0) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${product.brand}</td>
                        <td>${product.name}</td>
                        <td>${product.size}</td>
                        <td>${product.sku}</td>
                        <td>
                            <button class='btn btn-danger' onclick='deletePlace(${product.id})'>Remove item</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                }
            }
        }
    } catch (error) {
        // Handle errors and display an error message
        console.error(error.message);
    }
};
