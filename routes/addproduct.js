const express = require('express')
const router = express.Router();
const fs = require('fs');
const util = require('util');
const parse = require('csv-parse');
const multer = require('multer');
const fastcsv = require("fast-csv");
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIATS4FQMQJ2PPI3N5X',
  secretAccessKey: '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',
  region: 'us-east-1'
});

function getS3ImageUrl(filename) {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
    const bucketName = 'seniorprojectcmps450'; // replace with your actual bucket name
    const objectKey = `images/${filename}`; // assuming your images are stored in a folder named 'images'

    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    return s3.getSignedUrl('getObject', params);
}

const upload = multer({ storage: multer.memoryStorage() });
router.get('/addproduct', async (req, res) => {
    res.render('addproduct', { title: 'Inventory Management', show_login: true, at_Home: false});
});

const adminLogin = (req, res, next) =>
{
    if(req.session.Admin){
        next();
    }
    else{
        res.status(401).send('Not authorized');
    }
}


router.post('/addproduct', adminLogin, upload.single('csvFile'), async (req, res) => {
    try {
        const db = req.db;
        const csvData = [];

        if (req.file) {
            const csvStream = fastcsv.parse({ headers: true })
                .on("data", function (data) {
                    csvData.push(data);
                })
                .on("end", async function () {
                    for (const record of csvData) {
                        const newProduct = await db.addProduct(
                            record.brand,
                            record.title,
                            record.price,
                            record.sku,
                            record.size,
                            record.stock,
                            record.itemtype,
                            record.condition,
                            record.gender
                        );
                    }
                    res.redirect('/addproduct');
                });
            csvStream.write(req.file.buffer);
            csvStream.end();
        } else {
            const pbrand = req.body.brand;
            const ptitle = req.body.title;
            const pprice = req.body.price;
            const psku = req.body.sku;
            const psize = req.body.size;
            const pstock = req.body.stock;
            const pitemtype = req.body.itemtype;
            const pcondition = req.body.condition;
            const pgender = req.body.gender;

            csvData.push({
                brand: pbrand,
                title: ptitle,
                price: pprice,
                sku: psku,
                size: psize,
                stock: pstock,
                type: pitemtype,
                condition: pcondition,
                gender: pgender
            });
            for (const record of csvData) {
                const newProduct = await db.addProduct(
                    record.brand,
                    record.title,
                    record.price,
                    record.sku,
                    record.size,
                    record.stock,
                    record.itemtype,
                    record.condition,
                    record.gender
                );
            }
            res.redirect('/addproduct');
        }
    } catch (err) {
        console.error(err);
        res.render('addproduct', { message: err.message });
    }
});


router.post('/product/:id/delete', async (req, res) => {
    await req.db.deleteProduct(req.params.id);
    res.redirect('/');
});

module.exports = router;