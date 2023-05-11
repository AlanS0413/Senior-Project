const express = require('express')
const router = express.Router();
const AWS = require('aws-sdk');
const ProductDB = require('C:\\Users\\Alan\\Documents\\School\\Senior Project\\database.js');
const db = new ProductDB();


router.get('/', async (req, res) => {
    const brands = ['Jordan', 'Yeezy', 'Nike', 'Supreme', 'Sp5der'];
    const product_brands = await req.db.findByBrands(brands);
    const productsByBrand = await req.db.findAllProducts();

    res.render('homepage', {
        title: 'Homepage',
        show_login: true,
        at_Home: true,
        product_brands,productsByBrand,
        getS3ImageUrl: filename => {
            const s3 = new AWS.S3({
                accessKeyId: 'AKIATS4FQMQJ2PPI3N5X',
                secretAccessKey: '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',
                region: 'us-east-1'
            });
            const bucketName = 'seniorprojectcmps450';
            const objectKey = `images/${filename}`;

            const params = {
              Bucket: bucketName,
              Key: objectKey,
            };

            return s3.getSignedUrl('getObject', params);
        }
    });
});

module.exports = router;