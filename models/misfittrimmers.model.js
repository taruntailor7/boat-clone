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

const misFitTrimmersModel = mongoose.model('misfittrimmers', categorySchema)


export default misFitTrimmersModel