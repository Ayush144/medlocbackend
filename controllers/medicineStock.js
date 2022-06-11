const MedicineStock = require('../models/MedicineStock');
const Medicine = require('../models/Medicines');
const Store = require('../models/Store');
var http = require('http');
// import fetch from "/home/vikas/projects/med_locator/node_modules/node-fetch/src/index.js";
const fetch = require('cross-fetch')


exports.allStoreStocks = async function (req, res, next) {

    try {
        const data = await MedicineStock.find();

        res.status(200).json({
            success: true,
            result: data
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
}


exports.updateStockByStore = async function (req, res, next) {

    try {
        const data = await MedicineStock.create(req.body);

        res.status(200).json({
            success: true,
            result: data
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
}

//search by medicine id

exports.searchByMedId = async function (req, res, next) {
    const med_id = req.params.med_id;

    try {
        const stores = await MedicineStock
            .find({ 'medicine_availible.medicine_id': { $eq: med_id } }, { store_id: 1, 'medicine_availible': {$elemMatch:{medicine_id:{$eq:med_id}}} })
            .populate('store_id')
            .exec();

        //console.log(stores);

        res.status(200).json({
            success: true,
            data: stores
        })
    } catch (e) {
        res.status(500).json({
            success: false
        })
        console.log(e);
    }

}


//update stocks by store id

exports.updateStockByStoreId = async function(req, res, next) {
    const storeId = req.params.storeId;
    const medId = req.body.medId;
    const unit = req.body.unit;
    try {
        const update = await MedicineStock.updateOne({ store_id: storeId, 'medicine_availible.medicine_id': medId }
            , { $set: { 'medicine_availible.unit': unit } });

        console.log(update);

        res.status(200).json({
            success: true,
            message: "data updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

// search medicine by name
// ENDPOINT /api/medicineStocks/searchByName/:nameOfMed

exports.searchMedicineByName = async function(req, res, next) {

    try {
        const medName = req.params.nameOfMed;
        const results = await Medicine.find({ nameOfMed: medName }, { nameOfMed: 0 });
        
        const iid = results[0]._id;
        const strid = iid.toString();
        const url = 'http://localhost:7000/api/medicineStocks/' + strid;
        console.log(url);

        fetch(url)
        .then(res=> res.json())
        .then(data=> 
            {
                console.log(data)
                // const dat = data;
                res.status(200).json({
                    success: true,
                    data: data.data
                });
            });


    }catch(err){
        console.log(err);
    }
    
    
}