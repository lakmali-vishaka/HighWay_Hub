const express = require('express'); //HFB
const router = require("express").Router();
const Vehicle = require("../models/Vehicle");

//HFB
router.post('/addVehicle', async (req, res) => {
  try {
    const { Vehicle_number, Type, NIC } = req.body;

    const newVehicle = new Vehicle({
      Vehicle_number,
      Type,
      NIC, // Store NIC in the database
    });

    await newVehicle.save();
    res.status(201).send('Vehicle registered successfully');
  } catch (error) {
    console.error('Error registering vehicle:', error);
    res.status(500).send('Error registering vehicle');
  }
});
//HFB

{/*//add user (signup)
router.route("/addVehicle").post((req, res) => {
    
  const Vehicle_number = req.body.Vehicle_number;
  const Type = req.body.Type;
  
  
  const newVehicle = new Vehicle({
      Vehicle_number,
      Type,

  })

  newVehicle.save().then(()=>{
      res.json("Vehicle added")
  }).catch((err)=>{
      console.log(err);
  })

})*/}

//campare data before add entrance gate

router.route('/compare-data').post(async (req, res) => {
  const { qrData, type } = req.body; // Assuming vehicleType is also sent in the request body

  try {
      // Search for the vehicle registration data in the database
      const foundVehicle = await Vehicle.findOne({ Vehicle_number: qrData, Type: type });

      if (foundVehicle) {
          // Vehicle registration data exists in the database
          res.json({ exists: true });
      } else {
          // Vehicle registration data does not exist in the database
          res.json({ exists: false });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to store the selected entrance gate temporarily
router.route('/store-gate').post(async (req, res) => {
    const { Entrance_gate, qrData } = req.body;
  
    try {
      // Find the vehicle in the database based on qrData
      const foundVehicle = await Vehicle.findOne({ Vehicle_number: qrData });
  
      if (foundVehicle) {
        // Update the vehicle document with the selected gate
        foundVehicle.Entrance = Entrance_gate;
        await foundVehicle.save();
  
        res.json({ message: 'Selected gate stored successfully.' });
      } else {
        res.status(404).json({ message: 'Vehicle not found.' });
      }
    } catch (error) {
      console.error('Error storing gate:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to get selected gate for a vehicle
  router.route('/vehicle/selected-gate').get(async (req, res) => {
    const { qrData } = req.query;
  
    try {
      // Find the vehicle in the database based on qrData
      const foundVehicle = await Vehicle.findOne({ Vehicle_number: qrData });
  
      if (foundVehicle) {
        const Entrance = foundVehicle.Entrance;
        res.json({ Entrance });
      } else {
        res.status(404).json({ message: 'Vehicle not found.' });
      }
    } catch (error) {
      console.error('Error retrieving selected gate:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


 //route to copmare data after entrance gate selected
router.route('/compare-Exit-data').post(async (req, res) => {
  const { qrData, type, selectedEntranceGate } = req.body;

  try {
    // Search for the vehicle registration data in the database
    const foundVehicle = await Vehicle.findOne({ Vehicle_number: qrData, Type: type, Entrance: selectedEntranceGate });

    if (foundVehicle) {
      // Vehicle registration data exists in the database
      res.json({ exists: true, vehicle: foundVehicle }); // Optionally, return the found vehicle data
    } else {
      // Vehicle registration data does not exist in the database
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



  // Route to store the exit gate
router.route('/store-exit-gate').post(async (req, res) => {
  const { Exit_gate, qrData, type, selectedEntranceGate } = req.body;

  try {
    // Find the vehicle in the database based on qrData, type, and entrance gate
    const foundVehicle = await Vehicle.findOne({ Vehicle_number: qrData, Type: type, Entrance: selectedEntranceGate });

    if (foundVehicle) {
      // Update the vehicle document with the selected exit gate
      foundVehicle.Exit = Exit_gate;
      await foundVehicle.save();

      res.json({ message: 'Exit gate stored successfully.' });
    } else {
      res.status(404).json({ message: 'Vehicle not found or does not match the provided criteria.' });
    }
  } catch (error) {
    console.error('Error storing exit gate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//check the entrance according to number
router.route("/get-entrance").post(async (req, res) => {
  const { Vehicle_number } = req.body;

  try {
    const foundVehicle = await Vehicle.findOne({ Vehicle_number });

    if (foundVehicle) {
      res.json({ isValid: true, entrance: foundVehicle.Entrance });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error('Error fetching vehicle entrance:', error);
    res.status(500).json({ error: 'An error occurred while fetching vehicle entrance' });
  }
});

//check the exit according to number

router.route("/get-exit").post(async (req, res) => {
  const { Vehicle_number } = req.body;

  try {
    const foundVehicle = await Vehicle.findOne({ Vehicle_number });

    if (foundVehicle) {
      res.json({ isValid: true, exit: foundVehicle.Exit });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error('Error fetching vehicle exit:', error);
    res.status(500).json({ error: 'An error occurred while fetching vehicle exit' });
  }
});




module.exports = router;


