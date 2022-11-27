import catchModel from "../models/catchMeAll.model.js";

export const getCatchMeAll = async (req, res) => {
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
    let Catch = await catchModel
      .find(filters)
      .sort({ [_sort]: _order === "asc" ? 1 : -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    console.log(Catch);
    return res.status(200).send({
      status: "success",
      data: Catch,
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
