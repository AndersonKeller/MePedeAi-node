import { createServer } from "http";
import { Server } from "socket.io";
import { iOrder } from "./schemas/order.schemas";
import { getAllOrdersService } from "./services/order/getAllOrders.service";
import { getOrderByIdService } from "./services/order/getOrderById.service";
const corsOptions = {
  origin: "*",
};
export const http = createServer();
export const io = new Server(http, { cors: corsOptions });
io.on("connection", (socket) => {
  let establish = ""
  console.log("socket connected", socket.id);
  socket.on("my_id_info",(args)=>{
    console.log(args)
    establish = args.id
    socket.join(establish)
  })
  socket.on("create_order", async (args: iOrder) => {
    console.log(args);
    // const all = await getAllOrdersService(args.client?.establish.id);
    const res = await getOrderByIdService(args.id!);
    // console.log(all);
    console.log("id",establish)
    socket.emit("update_orders", [res]);
    setTimeout(() => {
      socket.disconnect()
    }, 1000)
  });
});
