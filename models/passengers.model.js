const mongoose = require('mongoose');

const passengersSchema = new mongoose.Schema({
    trip:{
        type: String,
        required: [true, "please provide your trip"],
        enum: ['One-way', 'Round-Trip', 'Multi-City']
    },
    designation: {
        type: String,
        required: [true, 'please provide your designation']
    },
    arrival: {
        type: String,
        required: [true, 'Please provide ypour desgnation']
    },
    departureDate: {
        type: Date,
        required: [true, 'please provide your departure Date'],
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: [true, 'Please provide your return Date'],
        default: Date.now
    },
    passengers: {
        type: String,
        required: [ 'please provide your passenger Name'],
        enum: ["Adult", "Children", "Infants"],
    },
    passengerNumber: {
        type: Number,
        required: [true, 'Please provide your passenger number'] 
    },
    ticketType: {
        type: String,
        required: [true, 'Please provide your ticket type'],
        enum: ['Economy', 'Business', 'First']
    }
});

const Passengers = mongoose.model('Passengers', passengersSchema);

module.exports = Passengers