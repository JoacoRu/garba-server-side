const routes = require('express').Router();

//Products

const productsController = require('../controller/products.controller');
const ProductsController = new productsController();

routes.get('/products/:id', ProductsController.get.bind(ProductsController));
routes.get('/products', ProductsController.list.bind(ProductsController));
routes.patch('/products/:id', ProductsController.update.bind(ProductsController));


module.exports = routes;