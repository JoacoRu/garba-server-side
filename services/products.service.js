const axios = require('axios');
const enabledService = require('../services/enabled.services');
const EnabledService = new enabledService();
class ProductsService {
    async get(productId) {
        let response;
        try {
            response =  await axios.get(`http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/${productId}`);
            if(!response) return response.data;
            var enabled =  await EnabledService.get(productId);
            var responseEnabled = response.data['enabled_for_sale'];
            if (!enabled) {
                await EnabledService.create({"productId": productId, enabled: responseEnabled});
            }
            response.data.enabled_for_sale = enabled.enabled;
        } catch (err) {
            console.error(err);
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
                        const productId = element.id;
                        let enabled = await EnabledService.get(productId);
                        if (!enabled) {
                            const product = await this.get(productId);
                            element.enabled = product.enabled_for_sale;
                        }
                        element.enabled = enabled.enabled;                        
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
            response = await EnabledService.update(productId, {enabled: payload}, {new: true});
        } catch (err) {
            console.error(err);
            return err;
        }

        return response;
    }
}

module.exports = ProductsService;