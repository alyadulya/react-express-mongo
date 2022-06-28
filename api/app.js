require('./config/mongoose');
const express = require('express');
const upload_path = require('path');
const path = __dirname + '/views/';
const app = express();
const productRouterV1 = require('./app/product_v1/routes');
const productRouterV2 = require('./app/product_v2/routes');
const logger = require('morgan');
const cors = require("cors");

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path));
app.use('/public', express.static(upload_path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouterV1);
app.use('/api/v2', productRouterV2);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: `Resource ${req.originalUrl} not found`
    });
});
app.use((error, req, res, next) => {
    console.log('Rejected field ->', error.field);
    console.log(error);
});
app.get('/', (req, res) => {
    res.sendFile(path + "index.html");
});  
app.listen(process.env.PORT || 3000, () => console.log('Server: http://localhost:3000'));