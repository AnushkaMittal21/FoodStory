const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

const Customer = new mongoose.model('Customer', customerSchema);

module.exports = Customer;