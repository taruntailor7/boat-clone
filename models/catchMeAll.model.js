import mongoose from "mongoose";

const catchMeAllSchema = new mongoose.Schema({
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

const catchModel = mongoose.model("catchmealls", catchMeAllSchema);

export default catchModel;
