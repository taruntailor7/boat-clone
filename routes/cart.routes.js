import express from 'express';
import { getCartdata, getUserCartdata,postUserCartdata,deleteUserCartdata,updateUserCartdata } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.get("/", getCartdata)
cartRouter.get("/:userId", getUserCartdata)
cartRouter.post("/", postUserCartdata)
cartRouter.patch("/:_id", updateUserCartdata)
cartRouter.delete("/:_id", deleteUserCartdata)

export default cartRouter