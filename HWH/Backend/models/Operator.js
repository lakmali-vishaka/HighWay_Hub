const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
    OperatorPin: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Operator = mongoose.model("Operator_Authentication", operatorSchema);

module.exports = Operator;