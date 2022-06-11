const mongoose = require('mongoose');

const MedicinesSchema = new mongoose.Schema({
    nameOfMed:{
        type: String,
        required: [true, "Please add name of medicine"],
        unique: true
    }
});

module.exports = mongoose.model('Medicine',MedicinesSchema);    