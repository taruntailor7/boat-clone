import express from "express";
import connection from "./config/db.js";
// <<<<<<< HEAD
import { getCatchMeAll } from "./controllers/catchMeAll.controller.js";
// =======
import { getAavante } from "./controllers/aavantes.controller.js";
// >>>>>>> 46def589da26a13da3dcdb86c30b4f1ecdb20780
import { getCategories } from "./controllers/categories.controller.js";
import { getEditions } from "./controllers/editions.controller.js";
import { getTRebels } from "./controllers/tRebels.controller.js";
import {
  register,
  login,
  getLoggedInUser,
} from "./controllers/user.controller.js";

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

// <<<<<<< HEAD
app.get( "/catchMeAll",  getCatchMeAll )

// =======
app.get("/limitedEdition", getEditions);
// >>>>>>> 46def589da26a13da3dcdb86c30b4f1ecdb20780

app.get("/tRebel", getTRebels);

app.get("/aavante", getAavante);

app.listen(3050, () => {
  try {
    connection();
    console.log("listening on port 3050");
  } catch (error) {
    console.log(error);
  }
});
