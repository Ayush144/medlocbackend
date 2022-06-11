const Store = require('../models/Store');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');


//@desc Get all stores
// routes GET /api/stores
// @access public

exports.getStore = async (req, res, next) => {
    try {
        const stores = await Store.find();

        res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });
    } catch (err) {
        console.log(err);
        res.status(500).josn({ error: 'Server error' });
    }
};



// @desc Create a store
// routes POST /api/stores
// @access public

exports.addStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body);

        return res.status(200).json({
            success: true,
            data: store,
        });
    } catch (err) {
        console.log(err);
        //res.status(500).josn({error: 'Server error'});
        if (err.code) {
            return res.status(400).json(
                { error: 'this stores already exists' }
            );
        }

        res.status(500).json({ error: 'Server error' });
    }
};






exports.registerStore = asyncHandler(async(req, res, next) => {
    const {contact_no,address ,name_of_store,  password} = req.body;

    const storeExists = await Store.findOne({contact_no});

    if(storeExists){
        res.status(400);
        throw new Error("Store already exists");
    }

    const store = await Store.create({
        contact_no,
        name_of_store,
        address,
        password
    });

    if(store){
        res.status(201).json({
            id: store._id,
            no: store.contact_no,
            token: generateToken(store._id)
            
        });
    }else{
        res.status(400);
        throw new Error("Error occured! ");
    }

});





//@desc Login a store 
//route POST /api/stores/storeLogin
//@access public

exports.loginStore = asyncHandler(async(req, res, next) => {
    const {contact_no, password} = req.body;

    const store = await Store.findOne({contact_no});

    console.log(store);

    if(store && (await store.comparePassword(password)) ){
        res.json({
            _id: store._id,
            contact_no : store.contact_no, 
            password: store.password,
            token: generateToken(store._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

   

});

