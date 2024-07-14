const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  posX: {
    type: Number,
    required: true,
  },
  posY: {
    type: Number,
    required: true,
  },
  rotation: {
    type: Number,
    required: true,
  },
});

const HouseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["School", "Police station", "Hospital", "Shop"],
    required: true,
  },
  posX: {
    type: Number,
    required: true,
  },
  posY: {
    type: Number,
    required: true,
  },
  rotation: {
    type: Number,
    required: true,
  },
});

// Модель данных
const DataSchema = new mongoose.Schema({
  station: {
    type: StationSchema,
    required: true,
  },
  houses: {
    type: [HouseSchema],
    required: true,
  },
  figures: {
    type: [HouseSchema],
    required: true,
  },
  numberId:{
    type:Number
  }
});


module.exports = {DataSchema};
