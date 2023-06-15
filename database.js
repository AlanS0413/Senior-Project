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
            {name: 'stock', type: 'TEXT'},
            {name: 'itemtype', type: 'TEXT'},
            {name: 'condition', type: 'TEXT'}
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


}

module.exports = ProductDB;