const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

router.get("/", async (req, res) => {
    try
    {
        const messages = await Message.find();
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({error: 'Error during fetching messages'}); 
        console.error('Error during fetching messages:', error);
    }
});

router.post("/", async (req, res) => {
    try
    {
        const {name, email, message} = req.body;
        
        if(!name || !email || !message)
        {
            return res.status(400).send({error: 'All fields are required'});
        }

        // Save message to database
        const newMessage = new Message({name, email, message, timestamp: new Date()});

        await newMessage.save();

        res.status(200).send({message :"Message Sent Successfully"});
    } catch (error) {
        res.status(500).send({error: 'Error during sending message'}); 
        console.error('Error during sending message:', error);
    }
});

router.delete("/:id", async(req, res) => {
    try
    {
        const message = await Message.findByIdAndDelete(req.params.id);

        if(!message)
        {
            return res.status(404).send({error: 'Message not found'});
        }

        res.status(200).send({message: 'Message deleted successfully'});

    } catch (error) {

        res.status(500).send({error: 'Error during deleting message'}); 
        console.error('Error during deleting message:', error);
    }
})

module.exports = router;