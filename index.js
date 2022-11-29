import express from "express";
import connection from "./config/db.js";
import { getCatchMeAll } from "./controllers/catchMeAll.controller.js";
import { getAavante } from "./controllers/aavantes.controller.js";
import { getAirdopes } from "./controllers/airdopes.controller.js";
import { getCategories } from "./controllers/categories.controller.js";
import { getEditions } from "./controllers/editions.controller.js";
import { getImmortalgamings } from "./controllers/immortalgamings.controller.js";
import { getRockerzWireless } from "./controllers/rockerzwireless.controller.js";
import { getSmartWatches } from "./controllers/smartwatches.controller.js";
import { getTRebels } from "./controllers/tRebels.controller.js";
import { getMainProducts } from "./controllers/mainproducts.controller.js";
import { register,login,getLoggedInUser} from "./controllers/user.controller.js";
import { getbestOfBoat } from "./controllers/bestOfBoat.controller.js";
import { getmobileAccessories } from "./controllers/mobileAccessories.controller.js";
import cartRouter from "./routes/cart.routes.js";
import { getMisfitTrimmers } from "./controllers/misfitTrimmers.controller.js";
import { getStoneSpeakers } from "./controllers/stoneSpeakers.controller.js";
import { getAllProducts } from "./controllers/allProducts.controller.js";
import { getIndividualProduct } from "./controllers/individualProduct.controller.js";
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Boat Clone",
  });
});

app.use("/cart", cartRouter);

app.post("/register", register);

app.post("/login", login);

app.get("/loggedInUser", getLoggedInUser);

app.get("/allproducts", getAllProducts);

app.get("/shopByCategory", getCategories);

app.get("/bestOfBoat", getbestOfBoat);

app.get("/catchMeAll", getCatchMeAll);

app.get("/limitedEdition", getEditions);

app.get("/mobileAccessories", getmobileAccessories);

app.get("/tRebel", getTRebels);

app.get("/aavante", getAavante);

app.get("/smatwatches", getSmartWatches);

app.get("/airdopestruewireless", getAirdopes);

app.get("/immortalgamings", getImmortalgamings);

app.get("/rockerzwireless", getRockerzWireless);

app.get("/mainProducts", getMainProducts);

app.get("/mainProducts/:id", getIndividualProduct);

app.get("/stonespeakers", getStoneSpeakers);

app.get("/misfittrimmers", getMisfitTrimmers);

app.listen(3050, () => {
  try {
    connection();
    console.log("listening on port 3050");
  } catch (error) {
    console.log(error);
  }
});
