import tRebelModel from "../models/tRebel.model.js";

export const getTRebels = async (req, res) => {
  try {
    let tRebelData = await tRebelModel.find();
    return res.status(200).send({
      status: "success",
      data: tRebelData,
    });
    ret;
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
