import limitedEditionsModel from "../models/limitededitions.model";

export const getLimitededitions = async (req,res)=>{
    try{
        let limitededitions = await limitedEditionsModel.find();
        console.log(limitededitions)
        return res.send({
            status:"success",
            data : limitededitions
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}