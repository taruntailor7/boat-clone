import express from 'express';
import { getCartdata, getUserCartdata } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.get("/", getCartdata)

cartRouter.get("/:userId", getUserCartdata)

export default cartRouter