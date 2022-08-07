const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    name:
    {
        type:String,
    },
    phone:
    {
        type:Number,
    }

})

const User = mongoose.model("User",newUser);
module.exports = User;