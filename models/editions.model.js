import mongoose from "mongoose";

const limitedEditionSchema = new mongoose.Schema({});

const editionModel = mongoose.model("limitededitions", limitedEditionSchema);
export default editionModel;
