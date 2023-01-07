const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://locahost:27017/customersDB",{
    useNewUrlParser:true,
}).then(()=>{
    console.log(`Connection successfull!`);
}).catch((e)=>{
    console.log(`Connection Unsuccessfull! ${e}`);
});