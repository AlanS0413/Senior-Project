"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('dotenv').config();

var Database = require('dbcmps369');

var bcrypt = require('bcryptjs');

var ProductDB =
/*#__PURE__*/
function () {
  function ProductDB() {
    _classCallCheck(this, ProductDB);

    this.db = new Database();
  }

  _createClass(ProductDB, [{
    key: "initialize",
    value: function initialize() {
      var user, salt, hash;
      return regeneratorRuntime.async(function initialize$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.db.connect());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(this.db.schema('Products', [{
                name: 'id',
                type: 'INTEGER'
              }, {
                name: 'brand',
                type: 'TEXT'
              }, {
                name: 'title',
                type: 'TEXT'
              }, {
                name: 'price',
                type: 'TEXT'
              }, {
                name: 'sku',
                type: 'INTEGER'
              }, {
                name: 'size',
                type: 'TEXT'
              }, {
                name: 'stock',
                type: 'TEXT'
              }, {
                name: 'condition',
                type: 'TEXT'
              }, {
                name: 'instock',
                type: 'BOOLEAN'
              }, {
                name: 'outofstock',
                type: 'BOOLEAN'
              }], 'id'));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(this.db.schema('Users', [{
                name: 'id',
                type: 'INTEGER'
              }, {
                name: 'first',
                type: 'TEXT'
              }, {
                name: 'last',
                type: 'TEXT'
              }, {
                name: 'username',
                type: 'TEXT'
              }, {
                name: 'password',
                type: 'TEXT'
              }], 'id'));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(this.db.schema('Admin', [{
                name: 'id',
                type: 'INTEGER'
              }, {
                name: 'first',
                type: 'TEXT'
              }, {
                name: 'last',
                type: 'TEXT'
              }, {
                name: 'username',
                type: 'TEXT'
              }, {
                name: 'password',
                type: 'TEXT'
              }], 'id'));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(this.db.read('Admin', [{
                column: 'username',
                value: 'cmps450'
              }]));

            case 10:
              user = _context.sent;

              if (!(user.length === 0)) {
                _context.next = 21;
                break;
              }

              _context.next = 14;
              return regeneratorRuntime.awrap(bcrypt.genSalt(10));

            case 14:
              salt = _context.sent;
              _context.next = 17;
              return regeneratorRuntime.awrap(bcrypt.hash('rcnj', salt));

            case 17:
              hash = _context.sent;
              _context.next = 20;
              return regeneratorRuntime.awrap(this.db.create('Admin', [{
                column: 'first',
                value: 'admin'
              }, {
                column: 'last',
                value: 'admin'
              }, {
                column: 'username',
                value: 'cmps450'
              }, {
                column: 'password',
                value: hash
              }]));

            case 20:
              console.log('User created with username cmps450 and password rcnj');

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createUser",
    value: function createUser(first, last, username, password) {
      var id;
      return regeneratorRuntime.async(function createUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.db.create('Users', [{
                column: 'first',
                value: first
              }, {
                column: 'last',
                value: last
              }, {
                column: 'username',
                value: username
              }, {
                column: 'password',
                value: password
              }]));

            case 2:
              id = _context2.sent;
              return _context2.abrupt("return", id);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addProduct",
    value: function addProduct(brand, title, price, sku, size, stock, condition, instock, outofstock) {
      var id;
      return regeneratorRuntime.async(function addProduct$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.db.create('Products', [{
                column: 'brand',
                value: brand
              }, {
                column: 'title',
                value: title
              }, {
                column: 'price',
                value: price
              }, {
                column: 'sku',
                value: sku
              }, {
                column: 'size',
                value: size
              }, {
                column: 'stock',
                value: stock
              }, {
                column: 'condition',
                value: condition
              }, {
                column: 'instock',
                value: instock
              }, {
                column: 'outofstock',
                value: outofstock
              }], 'id'));

            case 2:
              id = _context3.sent;
              return _context3.abrupt("return", id);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUserByUserName",
    value: function findUserByUserName(username) {
      var us;
      return regeneratorRuntime.async(function findUserByUserName$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.db.read('Users', [{
                column: 'username',
                value: username
              }]));

            case 2:
              us = _context4.sent;

              if (!(us.length > 0)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", us[0]);

            case 7:
              return _context4.abrupt("return", undefined);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findAdminByUsername",
    value: function findAdminByUsername(username) {
      var us;
      return regeneratorRuntime.async(function findAdminByUsername$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.db.read('Admin', [{
                column: 'username',
                value: username
              }]));

            case 2:
              us = _context5.sent;

              if (!(us.length > 0)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", us[0]);

            case 7:
              return _context5.abrupt("return", undefined);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findrcnjUser",
    value: function findrcnjUser(user_Id) {
      var defaltUser;
      return regeneratorRuntime.async(function findrcnjUser$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.db.read('Admin', [{
                column: 'username',
                value: 'cmps450'
              }, {
                column: 'password',
                value: 'rcnj'
              }], {
                column: 'id',
                value: user_Id
              }));

            case 2:
              defaltUser = _context6.sent;

              if (!(defaltUser.lenght > [])) {
                _context6.next = 9;
                break;
              }

              _context6.next = 6;
              return regeneratorRuntime.awrap(this.db.createUser('admin', 'admin', 'cmps450', 'rcnj'));

            case 6:
              creatercnj = _context6.sent;
              _context6.next = 10;
              break;

            case 9:
              return _context6.abrupt("return", undefined);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ProductDB;
}();

module.exports = ProductDB;