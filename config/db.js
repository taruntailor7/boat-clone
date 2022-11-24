import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

// const username = process.env.USERNAME;
const password = process.env.PASSWORD;
// console.log(username, password);


const connection = async ()=>{
    await mongoose.connect(`mongodb+srv://tarun7:${password}@imdb.46rj40h.mongodb.net/boat?retryWrites=true&w=majority`)
    console.log("Connection established")
}

export default connection;