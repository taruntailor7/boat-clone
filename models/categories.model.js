import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
});

const categoryModel = mongoose.model("shopbycategories", categorySchema);

export default categoryModel;
