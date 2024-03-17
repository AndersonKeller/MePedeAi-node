import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { clientRoutes } from "./routes/client.routes";
import { establishRoutes } from "./routes/establish.routes";
import { loginRoutes } from "./routes/login.routes";
import { menuRoutes } from "./routes/menu.routes";
import { orderRoutes } from "./routes/order.routes";
import { productRoutes } from "./routes/product.routes";
import { shopRoutes } from "./routes/shop.routes";
import { typeProductRoutes } from "./routes/typeProduct.routes";
import { financialRoutes } from "./routes/financial.routes";
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
app.use("/order", orderRoutes);
app.use("/shop", shopRoutes);
app.use("/financial", financialRoutes)
app.use(handleErrors);
export default app;
