const express = require('express');
const Car = require('../models/Car');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/*  GET ROUTES  */
router.get("/", async (req, res) => {
  try
  {
    const cars = await Car.find();
    res.status(200).send(cars);
  } 
  catch (error) {
    res.status(500).send({error: 'Error during fetching cars'}); 
    console.error('Error during fetching cars:', error);
  }
});

router.get("/:id", async (req, res) => {
  try
  {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({error: 'Car not found'});
    } 

    console.log('car:', car);

    const filePath = car.imgUrl;

    console.log('filePath:', filePath);

    const imagePath = path.join(__dirname, '../uploads', filePath);

    res.sendFile(imagePath);
  } 
  catch (error) {
    res.status(500).send({error: 'Error during fetching car'}); 
    console.error('Error during fetching car:', error);
  }
});

router.get("/data/:id", async (req, res) => {
  try
  {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({error: 'Car not found'});
    } 

    res.status(200).send(car);
  } 
  catch (error) {
    res.status(500).send({error: 'Error during fetching car'}); 
    console.error('Error during fetching car:', error);
  }
});

/*  POST ROUTES  */
router.post("/", async (req, res) => {

  const {brand, rating, carName, model, price, speed, gps, seatType, automatic, description} = req.body;

  const file = req.file;

  const filePath = file ? file.path : '';

  console.log('file', file);
  console.log('filePath:', filePath);

  const myGps = gps ? "GPS Navigation" : "No GPS Navigation";
  const myAutomatic = automatic ? "Automatic" : "Manual";

  const newCar = new Car({
    brand,
    rating,
    carName,
    model,
    price,
    speed,
    gps: myGps,
    seatType,
    automatic: myAutomatic,
    description,
    imgUrl: file.filename
  });

  try
  {
    const savedCar = await newCar.save();
    res.status(200).send(savedCar);
  } 
  catch (error) {
    res.status(500).send({error: 'Error during saving car'}); 
    console.error('Error during saving car:', error);
  }
});

/*  PUT ROUTES  */
router.put("/:id", async (req, res) => {
  const {imgUrl, brand, rating, carName, model, price, speed, gps, seatType, automatic, description} = req.body;

  const file = req.file ? req.file : null;

  const myGps = gps ? "GPS Navigation" : "No GPS Navigation";
  const myAutomatic = automatic ? "Automatic" : "Manual";

  const updatedCar = {
    brand,
    rating,
    carName,
    model,
    price,
    speed,
    gps: myGps,
    seatType,
    automatic: myAutomatic,
    description,
  };

  try
  {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({error: 'Car not found'});
    } 

    const oldFilePath = car.imgUrl;

    const imagePath = path.join(__dirname, '../uploads', oldFilePath);

    if (file)
    {
      fs.rmSync(imagePath);
      updatedCar.imgUrl = file.filename;
    }
    else
    {
      updatedCar.imgUrl = oldFilePath;
    }

    await Car.findByIdAndUpdate(req.params.id, updatedCar, {new: true});

    res.status(200).send(car);
  } 
  catch (error) {
    res.status(500).send({error: 'Error during updating car'}); 
    console.error('Error during updating car:', error);
  }
});

/*  DELETE ROUTES  */
router.delete("/:id", async (req, res) => {
  try
  {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({error: 'Car not found'});
    } 

    const filePath = car.imgUrl;

    const imagePath = path.join(__dirname, '../uploads', filePath);

    fs.rmSync(imagePath);

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).send({message: 'Car deleted successfully'});
  } 
  catch (error) {
    res.status(500).send({error: 'Error during deleting car'}); 
    console.error('Error during deleting car:', error);
  }
});

module.exports = router;