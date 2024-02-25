import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Order } from "../../entities";
import { returnOrderSchema } from "../../schemas/order.schemas";

export const getOrderByIdService = async (orderId: number): Promise<any> => {
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findOrder: Order | null = await orderRepository.findOne({
    where: {
      id: orderId,
    },
    relations: {
      client: true,
      menu: true,
      orderProducts: { product: { type: true } },
      establish: true,
    },
  });

  const findClient: Client | null = await clientRepository.findOne({
    where: {
      id: findOrder!.client.id,
    },
    
    
  });
  const returnOrder = {
    ...findOrder,

    client: findClient!,
  };

  const order = returnOrderSchema.parse(returnOrder);
  return order;
};
