import express from "express";
import connection from "./config/db.js";
import { getAavante } from "./controllers/aavantes.controller.js";
import { getCategories } from "./controllers/categories.controller.js";
import { getEditions } from "./controllers/editions.controller.js";
import { getTRebels } from "./controllers/tRebels.controller.js";
import {
  register,
  login,
  getLoggedInUser,
} from "./controllers/user.controller.js";
import { getMainProducts } from "./controllers/mainproducts.controller.js";
import { register, login, getLoggedInUser } from "./controllers/user.controller.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});

app.post("/register", register);

app.post("/login", login);

app.get("/loggedInUser", getLoggedInUser);

app.get("/shopByCategory", getCategories);

app.get("/limitedEdition", getEditions);

app.get("/tRebel", getTRebels);

app.get("/aavante", getAavante);

app.get("/mainProducts",getMainProducts)


app.listen(3050, () => {
  try {
    connection();
    console.log("listening on port 3050");
  } catch (error) {
    console.log(error);
  }
});
