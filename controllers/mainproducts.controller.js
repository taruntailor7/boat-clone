import mainProductsModel from "../models/mainproducts.model.js"

export const getMainProducts = async (req,res)=>{
    try{
        let mainProducts = await mainProductsModel.find();
        console.log(mainProducts)
        return res.send({
            status:"success",
            data : mainProducts
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}