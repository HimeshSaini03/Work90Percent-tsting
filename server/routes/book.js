const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');

const router = express.Router();

router.get("/:token", async (req, res) => {

    const token = req.params.token;

    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err)
            {
                console.log('err:', err);
                res.status(400).send({error: 'Token is invalid'});
            }
            else
            {
                const {id} = decoded;
                res.status(200).send({message: 'Token is valid', UserId: id});
            }
        });
    }
    else
    {
        res.status(400).send({error: 'Token is invalid'});
    }
});

router.get("/all/:id", async (req, res) => {

    const {id} = req.params;

    const user = await User.findById(id);

    if(!user)
    {
        return res.status(404).send({error: 'User not found'});
    }
    
    const bookings = await Booking.find({userId: id});

    res.status(200).send(bookings);
});

router.post("/:id", async (req, res) => {

    const {id} = req.params;

    const user = await User.findById(id);

    if(!user)
    {
        return res.status(404).send({error: 'User not found'});
    }

    const Book = await Booking.create({...req.body, userId: id});
    
    const bookings = [...user.bookings];

    bookings.push(Book._id);

    user.bookings = bookings;

    await user.save();

    res.status(200).send({message: 'Booking added successfully'});
});

module.exports = router;