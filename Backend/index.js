const express=require('express');
require('dotenv').config()
const app= express()
const PORT=process.env.PORT || 7000
const db=require("./connection/db")
const routes= require("./routes")
const cors=require("cors")
app.use(express.json());
app.use(cors())
app.use("/",routes)
app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Listening on port ${PORT}`);

})