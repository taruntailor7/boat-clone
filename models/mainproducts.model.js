import mongoose from "mongoose";

const mainProductsSchema = new mongoose.Schema({
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

const mainProductsModel = mongoose.model('mainproducts', mainProductsSchema)

export default mainProductsModel