const express = require('express');
const router = express.Router();
const {getStore, addStore, registerStore, loginStore} = require('../controllers/stores');

router.route('/').get(getStore).post(addStore);
router.route('/storeRegister').post(registerStore);
router.route('/storeLogin').post(loginStore);

module.exports = router;