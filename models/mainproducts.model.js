import mongoose from "mongoose";

const mainProductsSchema = new mongoose.Schema({
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

const mainProductsModel = mongoose.model("mainproducts", mainProductsSchema);

export default mainProductsModel;
