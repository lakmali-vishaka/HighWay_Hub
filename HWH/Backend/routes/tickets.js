const router = require("express").Router();
const Ticket = require("../models/Ticket");



// Route for checking ticket validity and getting ticket amount
router.route("/check-ticket").post(async (req, res) => {

    const { Entrance, Exit } = req.body;
  
    try {
      
      const ticket = await Ticket.findOne({ Entrance, Exit });
  
      if (ticket) {
        
        res.json({ isValid: true, amount: ticket.Amount }); 
      } else {
        
        res.json({ isValid: false });
      }
    } catch (error) {
      console.error('Error checking ticket validity:', error);
      res.status(500).json({ error: 'An error occurred while checking ticket validity' });
    }
  });
  





module.exports = router;
