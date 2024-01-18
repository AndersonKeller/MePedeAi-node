import { createServer } from "http";
import { Server } from "socket.io";
import { iOrder } from "./interfaces/order.interfaces";
import { getAllOrdersService } from "./services/order/getAllOrders.service";
import { getOrderByIdService } from "./services/order/getOrderById.service";
const corsOptions = {
  origin: "*",
};
export const http = createServer();
export const io = new Server(http, { cors: corsOptions });
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("create_order", async (args: iOrder) => {
    console.log(args);
    const all = await getAllOrdersService(args.client?.establish.id);
    const res = await getOrderByIdService(args.id!);
    console.log(all);
    socket.emit("update_orders", all);
  });
});
