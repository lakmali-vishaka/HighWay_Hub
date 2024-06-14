const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({ // new Schema
    //providing attributes that user can have

    NIC: {
        type : String,
        required: true
    },

    Mobile: {
        type : String,
        required: true
    },

    email: {
        type : String,
        required: true
    },

    password: {
        type : String,
        required: true
    },

   /* pic:{
        type: String,

    },*/
},

    {
        timestamps: true

    }

    
);

const User = mongoose.model("User_Authentication",userSchema);//varahan athule denne table name eka

module.exports = User;