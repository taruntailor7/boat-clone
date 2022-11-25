import mongoose from "mongoose";

const stoneSpeakersSchema = new mongoose.Schema({});

const stoneSpeakersModel = mongoose.model("stonespeakers", stoneSpeakersSchema);
export default stoneSpeakersModel;
