
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Order } from "../../entities";
import { statusOrder } from "../../schemas/order.schemas";

export const updateStatusOrderService =async (orderId:number, statusUpdate:statusOrder)=>{
    const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
    const findOrder: Order | null = await orderRepository.findOne({
        where: {
          id: orderId,
        },
        relations: {
          client: {address:true},
          orderProducts: { product: { type: true } },
        },
        select:{
            client:{
                name: true,
                email: true,
                phone: true,
                id: true,
            }
        }
      });
    const updateOrderStatus:Order = orderRepository.create(
         {...findOrder!,status: statusUpdate}
    )
    await orderRepository.save(updateOrderStatus)
      
    return updateOrderStatus
}