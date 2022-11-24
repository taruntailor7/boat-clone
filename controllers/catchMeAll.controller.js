import catchModel from "../models/catchMeAll.model.js"


export const getCatchMeAll = async (req,res)=>{
    try{
        let Catch = await catchModel.find();
        console.log(Catch)
        return res.status(200).send({
            status:"success",
            data : Catch
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}