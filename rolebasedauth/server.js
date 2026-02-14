import { createRequire } from "module";
const require = createRequire(import.meta.url);
var express = require("express")
var cookieParser = require('cookie-parser')
var session = require('express-session')
import  { json, urlencoded } from "express";
const mongoose = require("mongoose")
const User = require("./models/user.js");
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
await User.create({username: "adminuser" , password:"1234" , role:"admin"});
await User.create({username: "clientuser" , password:"1234" , role:"user"});
res.send("user created");
})
function isAuthenticated(req,res,next)
{
    if(!req.session.user)
        return res.redirect("/login")
    next();
}

function authorize(role)
{
return(req,res,next)=>{
    if(req.session.user.role != role){
        return res.send("Access denied")
    }
   
    next();
}
}
app.get("/login",(req,res)=> res.render("login"));

app.post("/login" , async(req,res) =>{
const user = await User.findOne(req.body);
if(!user) return res.send("invalid credentials");
req.session.user = user;
if(user.role === "admin"){
    return res.redirect("/admin");
}else{
res.redirect("/user");
}
});

app.get("/user", isAuthenticated ,(req,res)=> {
   
res.render("user", {user: req.session.user});
});
app.get("/admin", isAuthenticated ,authorize("admin"),(req,res)=> {
   
res.render("admin");
});
app.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
    
})
app.listen(3000);
console.log("server started");