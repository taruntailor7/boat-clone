import mainProductsModel from "../models/mainproducts.model.js"

export const getIndividualProduct = async (req,res)=>{
    try{


        let {id} = req.params;

        let mainProduct = await mainProductsModel.find({id: id});
        console.log(req.params.id);
        return res.send({
            status:"success",
            data : mainProduct
        })
    }
    catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}