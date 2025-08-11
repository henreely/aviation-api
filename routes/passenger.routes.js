const express = require('express');
const {
    createPassenger,
    getAllPassengers,
    getPassengersById,
    updatePassenger,
    deletePassenger
} = require('../controllers/passengers.controller');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-ticket', protect, createPassenger);
router.get('/get-all-passenger', protect, getAllPassengers);
router.get('/get-passengersbyId/:id', protect, getPassengersById);
router.put('/update-passenger/:id', protect, updatePassenger);
router.delete('/delete-passenger/:id', protect, deletePassenger);

module.exports = router;