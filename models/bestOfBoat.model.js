import mongoose from "mongoose";

const bestOfBoatSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  rating: Number,
  reviews: Number,
  original_price: Number,
  price: Number,
  discount: Number,
  isAvailable: Boolean,
  isSuperSaver: Boolean,
  image: Array,
  color: Array,
},{timestamp: true, versionKey: false});

const bestOfBoatModel = mongoose.model("bestofboats", bestOfBoatSchema);

export default bestOfBoatModel;
