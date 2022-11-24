import airdopesTrueWirelessModel from "../models/airdopestruewireless.model.js";


export const getAirdopes = async (req,res)=>{
    try{
        let airdopes = await airdopesTrueWirelessModel.find();
        console.log(airdopes)
        return res.send({
            status:"success",
            data : airdopes
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}