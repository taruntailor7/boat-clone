import categoryModel from "../models/categories.model.js";

export const getCategories = async (req, res) => {
  try {
    let categories = await categoryModel.find();
    console.log(categories);
    return res.send({
      status: "success",
      data: categories,
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
