const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')
const bcrypt = require('bcryptjs');


const StoreSchema = new mongoose.Schema({
    storeId : {
        type : String,
        required: [false, "Please add store id"],
        unique : false,
        default: "99999",
        trim : true,
        maxlength: [10, "Store must be less than 10 chars"]

    },

    name_of_store:{
        type: String,
        // required:[true, "Please add name of store"]
    },

    address: {
        type: String,
        // required: [true, 'Please add an address']
    },

    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },

    contact_no:{
        type: Number,
        required: true,
        maxlength:[10,"Contact no. must be less than 10 digits"],
        unique: true
    },

    password:{
        type: String,
        required: true
    },


    
    
    location: {
        type: {
          type: String,  
          enum: ['Point'],

        },
        coordinates: {
          type: [Number],
          index: '2sphere'
        },
        formattedAddress : String,
    },

    createdAt: {
        type: Date,
        defaulf: Date.now
    },


});


// geocode and create location
// StoreSchema.pre('save', async function(next) {
//     const loc = await geocoder.geocode(this.address);
//     console.log(loc);
// } );

StoreSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

StoreSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('Store',StoreSchema);