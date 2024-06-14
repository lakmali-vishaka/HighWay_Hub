const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    Vehicle_number: {
        type: String,
       //required: true
    },
    Type: {
        type: String,
        //required: true
    },

   
    Entrance: {
        type:String
    },

    Exit:{
        type:String
    },

    USERID:{   //
        type:String //
    },  //

    
}, {
    timestamps: true
});

vehicleSchema.index({ Vehicle_number: 1 });

const Vehicle = mongoose.model("Vehicle_Registration", vehicleSchema);

module.exports = Vehicle;