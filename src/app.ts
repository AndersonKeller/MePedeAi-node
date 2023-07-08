import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { establishRoutes } from "./routes/establish.routes";
import { loginRoutes } from "./routes/login.routes";
import { typeProductRoutes } from "./routes/typeProduct.routes";
import { productRoutes } from "./routes/product.routes";
import { menuRoutes } from "./routes/menu.routes";
import { clientRoutes } from "./routes/client.routes";
const cors = require("cors");
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/establish", establishRoutes);
app.use("/login", loginRoutes);
app.use("/type-product", typeProductRoutes);
app.use("/product", productRoutes);
app.use("/menu", menuRoutes);
app.use("/client", clientRoutes);

app.use(handleErrors);
export default app;
