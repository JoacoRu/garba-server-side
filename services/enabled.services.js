const EnabledModel = require('../model/enabled.model');

class EnabledServices {
    async get(productId) {
        return EnabledModel.findOne().where({'productId': productId});
    }

    async list(seach = {}) {
        return EnabledModel.find(search);
    }

    create(payload) {
        let {productId, enabled} = payload;
        payload = {productId, enabled};

        const Enabled = new EnabledModel(payload);
        Enabled.save();

        return payload;
    }

    async update(productId, payload) {
        const enabled = await EnabledModel.findOneAndUpdate({'productId': productId}, payload);
        enabled.enabled = payload.enabled;
        return enabled;
    }
}

module.exports = EnabledServices;