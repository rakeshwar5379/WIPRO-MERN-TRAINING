const express = require("express");
const rateLimit= require("express-rate-limit");
const app = express();

// Rate Limit
const limit = rateLimit({
    windowMs : 1 * 60*1000 ,  // 1 minute  , setting the time frame
    max: 100, // limit each IP to 100 requests per window
    message: " Too many requests , please try again later.",
});

// Throttling -- You are allowing requests but pace them slow to avoid overload
const throttle = rateLimit({
    windowMs : 1 * 60*1000 ,  // 1 minute  , setting the time frame
    max: 100, // limit each IP to 100 requests per window
    delayMs : 500 , // add 500 ms delay per request over limit
   // Requests above the limit are delayed rather than blocked , which can smooth out traffice spikes.
});
app.use(limit);
app.use(throttle);
app.get("/api/data", limit,throttle, (req,res)=>{
    res.send("Here is your data display!")
});
app.listen(3000);
console.log("server running");