import stoneSpeakersModel from "../models/stoneSpeakers.model.js";

export const getStoneSpeakers = async (req, res) => {
  try {
    let {
      page = 1,
      _sort = "_id",
      pageSize = 12,
      _order = "asc",
      price_gte = 0,
      price_lte = Infinity,
    } = req.query;

    const filters = {
      $and: [{ price: { $gt: price_gte } }, { price: { $lt: price_lte } }],
    };
    let speakersData = await stoneSpeakersModel
      .find(filters)
      .sort({ [_sort]: _order === "asc" ? 1 : -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
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
