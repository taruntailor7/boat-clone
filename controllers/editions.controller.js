import editionModel from "../models/editions.model.js";

export const getEditions = async (req, res) => {
  try {
    let editionData = await editionModel.find();
    return res.status(200).send({
      status: "success",
      data: editionData,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
