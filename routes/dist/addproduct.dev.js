"use strict";

var express = require('express');

var router = express.Router();

var fs = require('fs');

var util = require('util');

var parse = require('csv-parse');

router.get('/addproduct', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('addproduct', {
            title: 'Inventory Management',
            show_login: true,
            at_Home: false
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/addproduct', function _callee2(req, res) {
  var pbrand, ptitle, pprice, psku, psize, pstock, pcondition, pinstock, poos, parseCsv, parseCsvAsync, buffer, records, db, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, record, newProduct, _newProduct;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pbrand = req.body.brand;
          ptitle = req.body.title;
          pprice = req.body.price;
          psku = req.body.sku;
          psize = req.body.size;
          pstock = req.body.stock;
          pcondition = req.body.condition;
          pinstock = req.body.instock !== undefined;
          poos = req.body.outofstock !== undefined;

          parseCsv = function parseCsv(csvData, options) {
            return new Promise(function (resolve, reject) {
              parse(csvData, options, function (err, data) {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              });
            });
          };

          parseCsvAsync = util.promisify(parseCsv);
          console.log(req.files, "files");

          if (!(req.files && req.files.csvFile)) {
            _context2.next = 48;
            break;
          }

          // CSV file was uploaded
          buffer = req.files.csvFile.data;
          _context2.next = 16;
          return regeneratorRuntime.awrap(parseCsvAsync(buffer));

        case 16:
          records = _context2.sent;
          console.log(records, "records");
          db = req.db;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 22;
          _iterator = records[Symbol.iterator]();

        case 24:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 32;
            break;
          }

          record = _step.value;
          _context2.next = 28;
          return regeneratorRuntime.awrap(db.addProduct(record.brand, record.title, record.price, record.sku, record.size, record.stock, record.condition, record.instock !== undefined, record.outofstock !== undefined));

        case 28:
          newProduct = _context2.sent;

        case 29:
          _iteratorNormalCompletion = true;
          _context2.next = 24;
          break;

        case 32:
          _context2.next = 38;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](22);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 38:
          _context2.prev = 38;
          _context2.prev = 39;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 41:
          _context2.prev = 41;

          if (!_didIteratorError) {
            _context2.next = 44;
            break;
          }

          throw _iteratorError;

        case 44:
          return _context2.finish(41);

        case 45:
          return _context2.finish(38);

        case 46:
          _context2.next = 51;
          break;

        case 48:
          _context2.next = 50;
          return regeneratorRuntime.awrap(req.db.addProduct(pbrand, ptitle, pprice, psku, psize, pstock, pcondition, pinstock, poos));

        case 50:
          _newProduct = _context2.sent;

        case 51:
          res.redirect('/addproduct');

        case 52:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[22, 34, 38, 46], [39,, 41, 45]]);
});
router.post('/product/:id/delete', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(req.db.deleteProduct(req.params.id));

        case 2:
          res.redirect('/');

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;