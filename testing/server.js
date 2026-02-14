// require("dotenv").config();

// const PORT = process.env.PORT || 3000;
const express =require("express");
const userRoutes = require("./routes/userRoutes")
const app = express();
app.use(express.json());
app.use("/users",userRoutes);

//error 
app.use((err,req,res,next)=>
{
    res.status(500).json({message:"Internal server error"})
});
        app.listen(3000,()=>{
            console.log("Server running");
        })
module.exports = app;