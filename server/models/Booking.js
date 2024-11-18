const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carId: { type: String, required: true },
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fromAddress: { type: String, required: true },
    toAddress: { type: String, required: true },
    persons: { type: String, required: true },
    luggage: { type: String, required: true },
    journeyDate: { type: String, required: true },
    journeyTime: { type: String, required: true },
    notes: { type: String, required: true },
    paymentMethod: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;