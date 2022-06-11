const express = require('express');
const router = express.Router();
const {
    allStoreStocks,
    updateStockByStore,
    searchByMedId,
    updateStockByStoreId,
    searchMedicineByName
    } = require('../controllers/medicineStock');

router.route('/').get(allStoreStocks).post(updateStockByStore);
router.route('/:med_id').get(searchByMedId);
router.route('/updateStock/:storeId').post(updateStockByStoreId);
router.route('/searchByName/:nameOfMed').get(searchMedicineByName);

module.exports = router;