import allProductsModel from "../models/allProducts.model.js";

export const getAllProducts = async (req, res) => {
  try {
    let allData = await allProductsModel.find();
    return res.status(200).send({
      status: "success",
      data: allData
    });
    // ret;
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
