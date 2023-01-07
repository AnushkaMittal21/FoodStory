const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, './public');

app.use(express.static(static_path));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/customerDB", {useNewUrlParser: true});
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

app.get('/', (req,res)=>{
    res.render("index");
});

app.get('/login', (req,res)=>{
    res.render("index");
});

app.get('/home', (req,res)=>{
    res.render("home");
});

app.get('/menu', (req,res)=>{
    res.render("menu");
});

app.get('/waffle', (req,res)=>{
    res.render("waffle");
});

app.get('/pancakes', (req,res)=>{
    res.render("pancakes");
});

app.get('/burger', (req,res)=>{
    res.render("burger");
});

app.get('/cookies', (req,res)=>{
    res.render("cookies");
});

app.get('/pasta', (req,res)=>{
    res.render("pasta");
});

app.get('/about', (req,res)=>{
    res.render("about");
});

app.get('/contact', (req,res)=>{
    res.render("contact");
});

app.get('/cart', (req,res)=>{
    res.render("cart");
});

app.post('/', async(req,res)=>{
    try{
        const registerCustomer = new Customer({
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            password: req.body.password
        });
        const registered = await registerCustomer.save();
        res.status(201).render("index");
    }catch(error){
        res.status(400).send("error");
    }
});

app.post('/home', async(req,res)=>{
    try{
        const email = req.body.Cemail;
        const password = req.body.Cpassword;
        const customeremail = await Customer.findOne({email:email});
        if(customeremail.password === password){
            res.status(201).render("home");
        }else{
            res.send("Password not matching");
        }
    }catch(error){
        res.status(400).send("invalid email");
    }
});

app.post('/cart',async(req,res)=>{
    try{
        var tw = (req.body.radio1);
        //var price = 0;
        //price = price + tw;
        res.send(tw);
    }catch(error){
        res.status(400).send("error");
    }
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})