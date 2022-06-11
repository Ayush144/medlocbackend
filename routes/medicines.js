const express = require('express');
const router = express.Router();
const {getMedicines,
     addMedicine,
    addMultipleMedicines} = require('../controllers/medicines');

router.route('/').get(getMedicines).post(addMedicine);
router.route('/multiple').post(addMultipleMedicines);



module.exports = router;