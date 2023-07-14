require('dotenv').config()
const Database = require('dbcmps369')
const bcrypt = require('bcryptjs');

class ProductDB{
    constructor(){
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect()

        await this.db.schema('Products', [
            {name: 'id', type: 'INTEGER'},
            {name: 'brand', type: 'TEXT'},
            {name: 'title', type: 'TEXT'},
            {name: 'price', type: 'TEXT'},
            {name: 'sku', type: 'INTEGER'},
            {name: 'size', type: 'TEXT'},
            {name: 'gender', type: 'TEXT'},
            {name: 'stock', type: 'INTEGER'},
            {name: 'itemtype', type: 'TEXT'},
            {name: 'condition', type: 'TEXT'}
        ], 'id')

        await this.db.schema('Cart', [
            {name: 'id', type: 'INTEGER'},
            {name: 'cart_id', type: 'INTEGER'},
            {name: 'product', type: 'TEXT'},
            {name: 'quantity', type: 'INTEGER'},
            {name: 'size', type: 'INTEGER'},
            {name: 'price', type: 'INTEGER'},
            {name: 'sku', type: 'INTEGER'},
            {name: 'brand', type: 'TEXT'},
            {name: 'stock', type: 'INTEGER'}
        ], 'id')

        await this.db.schema('Users', [
            {name: 'id', type: 'INTEGER'},
            {name: 'first', type: 'TEXT'},
            {name: 'last', type: 'TEXT'},
            {name: 'username', type: 'TEXT'},
            {name: 'password', type: 'TEXT'},
        ], 'id');

        await this.db.schema('Admin', [
            {name: 'id', type: 'INTEGER'},
            {name: 'first', type: 'TEXT'},
            {name: 'last', type: 'TEXT'},
            {name: 'username', type: 'TEXT'},
            {name: 'password', type: 'TEXT'},
        ], 'id');

        const user = await this.db.read('Admin', [{ column: 'username', value: 'cmps450' }]);
        if (user.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('rcnj', salt);
            await this.db.create('Admin',[{column: 'first', value: 'admin'}, {column: 'last', value: 'admin'}, {column:'username', value: 'cmps450'}, {column: 'password', value: hash}]);
            console.log('User created with username cmps450 and password rcnj')
        }


    }

    async createUser(first, last, username, password) {
        const id = await this.db.create('Users', [
            { column: 'first', value: first },
            { column: 'last', value: last },
            { column: 'username', value: username },
            { column: 'password', value: password },
        ])
        return id;
    }

    async addProduct(brand, title, price, sku, size, stock, itemtype, condition, gender) {
        const id = await this.db.create('Products', [
            {column: 'brand', value: brand},
            {column: 'title', value: title},
            {column: 'price', value: price},
            {column: 'sku', value: sku},
            {column: 'size', value: size},
            {column: 'gender', value: gender},
            {column: 'stock', value: stock},
            {column: 'itemtype', value: itemtype},
            {column: 'condition', value: condition}
        ], 'id')
        return id;
    }

    async findProductBySku(sku){
        const sku_id = await this.db.read('Products', [{column: 'sku', value: sku}]);
        if (sku_id.length > 0) return sku_id[0];
        else {
            return undefined;
        }
    }

    async findProductByBrandAndType(brand, itemtype) {
        const brand_id = await this.db.read('Products', [{column: 'brand', value: brand}]);
        const type_id = await this.db.read('Products', [{column: 'itemtype', value: itemtype}]);
        if (brand_id.length > 0 ){
            if (type_id.length > 0){
                return brand_id;
            }
        }
    }

    async findAllProducts() {
        const products = await this.db.read('Products', []);
        return products;
    }

    async findByBrands(brand) {
        const brands_id = await this.db.readNonDupes('Products', [{ column: 'brand', value: brand }]);
        return brands_id;
    }

    async findBySize(size) {
        const size_id = await this.db.readNonDupes('Products', [{ column: 'size', value: size }]);
        return size_id;
    }

    async findByGender(gender) {
        const gender_id = await this.db.readNonDupes('Products', [{ column: 'gender', value: gender }]);
        return gender_id;
    }

    async findByPrice(price) {
        const price_id = await this.db.readNonDupes('Products', [{ column: 'price', value: price }]);
        return price_id;
    }

    async findUserByUserName(username) {
        const us = await this.db.read('Users', [{ column: 'username', value: username }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findAdminByUsername(username) {
        const us = await this.db.read('Admin', [{ column: 'username', value: username }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findrcnjUser(user_Id){
        const defaltUser = await this.db.read('Admin', [{ column: 'username', value: 'cmps450' }, { column: 'password', value: 'rcnj' }], {column: 'id', value: user_Id});
        if(defaltUser.lenght > [])
            creatercnj = await this.db.createUser('admin', 'admin', 'cmps450', 'rcnj');
            else
                return undefined;
    }

    async addToCart(cart_id, product, quantity, size, price, sku, brand, stock) {
        const id = await this.db.create('Cart',[
            {column: 'cart_id', value: cart_id},
            {column: 'product', value: product},
            {column: 'quantity', value: quantity},
            {column: 'size', value: size},
            {column: 'price', value: price},
            {column: 'sku', value: sku},
            {column: 'brand', value: brand},
            {column: 'stock', value: stock},
        ], 'id');
        return id;
    }

    async getCartItems(cart_id) {
        const cart = await this.db.read('Cart', [{column: 'cart_id', value: cart_id}])

        return cart;
    }

    async getItemFromCart(cart_id, product) {
        const cart = await this.db.read('Cart', [{column: 'cart_id', value: cart_id},{column: 'product', value: product}])
        return cart;
    }

    async updateItemQuantity(cart_id,product, quantity) {
        const cart = await this.db.read('Cart', [{column: 'cart_id', value: cart_id}, {column: 'product', value: product}, {column: 'quantity', value: quantity}])
        return cart;
    }

    // async updateProductStock(sku, size, quantity) {
    //     try {
    //         // Find existing product by SKU and size
    //         let product = await this.db.query('SELECT * FROM Products WHERE sku = ? AND size = ?', [sku, size]);
    
    //         // If product exists, update the stock
    //         if (product.length > 0) {
    //             let newStock = product[0].stock - quantity;
    //             await this.db.query('UPDATE Products SET stock = ? WHERE sku = ? AND size = ?', [newStock, sku, size]);
    //         } else {
    //             // If product doesn't exist, you may want to handle this situation. 
    //             // For example, you can throw an error or create a new product entry.
    //         }
    //         // Commit transaction if everything is fine
    //         await this.db.commit();
    //     } catch (error) {
    //         // If anything goes wrong, rollback the transaction
    //         throw error;
    //     }
    // }


}

module.exports = ProductDB;