import mobileAccessoriesModel from "../models/mobileAccessories.model.js";


export const getmobileAccessories = async (req,res)=>{
    try{
        let MobileAccessories = await mobileAccessoriesModel.find();
        console.log(MobileAccessories)
        return res.status(200).send({
            status:"success",
            data : MobileAccessories
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}