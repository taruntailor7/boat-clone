import misfitTrimmersModel from "../models/misfitTrimmers.model.js";

export const getMisfitTrimmers = async (req, res) => {
  try {
    let trimmersData = await misfitTrimmersModel.find();
    return res.status(200).send({
      status: "success",
      data: trimmersData,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
