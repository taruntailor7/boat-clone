import aavanteModel from "../models/aavante.model.js";

export const getAavante = async (req, res) => {
  try {
    let {
      page = 1,
      sortBy = "_id",
      pageSize = 10,
      order = "asc",
      priceStart = 0,
      priceEnd = Infinity,
    } = req.query;

    const filters = {
      $and: [{ price: { $gt: priceStart } }, { price: { $lt: priceEnd } }],
    };
    let aavanteData = await aavanteModel
      .find(filters)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
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
