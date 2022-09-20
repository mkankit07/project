const mongoose=require('mongoose')
require('dotenv').config()
const db=mongoose.connect(process.env.URL,{
    useNewUrlParser: true,
},(err)=>{
    if(err){
        console.log('DB connection error:', err);
    }else{
        console.log('DB connected');
    }
})

module.exports=db