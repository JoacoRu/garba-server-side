const productsService = require('../services/products.service');
const ProductsService = new productsService();

class ProductsController {
    async get(req, res) {
        let response;
        const productId = req.params.id;

        try {
            response = await ProductsService.get(productId);
            if (!response['enabled_for_sale']) return res.status(404).send({message: 'El producto no fue encontrado'});
            console.info(response)
        } catch (err) {
            console.error(err)
            return res.status(502).send(err);
        }

        return res.status(200).send({response});
    }

    async list(req, res) {
        let response;

        try {
            response = await ProductsService.list();
            if(!response) res.status(404).send({message: 'El producto no fue encontrado'});
        } catch (err) {
            return res.status(502).send(err);
        }

        return res.status(200).send({items: response.items});
    }

    async update(req, res) {
        let response;
        const productId = req.params.id;
        const payload = req.body.enabled;
        try {
            response = await ProductsService.update(productId, payload);
        } catch (err) {
            console.error(err);
            res.status(502).send(err);
        }

        return res.status(200).send({response});
    }
}

module.exports = ProductsController;