import { createRequire } from "module";
const require = createRequire(import.meta.url);
var express = require("express")
var cookieParser = require('cookie-parser')
var session = require('express-session')

import  { json, urlencoded } from "express";
const mongoose = require("mongoose")
const User = require("./models/User.js");
var app = express();

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/authdb")
.then(()=>console.log("Db connected"))
.catch(err => console.error(err));

// Built -in middleware
app.use(json());  // JSON 
app.use(urlencoded({ extended: true })); // Form data

app.use(express.static("views"));
app.use(session({
  secret:'sample-secretkey',
  resave:false,
  saveUninitialized:false
}));


app.get("/demouser" , async(req,res) =>{
await User.create({username: "demouser" , password:"1234"});
res.send("user created");
})

app.get("/login",(req,res)=> res.render("login"));


app.post("/login" , async(req,res) =>{
const user = await User.findOne(req.body);
if(!user) return res.send("invalid credentials");
req.session.user = user;
res.redirect("/dashboard");

});


app.get("/dashboard",(req,res)=> {
    if(!req.session.user) return res.redirect("/login");
res.render("dashboard", {user: req.session.user});

});

app.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
    
})
app.listen(3000);
console.log("server started");

