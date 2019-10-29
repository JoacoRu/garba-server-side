const EnabledModel = require('../model/enabled.model');

class EnabledServices {
    async get(productId) {
        return EnabledModel.findOne().where({'productId': productId});
    }

    async list(seach = {}) {
        return EnabledModel.find(search);
    }

    async create(payload) {
        let {productId, enabled} = payload;
        payload = {productId, enabled};

        const Enabled = new EnabledModel(payload);
        Enabled.save();

        return payload;
    }

    async update(productId, payload) {
        return EnabledModel.findOneAndUpdate({'productId': productId}, payload);
    }
}

module.exports = EnabledServices;