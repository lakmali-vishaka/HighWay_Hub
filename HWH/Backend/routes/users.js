const router = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const session = require('express-session');



const generateToken = (userId) => {
    // Use your secret key to sign the token
    const token = jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' }); // Adjust expiry time as needed
    return token;
};


router.use(session({
    secret: 'your_secret_key', // Secret key for session encryption
    resave: false,
    saveUninitialized: false
}));



//add user (signup)
{/*router.route("/add").post((req, res) => {
    // Add user logic
    const NIC = req.body.NIC;
    const Mobile = req.body.Mobile;
    const email = req.body.email;
    const password = req.body.password; 

    const newUser = new User({
        NIC,
        Mobile,
        email,
        password,
    })

    newUser.save().then(()=>{
        res.json("user added")
    }).catch((err)=>{
        console.log(err);
    })
})*/}


//add user (signup)
router.route("/add").post(async (req, res) => {
    try {
        const { NIC, Mobile, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ NIC });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            NIC,
            Mobile,
            email,
            password,
        });

        await newUser.save();
        res.json("User added successfully");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//login
router.route("/login").post(async (req, res) => {
    const { NIC, password } = req.body;
    
    User.findOne({ NIC: NIC, password: password })
        .then(user => {
            if (user) {
                req.session.userData = {
                    NIC: user.NIC,
                    Mobile: user.Mobile,
                    email: user.email,
                    password:user.password,
                    userId: user._id 
                
                    
                };
                // Check if the passwords match
                if (user.password === password) {
                    
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record found for the given NIC");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ error: "An internal server error occurred" });
        });
});




router.route('/update').post(async (req, res) => {
    try {
        // Check if user ID exists in the session data
        if (!req.session.userData || !req.session.userData.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Extract user ID from session data
        const userId = req.session.userData.userId;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (user) {
            // Update user data based on request body
            user.NIC = req.body.NIC || user.NIC;
            user.Mobile = req.body.Mobile || user.Mobile;
            if (req.body.password) {
                user.password = req.body.password;
            }

            // Save the updated user
            const updateUser = await user.save();

            // Respond with updated user details
            res.json({
                id: updateUser._id,
                NIC: updateUser.NIC,
                Mobile: updateUser.Mobile,
                password: updateUser.password,
                token: generateToken(updateUser._id),
                message: 'Update successful'
            });
        } else {
            // Respond with error if user not found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle internal server error
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});



/*//update profile

router.route('/update').post(async (req, res) => {
    try {
        const userId = req.body.userId; 
        const user = await User.findById(userId);
        if (user) {
            user.NIC = req.body.NIC || user.NIC;
            user.Mobile = req.body.Mobile || user.Mobile;
           
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updateUser = await user.save();
           res.json({
             _id: updateUser._id,
              NIC: updateUser.NIC,
               Mobile: updateUser.Mobile,
                password: updateUser.password,
                token: generateToken(updateUser._id),
               
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});*/







//save profile informatio

router.route("/profile").post(async (req, res) => {
    const { NIC, password } = req.body; // Retrieve NIC and password from request body
    

    
    try {
        // Find user based on NIC and password
        const user = await User.findOne({ NIC, password });

        
        
        if (user) {
            // If user is found, send user information in the response
            res.json({
               // id: user._id,
                NIC: user.NIC,
                Mobile: user.Mobile,
                Email:user.email
                
            });
        } else {
            // If user is not found, send 404 error
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle internal server error
        console.error("Error:", error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});



 // Retrieve user data from the session and save details in the profile screen

router.route("/userdata").get(async (req, res) => {
   
    const userData = req.session.userData;
  
    // Check if user data exists in the session
    if (userData) {
      res.json(userData); // Send user data as response
    } else {
      res.status(404).json({ error: 'User data not found in session' });
    }
  });

module.exports = router;
