import mongoose from "mongoose";

const allProductsSchema = new mongoose.Schema({});

const allProductsModel = mongoose.model("allproducts", allProductsSchema);
export default allProductsModel;
