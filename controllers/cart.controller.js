import mongoose from "mongoose"
import cartModel from "../models/cart.model.js"

export const getCartdata = async (req,res)=>{
    let Data = await cartModel.find();
    res.send({
        status:"succes",
        data:Data
    })
}

export const getUserCartdata = async (req,res)=>{
    try {
        let {userId} = req.params;
        if(userId){
            let cartData = await cartModel.find({userId:userId});
            if(cartData.length!=0){
                res.send({
                    status:"success",
                    data : cartData
                })
            }
            else{
                res.send({
                    status:"true",
                    data:"Cart is Empty"
                })
            }
        }
        else{
            res.send({
                status:"false",
                data:"Enter necessary details"
            })
        }
    } catch (error) {
        res.status(500).send({
            status:"false",
            data:error
        })
    }
}

export const postUserCartdata = async (req,res)=>{
    try {
        let cart = new cartModel(req.body)
        if(cart){
            
            let postCartData = await cart.save();
            res.send({
                status:"success",
                data:postCartData
            })
        }
        else{
            res.status(400).send({
                status:"false",
                data:"Enter necessary details"
            })
        }
    } catch (error) {
        res.status(400).send({
            status:"false",
            data:error.message
        })
    }
}

export const updateUserCartdata = async (req,res)=>{
    try{
        let {_id} = req.params;
        if(_id){
            let body = req.body;
            let updateCartData = await cartModel.findByIdAndUpdate(_id,{price:body.price,count:body.count});
            res.send({
                status:"success",
                data:updateCartData
            })
        }
        else{
            res.status(400).send({
                status:"false",
            })
        }
    }
    catch(err){
        res.status(400).send({
            status:"false",
            data:err.message
        })
    }
}

export const deleteUserCartdata = async (req,res)=>{
    try{
        const {_id} = req.params;
        if(_id){
            let data = await cartModel.findByIdAndRemove(_id);
            res.send({
                status:"true",
                data:data,
                message:"deleted successfully"
            })
        }
        else{
            res.status(400).send({
                status:"false",
                data:"ID NOT FOUND"
            })
        }
    }
    catch(err){
        res.status(400).send({
            status:"false",
            data:err
        })
    }
}
