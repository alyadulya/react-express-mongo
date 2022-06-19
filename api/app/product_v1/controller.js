const { ObjectId } = require('bson');
const db = require('../../config/mongodb');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
    db.collection('products').find()
        .toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const view = (req, res) => {
    const { id } = req.params;
    db.collection('products').findOne({_id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const store = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image_url = req.file;
    if (image_url) {
        const target = path.join(__dirname, '../../uploads', image_url.originalname);
        fs.renameSync(image_url.path, target);
        db.collection('products').insertOne({name, price, stock, status, image_url: `http://localhost:3000/public/${image_url.originalname}`})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
}

const update = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image_url = req.file;
    const { id } = req.params;
    if (image_url) {
        const target = path.join(__dirname, '../../uploads', image_url.originalname);
        fs.renameSync(image_url.path, target);
        db.collection('products').updateOne({_id: ObjectId(id)}, {$set: {name, price, stock, status, image_url: `http://localhost:3000/public/${image_url.originalname}`}})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    } else {
        db.collection('products').updateOne({_id: ObjectId(id)}, {$set: {name, price, stock, status}})
            .then(result => res.send(result))
            .catch(error => res.send(error));
    }
}

const destroy = (req, res) => {
    const { id } = req.params;
    db.collection('products').deleteOne({_id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}