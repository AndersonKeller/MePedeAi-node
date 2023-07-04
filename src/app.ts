import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { establishRoutes } from "./routes/establish.routes";
import { loginRoutes } from "./routes/login.routes";
const cors = require("cors");
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/establish", establishRoutes);
app.use("/login",loginRoutes)
app.use(handleErrors);
export default app;
