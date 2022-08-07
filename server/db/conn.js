const mongoose = require('mongoose');
const dotenv=require('dotenv');
// mongoose connection;

dotenv.config({path: './config.env'})
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>
{
    console.log(`Connected to mongo Atlas...`)
}).catch((e)=>
{
    console.log(e);
})