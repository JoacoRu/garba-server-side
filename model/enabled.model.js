const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnabledSchema = new Schema({
    productId: {
        type: String,
        required: [true, 'Es necesario que el estado del producto tenga una id']
    },
    enabled: {
        type: Boolean,
        required: [true, 'es necesario un estado del producto'],
    }
}, { versionKey: false });

module.exports = mongoose.model('Enabled', EnabledSchema);