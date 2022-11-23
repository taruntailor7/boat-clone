import mongoose from "mongoose";

const connection = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/boat-database")
    console.log("Connection established")
}

export default connection;