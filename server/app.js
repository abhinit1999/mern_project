const express = require('express');
// const { connection } = require('mongoose');
// require("./db/conn")
// const User = require("./model/user");
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"});




const app = express();
const PORT = process.env.PORT;
app.use(express.json())

// Linking the router file to make route easy
app.use(require("./router/auth"));

// Middlewar//
const Middlewar = (req, res, next) => {
    console.log(`Hello from Middleware`);
  
    next();
  };









app.listen(PORT,()=>
{
    console.log(`runing at: ${PORT}`);
})