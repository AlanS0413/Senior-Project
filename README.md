# Senior Project

This is a full website that allows purchasing and inventory managment.
It's AWS bucket intergrated for pictures and is written in PUG and JS.


## Table of Contents

- [Installation](#installation) This walks the user through the installation process to get ready to use the website for the first time.
- [Usage](#usage) This explains basic usage of the admin and user features of the webstie.
- [Documentation](#documentation) This is a fully compiled folder of documentation for all the files included in this project.
- [Index of Folders](#index-of-folders) This describes the code each folder holds for the website.

## Installation

To get the project up and running you can clone the repo and run npm install with the package.json in the main directory.

# Clone this repository
git clone https://github.com/AlanS0413/Senior-Project.git

# Go into the repository
cd Senior-Project

# Install dependencies
npm install

## Usage

To use the inventory manager you need to be logged in as an admin.
The admin username and password is available via the console.log or in the database.js notes
Other than that the website is fully useable as a guest or you can create a username and password to carry out purchases or view items in stock.

# Example usage
npm start

## Index of Folders

- [Source Code](/): The source code of the application.
- [Front-End Js Code](/public/): The front-end source code of the application.
- [Pug Back-End Code](/views/): The back-end HTML generated code of the application.
- [ExpressJs Routes](/routes/): The source code of the ExpressJs routes.
- [Assets](/public/styles/): Fonts and other assets used in the project.


## Index of Files
- [/](/) This is the root directory that holds the package.json, index.js, and database.js
- [index.js](/index.js) This is the index or entry point of the app and holds all the routes
- [database.js](/database.js) This is the database wrapper I built to interact with the database file.
- [routes] This is the routes folder which holds all the exress routes.
- [routes/account.js](/routes/account.js) This is the accounts route that handles signing up and signing in for new and existing users.
- [routes/addproduct.js](/routes/addproduct.js) This is the addproduct route that handles the inventory adding to display on the webpage. Also only available to Admin users.
- [routes/allproduct.js](/routes/allproducts.js)This is the allproducts route that handles displaying all available products to the user.
- [routes/brandaccessories.js](/routes/brandaccessories.js) This is the brandaccessories route that handles displaying specific brand accessories to the user.
- [routes/brandclothing.js](/routes/brandclothing.js) This is the brandclothing route that handles displaying specific brand clothing to the user.
- [routes/brandfootwear.js](/routes/brandfootwear.js) This is the brandfootwear route that handles displaying specific brand footwear to the user.
- [routes/brands.js](/routes/brands.js) This is the brands route that handles displaying specific brands to the user.
- [routes/cart.js](/routes/cart.js) This is the cart route that handles the cart for that specific users session.
- [routes/checkoutsuccess.js](/routes/checkoutsuccess.js) This is the checkout success route that displays the checkout info that took place for that user session.
- [routes/logout.js](/routes/logout.js) This is the logout route which handles when a user logs out of thier account.
- [routes/productinfo.js](/routes/productinfo.js) This is the product info route and displays the info of a selected product to a use when they select a product.
- [routes/startup.js](/routes/startup.js) This is the startup route and this is the main page the user is directed to when visiting this webpage.
- [views] This is the views folder that holds all the PUG files for this project.
- [views/account.pug](/views/account.pug) This is the account pug file and it generates the HTML for the account page.
- [views/addproduct.pug](/views/addproduct.pug) This is the addproduct pug file and it generates the HTML for the addproduct page.
- [views/allproduct.pug](/views/allproducts.pug) This is the allproduct pug file and it generates the HTML for the allproduct page.
- [views/brandproducts.pug](/views/brandproducts.pug) This is the brandproducts pug file and it generates the HTML for the brandproducts page.
- [views/brandtypes.pug](/views/brandtypes.pug) This is the brandtypes pug file and it generates the HTML for the brandtypes page.
- [views/cart.pug](/views/cart.pug) This is the cart pug file and it generates the HTML for the cart page.
- [views/checkoutsuccess.pug](/views/checkoutsuccess.pug) This is the checkoutsuccess pug file and it generates the HTML for the checkoutsuccess page.
- [views/homepage.pug](/views/homepage.pug) This is the homepage pug file and it generates the HTML for the homepage page.
- [views/layout.pug](/views/layout.pug) This is the layout pug file and it generates the HTML for the layout that is carried across all the pug files.
- [views/productinfo.pug](/views/productinfo.pug) This is the productinfo pug file and it generates the HTML for the productinfo page.
- [views/signup.pug](/views/signup.pug) This is the signup pug file and it generates the HTML for the signup page.
- [public] This is the public folder and has the CSS and Front-End JS in it
- [public/cart.js](/public/cart.js) This is the front-end code for the cart handles adding the correct amount to charge a customer based on items and adjusting quantites in the cart.
- [public/mainpage.js](/public/mainpage.js) This is the mainpage.js and this is all of the front-end functions that run accross all of the pages in the project.  
- [public/jquery.nailthumb.js](/public/jquery.nailthumb.1.1.js) This is the jquery for adjusting the size of the images for each page that displays thumbnails of products.
- [public/styles] This is the folder that holds all the CSS for this project.
- [styles/style.css](/public/styles/style.css) This is the main CSS folder and has all of the CSS for the entire project.
- [styles/jquery.nailthumb.css](/public/styles/jquery.nailthumb.1.1.css) This is the jQuery css for the nailthumb adjustments.

## Documentation

My documentation was generated with JSDoc and PUG-Doc I ran into some issues with PUG-Doc but, found a way to fix them to get the documentation to generate nicely.

# Documentation index
## Node JS / JS Documentation
- [Index](/Documentation/index.html)
- [Startup](/Documentation/startup.js.html)
- [All Products](/Documentation/allproducts.html)
- [Account](/Documentation/account.js.html)
- [Inventory Managment](/Documentation/addproduct.js.html)
- [Brand Specific Accessories](/Documentation/brandaccessories.js.html)
- [Brand Specific Clothing](/Documentation/brandclothing.js.html)
- [Brand Specific Footwear](/Documentation/brandfootwear.js.html)
- [Brand Specific](/Documentation/brands.js.html)
- [Cart](/Documentation/cart.js.html)
- [Checkout Success](/Documentation/checkoutsuccess.js.html)
- [Database](/Documentation/database.js.html)
- [Logout](/Documentation/logout.js.html)
- [Front-end](/Documentation/mainpage.js.html)
- [Product Info](/Documentation/productinfo.js.html)
- [Accounts Express Route](/Documentation/module-accountRouter.html)
- [Add Product Express Route](/Documentation/module-addProductRouter.html")
- [All Products Express Route](/Documentation/module-allProductsRouter.html)
- [Brand Specific Accessories Express Route](/Documentation/module-brandAccessoriesRouter.html)
- [Brand Specific Clothing Express Route](/Documentation/module-brandClothingRouter.html)
- [Brand Specific Footwear Express Route](/Documentation/module-brandFootwearRouter.html)
- [Brand Specific Products Express Route](/Documentation/module-brandProductsRouter.html)
- [Cart Express Route](/Documentation/module-cartRouter.html)
- [Cart Front-End Script](/Documentation/module-cartScript.html)
- [Database Module](/Documentation/module-database.html)

## PUG Documentation
- [Homepage](/Documentation/homepagepug.html)
- [Add Product](/Documentation/addproductpug.html)
- [Account](/Documentation/accountpug.html)
- [All Products](/Documentation/allproductspug.html)
- [Brand Specific Products](/Documentation/brandproductspug.html)
- [Brand Specific Types](/Documentation/brandtypespug.html)
- [Cart](/Documentation/cartpug.html)
- [Checkout Success](/Documentation/checkoutsuccesspug.html)
- [Layout](/Documentation/layoutpug.html)
- [Product Info](/Documentation/productinfopug.html)
- [Sign Up](/Documentation/signuppug.html)


