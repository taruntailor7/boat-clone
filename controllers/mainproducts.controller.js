import mainProductsModel from "../models/mainproducts.model";

export const getMainproducts = async (req,res)=>{
    try{
        let mainproducts = await mainProductsModel.find();
        console.log(mainproducts)
        return res.send({
            status:"success",
            data : mainproducts
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}