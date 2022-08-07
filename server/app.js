const express = require('express');
// const { connection } = require('mongoose');
require("./db/conn")
const User = require("./model/user");





const app = express();
const port = process.env.PORT || 3001;
app.use(express.json())



// Middlewar//

const Middlewar = (req,res,next)=>
{
    console.log(`Hello from Middleware`);
    
    next();
}



app.get("/",(req,res)=>
{
    res.send("Welcome to the Home page...")
})
app.get("/about",Middlewar,(req,res)=>
{
    res.send("About page...")
})
app.get("/contact",(req,res)=>
{
    res.send("Contact page...")
})
app.get("/register",(req,res)=>
{
    res.send("Register page...")
})
app.get("/login",(req,res)=>
{
    res.send("Login page...")
})

// add data
app.post("/user",(req,res)=>
{
    const newUser = User(req.body);
    res.send(newUser);
    newUser.save();
    console.log(`\n\n${newUser}\ninserted`)
})

// display user
app.get("/user",async(req,res)=>
{
    const data =await User.find();
    res.send(data);
    console.log(`\n\n${data}`);
})




app.listen(port,()=>
{
    console.log(`runing at: ${port}`);
})