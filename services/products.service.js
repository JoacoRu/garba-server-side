const axios = require('axios');
const enabledService = require('../services/enabled.services');
const EnabledService = new enabledService();
class ProductsService {
    async get(productId) {
        let response;
        try {
            response =  await axios.get(`http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/${productId}`);
            if(!response) return response.data;
            const enabled =  await EnabledService.get(productId);
            const responseEnabled = response.data['enabled_for_sale'];
            if (!enabled) {
                EnabledService.create({"productId": productId, enabled: responseEnabled})
                .catch(err => console.error(err));
                console.info('entre')
            } else if (enabled && enabled.enabled != responseEnabled) {
                EnabledService.update(productId, {'enabled': responseEnabled})
                .catch(err => console.error(err));
            }
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
            response = await EnabledService.update(productId, {enabled: payload}, {new: true});
        } catch (err) {
            console.error(err);
            return err;
        }

        return response;
    }
}

module.exports = ProductsService;