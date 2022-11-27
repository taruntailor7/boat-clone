import mongoose from "mongoose";

const stoneSpeakersSchema = new mongoose.Schema({
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

const stoneSpeakersModel = mongoose.model("stonespeakers", stoneSpeakersSchema);
export default stoneSpeakersModel;
