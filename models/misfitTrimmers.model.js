import mongoose from "mongoose";

const misfitTrimmersSchema = new mongoose.Schema({});

const misfitTrimmersModel = mongoose.model(
  "misfittrimmers",
  misfitTrimmersSchema
);
export default misfitTrimmersModel;
