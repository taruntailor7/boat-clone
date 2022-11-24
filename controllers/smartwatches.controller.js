import smartWatchesModel from "../models/smartwatches.model";

export const getSmartWatches = async (req,res)=>{
    try{
        let watches = await smartWatchesModel.find();
        console.log(watches)
        return res.send({
            status:"success",
            data : watches
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}