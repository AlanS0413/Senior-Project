
function addProducts(){
    $.ajax({
      url: '/data',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          for (var i = 0; i < data.length; i++) {
              const item = data[i];
          }
      },
      error: function(xhr, status, error) {
        console.log(data)
        console.error('Error fetching data:', error);
      }
    });
}

const loadProducts = async () =>{
    const response = await axios.get('/data');
    const ubody = document.querySelector('ul#producttable')
    if (response && response.data){
        for(const product of response.data){
        const ubodyli = document.createElement('li');
        ubodyli.innerHTML = `
          <li> <a class ="text-black" href="${product.brand}/${product.sku}"> ${product.brand} ${product.title}</a> <a href="${product.brand}/${product.sku}">
          <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
          </a></li>
          `;
          ubody.appendChild(ubodyli)
        }
        const dropdowns = document.querySelectorAll("a.nav-link")
        dropdowns.forEach((dropdown) => {
          dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('show');
            if (dropdown.classList.contains('show')) {
              dropdown.nextElementSibling.classList.add('show');
            }
            else {
              dropdown.nextElementSibling.classList.remove('show');
            }
        })})
    }
  addProducts()
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
    console.log(brandProducts, "Brand products")
    for (const product of brandProducts) {
      const ubodyli = document.createElement('li');
      ubodyli.innerHTML = `
        <li> <a class ="text-black" href="/${product.brand}/${product.sku}"> ${product.brand} ${product.title}</a> <a href="/${product.brand}/${product.sku}">
        <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
        </a></li>
        `;
      ubody.appendChild(ubodyli);
    }
  }

  addProducts();
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
        <li>
          <a class="text-black" href="/${product.brand}/${product.sku}">${product.brand} ${product.title}</a>
          <a href="/${product.brand}/${product.sku}">
            <img class="center-img thumbnails" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
          </a>
        </li>`;
      ubody.appendChild(ubodyli);
    }
    if (brandTypeofProducts.length === 0) {
      const errorMessage = `<li>Check Back Soon!</li><br><button class='btn btn-outline-success' onclick="location.href='/'">Go Home</button>`;
      ubody.innerHTML += errorMessage;
      return;
    }
  }

  addProducts();
};


const sideBarGen = async () => {
  const response = await axios.get('/data');

  const sideBarBrandBody = document.querySelector('#brand');
  const sideBarSizeBody = document.querySelector('#sizes');
  const sideBarPriceBody = document.querySelector('#price');
  const sideBarGender = document.querySelector('#gender');

  if (response && response.data){
    const uniqueBrands = new Set(); // Create a set to store unique brand names
    const uniqueSizes = new Set();
    const uniquePrices = new Set();
    const uniqueGenders = new Set();

    for (const product of response.data) {
      uniqueBrands.add(product.brand.toLowerCase()); // Add brand name to the set (in lowercase)
      uniqueSizes.add(product.size)// Add sizes to the set
      uniquePrices.add(product.price)// Add price to the set
      uniqueGenders.add(product.gender)// Add gender to the set
    }

    // Clear the sidebar brand body before appending unique brand elements
    sideBarBrandBody.innerHTML = '';

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
      toggleButton.classList.add('toggle-button');
      toggleButton.textContent = genderLabelMap[gender.toUpperCase()];

      toggleButton.addEventListener('click', function() {
        this.classList.toggle('active');
      });

      sideBarGender.appendChild(toggleButton);
    }

    // Append unique brand elements to the sidebar brand body
    for (const brand of uniqueBrands) {
      const barBodys = document.createElement('accordion-button');
      barBodys.innerHTML = `
          <label class = "barbodylabels" for = "${brand}"> ${brand} </label>
          <input class="barbody text-black" type="checkbox" value="" id = "${brand}" ></button>`;
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
      toggleButton.classList.add('toggle-button');
      toggleButton.textContent = size;
      toggleButton.id = `toggle ${size}`;

      toggleButton.addEventListener('click', function() {
        this.classList.toggle('active');
        console.log(toggleButton, "size button")
        const activeToggleButtons = Array.from(document.querySelectorAll('.toggle-button.active'));
        const activeSizes = activeToggleButtons.map(button => button.textContent);
        const filteredSizeData = response.data.filter(product => activeSizes.includes(product.size));
        console.log(filteredSizeData, "products")
        return filteredSizeData
      });

      sideBarSizeBody.appendChild(toggleButton);
    }
      const barBodys = document.createElement('accordion-button');
      barBodys.innerHTML = `
          <label class = "pricebodylabels" for = "0-100"> 0$ - 100$ </label>
          <input class="pricebodylabels text-black" type="checkbox" value="" id = "0-100" ></button>
          <label class = "pricebodylabels" for = "100-200"> 100$ - 200$ </label>
          <input class="pricebodylabels text-black" type="checkbox" value="" id = "100-200" ></button>
          <label class = "pricebodylabels" for = "300-400"> 300$ - 400$ </label>
          <input class="pricebodylabels text-black" type="checkbox" value="" id = "300-400" ></button>
          <br>
          <label class = "pricebodylabels" for = "500+"> 500$+ </label>
          <input class="pricebodylabels text-black" type="checkbox" value="" id = "500+" ></button>
          `;
      sideBarPriceBody.appendChild(barBodys);

  }
}




