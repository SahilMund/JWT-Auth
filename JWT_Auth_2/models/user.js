const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    email:{
        type:String,
    },
    password:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

mongoose.model("User", userSchema)