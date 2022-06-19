const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const Product = require('./model');
const path = require('path');
const fs = require('fs');

router.get('/product', (req, res) => {
    Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error));
});

router.get('/product/:id', (req, res) => {
    const { id } = req.params;
    Product.findOne({_id: id})
        .then(result => res.send(result))
        .catch(error => res.send(error));
});

router.post('/product', upload.single('image_url'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image_url = req.file;
    if (image_url) {
        const target = path.join(__dirname, '../../uploads', image_url.originalname);
        fs.renameSync(image_url.path, target);
        Product.create({name, price, stock, status, image_url: `http://localhost:3000/public/${image_url.originalname}`})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
});

router.put('/product/:id', upload.single('image_url'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image_url = req.file;
    const { id } = req.params;
    if (image_url) {
        const target = path.join(__dirname, '../../uploads', image_url.originalname);
        fs.renameSync(image_url.path, target);
        Product.updateOne({_id: id}, {$set: {name, price, stock, status, image_url: `http://localhost:3000/public/${image_url.originalname}`}})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    } else {
        Product.updateOne({_id: id}, {$set: {name, price, stock, status}})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
});

router.delete('/product/:id', upload.single('image_url'), (req, res) => {
    const { id } = req.params;
    Product.deleteOne({_id: id})
        .then(result => res.send(result))
        .catch(error => res.send(error));
});

module.exports = router;