import misFitTrimmersModel from "../models/misfittrimmers.model";

export const getMisFittrimmers = async (req,res)=>{
    try{
        let misfittrimmers = await misFitTrimmersModel.find();
        console.log(misfittrimmers)
        return res.send({
            status:"success",
            data : misfittrimmers
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}