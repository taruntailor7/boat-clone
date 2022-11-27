import airdopesTrueWirelessModel from "../models/airdopestruewireless.model.js";

export const getAirdopes = async (req, res) => {
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
    let airdopes = await airdopesTrueWirelessModel
      .find(filters)
      .sort({ [_sort]: _order === "asc" ? 1 : -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    console.log(airdopes);
    return res.send({
      status: "success",
      data: airdopes,
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};
