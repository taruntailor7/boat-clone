import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({});

const categoryModel = mongoose.model("shopbycategories", categorySchema);

export default categoryModel;
