import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    // name:String,
    // email:{
    //     type:String,
    //     required:true
    // },
    // password:{
    //     type:String,
    //     required:true,
    //     minLength:8
    // }
})

const rockerzWirelessModel = mongoose.model('rockerzwirelesses', categorySchema)


export default rockerzWirelessModel