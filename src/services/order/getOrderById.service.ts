import { Repository } from "typeorm";
import { Client, Order, Product } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnOrderSchema } from "../../schemas/order/order.schemas";
import { iOrder } from "../../interfaces/order/order.interfaces";

export const getOrderByIdService = async (orderId: number): Promise<any> => {
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const productsRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

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
    relations: {
      address: true,
    },
  });
  const returnOrder = {
    ...findOrder,
    productsOrder: findOrder?.orderProducts,
    client: findClient!,
  };
  console.log(returnOrder);
  const order = returnOrderSchema.parse(returnOrder);
  return order;
};
