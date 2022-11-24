import aavanteModel from "../models/aavante.model.js";

export const getAavante = async (req, res) => {
  try {
    let aavanteData = await aavanteModel.find();
    return res.status(200).send({
      status: "success",
      data: aavanteData,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
