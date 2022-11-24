import bestOfBoatModel from "../models/bestOfBoat.model.js";


export const getbestOfBoat = async (req,res)=>{
    try{
        let BestOfBoat = await bestOfBoatModel.find();
        console.log(BestOfBoat)
        return res.status(200).send({
            status:"success",
            data : BestOfBoat
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}