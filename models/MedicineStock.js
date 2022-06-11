const mongoose = require('mongoose');
const Store = require('../models/Store');
const Schema = mongoose.Schema;

const medPrices = new Schema({

    medicine_id: {
        type: Schema.Types.ObjectId,
        ref: 'Medicines'
    },

    unit: {
        type: Number,
        required: true,
        default: 10
    },

    price: {
        type: Number,
        required: true
    }

});

const MedicineStockSchema = new Schema({
    store_id: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },

    medicine_availible: [medPrices],
});

module.exports = mongoose.model('MedicineStock', MedicineStockSchema);

