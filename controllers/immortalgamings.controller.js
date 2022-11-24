import immortalGamingsModel from "../models/immortalgamings.model";

export const getImmortalgamings = async (req,res)=>{
    try{
        let immortalgamings = await immortalGamingsModel.find();
        console.log(immortalgamings)
        return res.send({
            status:"success",
            data : immortalgamings
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}