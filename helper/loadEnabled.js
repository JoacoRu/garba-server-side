const axios = require('axios');
const mongoose = require('mongoose');
const EnabledModel = require('../model/enabled.model');
const config = require('../config');

module.exports = async () => {
    let response;
    const url = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
    mongoose.connect(url, {useNewUrlParser: true}, err => err ? console.error(`MongoDB connection error ${err}`) : null);
    mongoose.connection.on('connected', () => console.info(`[MongoDb] connected to ${url}`));

    try {
        response = await axios.get('http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/');
    } catch (err) {
        console.error(err);
    }

    console.info('Cargando estados...');
    const payload = response.data.items;
    
    payload.forEach(element => {

        axios.get(`http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/${element.id}`).then(product => {
            let Enabled = new EnabledModel({
                productId: product.data.xid, 
                enabled: product.data.enabled_for_sale
            });
            Enabled.save();
        })
        .catch(err => console.error(err));
    });

    return console.info('Todos los estados de los productos se cargaron correctamente');

}