
function addProducts(){
    $.ajax({
      url: '/data',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          for (var i = 0; i < data.length; i++) {
              const item = data[i];
          }
        console.log(data,"Success")
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
          <li> <a class ="text-black" href="${product.sku}"> ${product.brand} ${product.title}</a> <a href="${product.sku}">
          <img class="center-img thumbnails" style="position: center" alt="${product.brand} ${product.title}" src="https://seniorprojectcmps450.s3.amazonaws.com/images/${product.sku}">
          </a></li>
          `;
          ubody.appendChild(ubodyli)
        }
    }
  addProducts()
}