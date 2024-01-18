import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Order } from "../../entities";
export const getAllOrdersService = async (
  establishId: string
): Promise<any> => {
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  const orders: Order[] = await orderRepository.find({
    where: {
      establish: {
        id: establishId,
      },
    },
    relations: {
      client: { address: true },
      orderProducts: { product: { type: true } },
    },
    select: {
      client: {
        name: true,
        email: true,
        phone: true,
        id: true,
      },
    },
    order: { id: "DESC" },
  });

  return orders;
};
