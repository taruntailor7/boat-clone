import express from "express";
import connection from "./config/db.js";
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

app.listen(3050, () => {
  try {
    connection();
    console.log("listening on port 3050");
  } catch (error) {
    console.log(error);
  }
});
