import rockerzWirelessModel from "../models/rockerzwireless.model.js";

export const getRockerzWireless = async (req,res)=>{
    try{
        let rocekerz = await rockerzWirelessModel.find();
        console.log(rocekerz)
        return res.send({
            status:"success",
            data : rocekerz
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}