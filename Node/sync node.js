

const fs    = require("fs");
const { clear } = require("console");
console.log("1. start");
 fs.readFile("data.txt",()=>{
        console.log("4. File read call back ");
    });
    console.log("2. Js thread continue")
    let count=0;
    const interval=setInterval(()=>{
        console.log(`3. serving other user ${++count}`);
        if(count==3) clearInterval(interval);
    },300);