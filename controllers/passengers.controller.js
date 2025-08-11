const Passengers = require('../models/passengers.model');

//Create passenger
exports.createPassenger = async (req, res) => {
    try{
    const newPassenger = await Passengers.create(req.body);
    res.status(201).json({
        message: 'Passenger created succesfully',
        date: newPassenger
    });
}   catch (error) {
    res.status(400).json({
        message: "Error creating passenger",
        error: error.message
    });
}
}

// Get all passengers
exports.getAllPassengers= async (req, res) =>{
    try{
        const passengers = await Passengers.find();
        res.status(200).json({
            message: "All passengers retrieved",
            data: passengers
        });
    }catch(error) {
        res.status(500).json({
            message: 'Error retyrieving passengers',
            error: error.message
        });
    }
}

exports.getPassengersById = async (req, res) => {
    try{ 
        const passenger = await Passengers.findById(req.params.id);
        if (!passenger) {
            return res.status(404).json({ message: "Passenger not found"});
        }

        res.status(200).json ({ data: passenger});
    }catch (error) {
        res.status(500).json({
            error: 'Error retrieving passenger',
            error: error.message
     
         });

        }
};

//update passenger by Id
exports.updatePassenger = async (req, res) => {
    try {
        const updated = await Passengers.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true
     });

     if (!updated) {
        return res.status(404).json({ message: 'Passenger not found' });
     }

     res.status(200).json({
        message: 'Passenger updated successfully',
        data: updated
     });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating passenger',
            error: error.message
        });
    }
};


// Delete passenger by ID
exports.deletePassenger = async (req, res) => {
    try {
        const deleted = await Passengers.findByIdAndDelete(req.params.id);
        if (!deleted) {
         return res.status(404).json({ message: 'Passenger not found'});
        }

        return res.status(200).json({ message: "Passenger deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting passenger",
            error: error.message
        });
    }
}