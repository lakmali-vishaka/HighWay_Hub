const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = new mongoose.Schema({ 

    Entrance: {
        type : String,
        required: true
    },

    Exit: {
        type : String,
        required: true
    },

    Distance: {
        type : String,
       
    },

    Amount: {
        type : String,
        
    },

},

    {
        timestamps: true

    }

    
);

const Ticket = mongoose.model("ticket_amount",ticketSchema);

module.exports = Ticket;
