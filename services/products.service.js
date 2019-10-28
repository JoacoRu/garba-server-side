const axios = require('axios');
const EnabledModel = require('../model/enabled.model');

class ProductsService {
    async get(productId) {
        let response;
        try {
            response =  await axios.get(`http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/${productId}`);
        } catch (err) {
            return err;   
        }
        return response.data;
    }

    async list() {
        let response;

        try {
            response = await axios.get('http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/');
            let payload = response.data.items;
            if(payload) {
                for (const key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        const element = payload[key];
                        let product = await EnabledModel.findOne({productId: element.id})
                        element.enabled = product.enabled;
                    }
                }
            }
        } catch (err) {
            return err;
        }
    
        return response.data;
    }

    async update(productId, payload) {
        let response;
        try {
            console.log('payload', payload)
            response = await EnabledModel.findOneAndUpdate({productId: productId},{enabled: payload}, {new: true});
        } catch (err) {
            console.error(err);
            return err;
        }

        return response;
    }
}

module.exports = ProductsService;