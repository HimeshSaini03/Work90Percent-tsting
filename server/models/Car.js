const mongoose = require('mongoose');

/*{
      brand: "Rolls Royce",
      rating: 50000,
      carName: "Rolls Royce Ghost",
      imgUrl: img08,
      model: "Model 3",
      price: 50000,
      speed: "20kmpl",
      gps: "GPS Navigation",
      seatType: "Heated seats",
      automatic: "Automatic",
      description:
        " Express your unique character with Ghost — a pristine blank canvas for personalisation. Its minimalist sensibility and pure aesthetic presents infinite Bespoke possibilities for every individual. Through ambitious creativity, transform Ghost into a singular statement that boldly reflects your colourful personality..",
    },*/

const CarSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    carName: { type: String, required: true },
    imgUrl: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    speed: { type: String, required: true },
    gps: { type: String, required: true },
    seatType: { type: String, required: true },
    automatic: { type: String, required: true },
    description: { type: String, required: true },
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;