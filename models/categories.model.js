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

const categoryModel = mongoose.model('shopbycategories', categorySchema)

export default categoryModel