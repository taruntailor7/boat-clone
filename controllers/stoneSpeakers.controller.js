import stoneSpeakersModel from "../models/stoneSpeakers.model.js";

export const getStoneSpeakers = async (req, res) => {
  try {
    let speakersData = await stoneSpeakersModel.find();
    return res.status(200).send({
      status: "success",
      data: speakersData,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
