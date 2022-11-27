import mongoose from "mongoose";

const mobileAccessoriesSchema = new mongoose.Schema({
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

const mobileAccessoriesModel = mongoose.model(
  "mobileaccessories",
  mobileAccessoriesSchema
);

export default mobileAccessoriesModel;
