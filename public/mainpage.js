function addProducts() {
  $.ajax({
    url: '/data',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        const item = data[i];
      }
    },
    error: function (xhr, status, error) {
      console.error('Error fetching data:', error);
    }
  });
}

function refreshThumbnails() {
  jQuery('img.center-img.thumbnails').nailthumb({
    width: 335,
    height: 185,
    method: 'resize'
  });
}

const loadProducts = async () => {
  const response = await axios.get('/data');
  const ubody = document.querySelector('ul#producttable')
  if (response && response.data) {
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
    const dropdowns = document.querySelectorAll("a.nav-link")
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('show');
        if (dropdown.classList.contains('show')) {
          dropdown.nextElementSibling.classList.add('show');
        } else {
          dropdown.nextElementSibling.classList.remove('show');
        }
      })
    })
  }
  addProducts()
  refreshThumbnails();
}

const loadBrandProducts = async () => {
  // Extract the brand from the URL
  const brand = window.location.pathname.split('/')[1].toLowerCase();
  // Request all product data
  const response = await axios.get('/data');

  const ubody = document.querySelector('ul#brandproducttable');

  if (response && response.data) {
    // Filter products by the specific brand
    const brandProducts = response.data.filter(product => product.brand.toLowerCase() === brand);
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

  addProducts();
  refreshThumbnails();
}

const loadProductTypes = async () => {
  // Extract the brand from the URL
  const brand = window.location.pathname.split('/')[2].toLowerCase();
  const typeofItem = window.location.pathname.split('/')[1].toLowerCase();
  const firstLetter = typeofItem.charAt(0);

  // Request all product data
  const response = await axios.get('/data');

  const ubody = document.querySelector('ul#brandtypetable');

  if (response && response.data) {
    // Filter products by the specific brand
    const brandProducts = response.data.filter(product => product.brand.toLowerCase() === brand);
    const brandTypeofProducts = brandProducts.filter(product => product.itemtype.toLowerCase() === firstLetter);

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
      const errorMessage = `<li>Check Back Soon!</li><br><button class='btn btn-outline-success' onclick="location.href='/'">Go Home</button>`;
      ubody.innerHTML += errorMessage;
      return;
    }
  }

  addProducts();
  refreshThumbnails();
};

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




const sideBarGen = async () => {
  const response = await axios.get('/data');

  const sideBarBrandBody = document.querySelector('#brand');
  const sideBarSizeBody = document.querySelector('#sizes');
  const sideBarPriceBody = document.querySelector('#price');
  const sideBarGender = document.querySelector('#gender');

  if (response && response.data) {
    const uniqueBrands = new Set(); // Create a set to store unique brand names
    const uniqueSizes = new Set();
    const uniquePrices = new Set();
    const uniqueGenders = new Set();

    for (const product of response.data) {
      uniqueBrands.add(product.brand); // Add brand name to the set
      uniqueSizes.add(product.size) // Add sizes to the set
      uniquePrices.add(product.price) // Add price to the set
      uniqueGenders.add(product.gender) // Add gender to the set
    }

    // Clear the sidebar brand body before appending unique brand elements
    sideBarBrandBody.innerHTML = '';

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





    // Append unique brand elements to the sidebar brand body
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

const searchItems = async () => {
  const response = await axios.get('/data');
  const form = document.getElementById("searchform");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var searchTerm = form.querySelector("input[type='search']").value;

    var filteredProducts = response.data.filter(product =>
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    displayFilteredProducts(filteredProducts);
    refreshThumbnails();
  });
}

const updateTotal = async() => {
    const response = await fetch('/api/cart');
    const { cartItems } = await response.json();
    var total = 0;
    var quantityElements = document.querySelectorAll(".cartQuantity");
    quantityElements.forEach(quantityElement => {
        var sku = quantityElement.getAttribute('data-sku');
        var item = cartItems.find(item => item.sku === sku);
        var quantity = parseInt(quantityElement.value);
        total += item.price * quantity;
    });
    document.querySelector("#totalPrice").innerText = "$" + total.toFixed(2);
}

window.onload = updateTotal;


let count = localStorage.getItem("cartCount") || 0;

const stockNumbers = async () => {
  const itemstock = document.getElementById("stock");
  const form = document.getElementById("cartForm");
  const messageContainer = document.getElementById("messageContainer");
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    count++;
    const stock = parseInt(itemstock.value);

    if (count <= stock) {
      // Display success message
      messageContainer.textContent = "Item added to cart successfully.";
      form.submit();
    } else {
      // Display error message
      messageContainer.textContent = "Not enough stock. Please select a lower quantity.";
      form.disabled = true;
      window.addEventListener("beforeunload", function() {
        localStorage.removeItem("cartCount"); // Clear the count when leaving the page
      });
    }
    localStorage.setItem("cartCount", count); // Store the updated count in local storage
  });
};

const paypalCheckout = async () => {
  paypal.Buttons().render('#paypal-buttons-container');

}
