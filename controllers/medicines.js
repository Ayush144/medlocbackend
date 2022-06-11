const Medicines = require('../models/Medicines');


//@desc GET all medicines
//route /api/medicines/getmedicine
// access @public

exports.getMedicines = async(req, res, next)=>{
    try{
        const medicines = await Medicines.find();

        res.status(200).json({
            success: true,
            count : medicines.length,
            data : medicines
        });
    } catch(err){
        console.log(err);
        res.status(500).json({error : 'Server error'});
    }


}

//@desc POST  medicine
//route /api/medicines/addMedicine
// access @public

exports.addMedicine = async(req, res, next)=>{
    try {
        const medicine = await Medicines.create(req.body);

        return res.status(200).json({
            success: true,
            data: medicine,
        });
    } catch (err) {
        console.log(err);
        //res.status(500).json({error: 'Server error'});
        // if (err.code) {
        //     return res.status(400).json(
        //         { error: 'this stores already exists' }
        //     );
        // }

        res.status(500).json({ error: 'Server error' });
    }


}

exports.addMultipleMedicines = async(req, res ,next) => {
    try{

        const medicine = await Medicines.create(req.body);

        return res.status(200).json({
            success: true,
            data: medicine,
        });
    }catch(err){

        console.log(err);

        return res.status(500).json({error: "Error: Server error"});
    }
}