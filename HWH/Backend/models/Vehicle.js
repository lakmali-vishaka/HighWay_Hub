const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    Vehicle_number: {
        type: String,
        required: true  //HFB
    },
    Type: {
        type: String,
        required: true  //HFB
    },
    //HFB
    NIC: {
        type: String,
        required: true, // Make NIC a required field
    }, 
    //HFB 
    Entrance: {
        type:String
    },
    Exit:{
        type:String
    },

    
}, {
    timestamps: true
});

vehicleSchema.index({ Vehicle_number: 1 });

const Vehicle = mongoose.model("Vehicle_Registration", vehicleSchema);

module.exports = Vehicle;