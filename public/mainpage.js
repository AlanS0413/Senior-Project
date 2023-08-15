/*====================================================
mainpage.js - Frontend Main Page Handling
====================================================*/
/**
 * @file This file contains frontend JavaScript functions for handling the main page display and user interactions.
 * It communicates with the backend server to fetch data and updates the UI accordingly.
 * @module mainpage
 */

/**
 * Fetches data using AJAX to populate the main product display.
 * @function addProducts
 */
function addProducts() {
  // Fetch data using AJAX to populate the main product display
  $.ajax({
    url: '/data',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        const item = data[i];
        // Perform necessary actions with the fetched data
      }
    },
    error: function (xhr, status, error) {
      console.error('Error fetching data:', error);
    }
  });
}

/**
 * Refreshes product thumbnails using jQuery Nailthumb library.
 * @function refreshThumbnails
 */
function refreshThumbnails() {
  jQuery('img.center-img.thumbnails').nailthumb({
    width: 335,
    height: 185,
    method: 'resize'
  });
}

/**
 * Loads products onto the main page.
 * @async
 * @function loadProducts
 */
const loadProducts = async () => {
  // Fetch product data from the server
  const response = await axios.get('/data');
  const ubody = document.querySelector('ul#producttable')
  if (response && response.data) {
    // Populate the main page product display
    for (const product of response.data) {
      const ubodyli = document.createElement('li');
      ubodyli.innerHTML = `
        <a class="text-black" href="/${product.brand}/${product.sku}" data-gender="${product.gender}" data-size="${product.size}" data-price="${product.price}"> 
          ${product.brand} ${product.title}
        </a> 
        <a href="/${product.brand}/${product.sku}">
          <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
        </a>
      `;
      ubody.appendChild(ubodyli)
    }
    // Add event listeners for dropdowns and buttons
    const dropdowns = document.querySelectorAll("a.nav-link")
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', () => {
        // Toggle dropdown visibility
        dropdown.classList.toggle('show');
        if (dropdown.classList.contains('show')) {
          dropdown.nextElementSibling.classList.add('show');
        } else {
          dropdown.nextElementSibling.classList.remove('show');
        }
      })
    })
  }
  addProducts(); // Call function to add products (define this function)
  refreshThumbnails(); // Refresh thumbnail images using jQuery Nailthumb library
}

/**
 * Loads brand-specific products onto the main page.
 * @async
 * @function loadBrandProducts
 */
const loadBrandProducts = async () => {
  // Extract the brand from the URL
  const brand = window.location.pathname.split('/')[1].toLowerCase();
  // Request all product data
  const response = await axios.get('/data');

  const ubody = document.querySelector('ul#brandproducttable');

  if (response && response.data) {
    // Filter products by the specific brand
    const brandProducts = response.data.filter(product => product.brand.toLowerCase() === brand);
    // Populate the brand-specific product display
    for (const product of brandProducts) {
      const ubodyli = document.createElement('li');
      ubodyli.innerHTML = `
      <a class="text-black" href="/${product.brand}/${product.sku}" data-gender="${product.gender}" data-size="${product.size}" data-price="${product.price}"> 
        ${product.brand} ${product.title}
      </a> 
      <a href="/${product.brand}/${product.sku}">
        <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
      </a>
    `;
      ubody.appendChild(ubodyli);
    }
  }

  addProducts(); // Call function to add products (define this function)
  refreshThumbnails(); // Refresh thumbnail images using jQuery Nailthumb library
}

/**
 * Loads products of a specific type within a brand.
 * @async
 * @function loadProductTypes
 */
const loadProductTypes = async () => {
  // Extract the brand from the URL
  const brand = window.location.pathname.split('/')[2].toLowerCase();
  const typeofItem = window.location.pathname.split('/')[1].toLowerCase();
  const firstLetter = typeofItem.charAt(0);

  // Fetch product data from the server
  const response = await axios.get('/data');

  const ubody = document.querySelector('ul#brandtypetable');

  if (response && response.data) {
    // Filter products by the specific brand
    const brandProducts = response.data.filter(product => product.brand.toLowerCase() === brand);
    const brandTypeofProducts = brandProducts.filter(product => product.itemtype.toLowerCase() === firstLetter);
    // Populate the product type display
    for (const product of brandTypeofProducts) {
      const ubodyli = document.createElement('li');
      ubodyli.innerHTML = `
      <a class="text-black" href="/${product.brand}/${product.sku}" data-gender="${product.gender}" data-size="${product.size}" data-price="${product.price}"> 
        ${product.brand} ${product.title}
      </a> 
      <a href="/${product.brand}/${product.sku}">
        <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
      </a>
    `;
      ubody.appendChild(ubodyli);
    }
    if (brandTypeofProducts.length === 0) {
      // Display a message when no products are available
      const errorMessage = `<li>Check Back Soon!</li><br><button class='btn btn-outline-success' onclick="location.href='/'">Go Home</button>`;
      ubody.innerHTML += errorMessage;
      return;
    }
  }

  addProducts(); // Call function to add products (define this function)
  refreshThumbnails(); // Refresh thumbnail images using jQuery Nailthumb library;
};

/**
 * Displays Filtered Products.
 * @async
 * @function displayFilteredProducts
 */
function displayFilteredProducts(products) {
  // Clear the previous product display
  const productContainer = document.querySelector('ul#producttable');
  productContainer.innerHTML = '';

  // Iterate over the filtered products and create product elements
  for (const product of products) {
    const productElement = document.createElement('li');
    productElement.innerHTML = `
    <a class="text-black" href="/${product.brand}/${product.sku}" data-gender="${product.gender}" data-size="${product.size}" data-price="${product.price}">
      ${product.brand} ${product.title}
    </a> 
    <a href="/${product.brand}/${product.sku}">
      <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
    </a>
  `;

    productContainer.appendChild(productElement);
  }
}



/**
 * Function to generate and manage sidebar filters
 * @async
 * @function sideBarGen
 */
const sideBarGen = async () => {
  // Fetch data using axios
  const response = await axios.get('/data');
  // Get sidebar elements
  const sideBarBrandBody = document.querySelector('#brand');
  const sideBarSizeBody = document.querySelector('#sizes');
  const sideBarPriceBody = document.querySelector('#price');
  const sideBarGender = document.querySelector('#gender');

  if (response && response.data) {
    // Create sets to store unique attributes
    const uniqueBrands = new Set();
    const uniqueSizes = new Set();
    const uniquePrices = new Set();
    const uniqueGenders = new Set();

    // Populate sets with unique attributes from data
    for (const product of response.data) {
      uniqueBrands.add(product.brand); // Add brand name to the set
      uniqueSizes.add(product.size) // Add sizes to the set
      uniquePrices.add(product.price) // Add price to the set
      uniqueGenders.add(product.gender) // Add gender to the set
    }

    // Clear the sidebar brand body before appending unique brand elements
    sideBarBrandBody.innerHTML = '';

    // Function to filter products based on user selections
    function getFilteredProducts() {
      // Start with all products
      let filteredProducts = response.data;
    
      // Get active genders
      const activeGenders = Array.from(document.querySelectorAll('.gender-button.active')).map(button => button.getAttribute('data-gender-key'));
      if (activeGenders.length > 0) {
        filteredProducts = filteredProducts.filter(product => activeGenders.includes(product.gender));
        refreshThumbnails();
      }
    
      // Get active brands
      const activeBrands = Array.from(document.querySelectorAll('.barbody.brand-buttons:checked')).map(input => input.id);
      if (activeBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product => activeBrands.includes(product.brand));
        refreshThumbnails();
      }
    
      // Get active sizes
      const activeSizes = Array.from(document.querySelectorAll('.size-button.active')).map(button => button.textContent);
      if (activeSizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => activeSizes.includes(product.size));
        refreshThumbnails();
      }
    
      return filteredProducts;
    }

    // Sort and display genders with predefined order
    const sortedGenders = Array.from(uniqueGenders).sort((a, b) => {
      const genderOrder = ["M", "W", "GS", "TD", "PS", "ALL"];
      const indexA = genderOrder.findIndex(gender => gender.toLowerCase() === a.toLowerCase());
      const indexB = genderOrder.findIndex(gender => gender.toLowerCase() === b.toLowerCase());

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB; // Compare as per the order array
      }

      return 0; // No specific order found, retain original order
    });

    const genderLabelMap = {
      "M": "Men",
      "W": "Women",
      "GS": "GS",
      "TD": "TD",
      "PS": "PS",
      "ALL": "All"
    };

    // Create gender toggle buttons and apply filters
    for (const gender of sortedGenders) {
      const toggleButton = document.createElement('div');
      toggleButton.classList.add('toggle-button', 'gender-button');
      toggleButton.textContent = genderLabelMap[gender.toUpperCase()];

      // Add a data attribute to store the original gender key
      toggleButton.setAttribute('data-gender-key', gender.toLowerCase());

      toggleButton.addEventListener('click', function () {
        this.classList.toggle('active');
        displayFilteredProducts(getFilteredProducts());
        refreshThumbnails();
      });

      sideBarGender.appendChild(toggleButton);
    }





    // Create and display brand filter checkboxes
    for (const brand of uniqueBrands) {
      const brandCheckbox = document.createElement('input');
      brandCheckbox.type = "checkbox";
      brandCheckbox.classList.add('barbody', 'brand-buttons');
      brandCheckbox.id = brand;

      const brandLabel = document.createElement('label');
      brandLabel.setAttribute('for', brand);
      brandLabel.textContent = brand;
      brandLabel.classList.add('barbodylabels');

      const barBodys = document.createElement('div');
      barBodys.appendChild(brandLabel);
      barBodys.appendChild(brandCheckbox);

      brandCheckbox.addEventListener('change', function () {
        const activeBrands = Array.from(document.querySelectorAll('.barbody.brand-buttons')).map(input => input.id);

        let filteredProducts;
        if (activeBrands.length === 0) {
          filteredProducts = response.data; // If no brand checkboxes active, use all data
        } else {
          filteredProducts = response.data.filter(product => activeBrands.includes(product.brand));
        }

        displayFilteredProducts(getFilteredProducts());
        refreshThumbnails();
      });

      sideBarBrandBody.appendChild(barBodys);
    }

    // Sort and display size toggle buttons
    const sortedsizes = Array.from(uniqueSizes).sort((a, b) => {
      const order = ["small", "medium", "large", "XL", "XXL"];
      const indexA = order.findIndex(size => size.toLowerCase() === a.toLowerCase());
      const indexB = order.findIndex(size => size.toLowerCase() === b.toLowerCase());

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB; // Compare as per the order array
      }

      // Handle cases when a or b are not in the order array
      const numA = parseFloat(a);
      const numB = parseFloat(b);

      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB; // Compare as numbers
      }

      if (!isNaN(numA)) {
        return -1; // Numbers come before non-numeric strings
      }

      if (!isNaN(numB)) {
        return 1; // Non-numeric strings come after numbers
      }

      // Handle same types or non-numeric strings
      return String(a).localeCompare(String(b));
    });

    // Create size toggle buttons and apply filters
    for (const size of sortedsizes) {
      const toggleButton = document.createElement('div');
      toggleButton.classList.add('toggle-button', 'size-button');
      toggleButton.textContent = size;
      toggleButton.id = `toggle ${size}`;

      toggleButton.addEventListener('click', function () {
        this.classList.toggle('active');
        displayFilteredProducts(getFilteredProducts());
        refreshThumbnails();
      });

      sideBarSizeBody.appendChild(toggleButton);
    }


    // Define price range filters
    const priceRanges = [{
        label: "$0 - $100",
        test: price => price >= 0 && price <= 100
      },
      {
        label: "$100 - $200",
        test: price => price > 100 && price <= 200
      },
      {
        label: "$200 - $300",
        test: price => price > 200 && price <= 300
      },
      {
        label: "$300 - $400",
        test: price => price > 300 && price <= 400
      },
      {
        label: "$500+",
        test: price => price > 500 && price <= 500
      }
    ];

    // Create price range checkboxes and apply filters
    for (const priceRange of priceRanges) {
      const priceCheckbox = document.createElement('input');
      priceCheckbox.type = "checkbox";
      priceCheckbox.classList.add('pricebodylabels', 'price-buttons');
      priceCheckbox.id = priceRange.label;

      const priceLabel = document.createElement('label');
      priceLabel.setAttribute('for', priceRange.label);
      priceLabel.textContent = priceRange.label;
      priceLabel.classList.add('pricebodylabels');

      const pricebarBodys = document.createElement('div');
      pricebarBodys.appendChild(priceLabel);
      pricebarBodys.appendChild(priceCheckbox);

      priceCheckbox.addEventListener('change', function () {
        const activePriceRanges = Array.from(document.querySelectorAll('.pricebodylabels.price-buttons:checked')).map(input => input.id);

        let filteredProducts;
        if (activePriceRanges.length === 0) {
          filteredProducts = response.data;
        } else {
          filteredProducts = response.data.filter(product => {
            return activePriceRanges.some(rangeLabel => {
              const range = priceRanges.find(range => range.label === rangeLabel);
              return range && range.test(Number(product.price));
            });
          });
        }

        displayFilteredProducts(filteredProducts);
        refreshThumbnails();
      });

      sideBarPriceBody.appendChild(pricebarBodys);
    }

  }

}

/**
 * Function to perform search for items
 * @async
 * @function searchItems
 */
const searchItems = async () => {
  // Fetch product data from the server
  const response = await axios.get('/data');
  const form = document.getElementById("searchform");

  // Attach event listener for search form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get search term from the form input
    var searchTerm = form.querySelector("input[type='search']").value;

    // Filter products based on the search term
    var filteredProducts = response.data.filter(product =>
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Display filtered products
    displayFilteredProducts(filteredProducts);
    refreshThumbnails();
  });
}


/**
 * Function to update the total price in the cart
 * @async
 * @function searchItems
 */
const updateTotal = async() => {
    // Fetch cart items from the server
    const response = await fetch('/api/cart');
    const { cartItems } = await response.json();
    var total = 0;
    // Iterate through cart items to calculate the total price
    var quantityElements = document.querySelectorAll(".cartQuantity");
    quantityElements.forEach(quantityElement => {
        // Calculate total price for each cart item
        var sku = quantityElement.getAttribute('data-sku');
        var item = cartItems.find(item => item.sku === sku);
        var quantity = parseInt(quantityElement.value);
        total += item.price * quantity;
    });
    // Update the total price in the UI
    document.querySelector("#totalPrice").innerText = "$" + total.toFixed(2);
}

window.onload = updateTotal;


let count = localStorage.getItem("cartCount") || 0;


/**
 * Function to manage stock numbers during cart interactions
 * @async
 * @function loadProductTypes
 */
const stockNumbers = async () => {
  // Get necessary DOM elements
  const itemstock = document.getElementById("stock");
  const form = document.getElementById("cartForm");
  const messageContainer = document.getElementById("messageContainer");

  // Attach event listener for cart form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Increment cart count and check stock
    count++;
    const stock = parseInt(itemstock.value);

    if (count <= stock) {
      // Display success message
      messageContainer.textContent = "Item added to cart successfully.";
      form.submit();
    } else {
      // Display error message and disable form
      messageContainer.textContent = "Not enough stock. Please select a lower quantity.";
      form.disabled = true;

      // Clear the count when leaving the page
      window.addEventListener("beforeunload", function() {
        localStorage.removeItem("cartCount");
      });
    }
    // Store the updated count in local storage
    localStorage.setItem("cartCount", count);
  });
};

/**
 * Initializes PayPal checkout.
 * @function paypalCheckout
 */
const paypalCheckout = async () => {
  paypal.Buttons().render('#paypal-buttons-container');

}
