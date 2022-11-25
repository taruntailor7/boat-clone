import mongoose from "mongoose"
import cartModel from "../models/cart.model.js"

export const getCartdata = async (req,res)=>{
    res.send({
        status:"succes"
    })
}


export const getUserCartdata = async (req,res)=>{
    let {userId} = req.params;
    let cartData = await cartModel.find({userId:userId});
    console.log(cartData);
    res.send({
        status:"success",
        data : cartData
    })
}
