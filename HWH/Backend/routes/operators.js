const router = require("express").Router();
const Operator = require("../models/Operator");
const jwt = require('jsonwebtoken');
const session = require('express-session');

router.use(session({
    secret: 'your_secret_key', // Secret key for session encryption
    resave: false,
    saveUninitialized: false
}));



                    

// Login route
router.route("/loginOp").post(async (req, res) => {
    const { OperatorPin, Password } = req.body;

    Operator.findOne({ OperatorPin:OperatorPin,Password:Password}) // Find operator by OperatorPin and password
        .then(operator => {
            if (operator) {
                // Check if the passwords match
                if (operator.Password === Password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record found for the given pin");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ error: "An internal server error occurred" });
        });
});





module.exports = router;
