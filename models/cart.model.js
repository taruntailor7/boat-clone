import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name: {type:String},
    count:{type:Number},
    category:{type:String},
    rating: {type:Number},
    reviews: {type:Number},
    price:{type:Number},
    original_price:{type:Number},
    discount: {type:Number},
    isAvailable:{type:Boolean},
    image: {type:Array},
    color: {type:Array},
    userId:{type:String,required:true},
})

const cartModel=mongoose.model('carts',cartSchema);
export default cartModel