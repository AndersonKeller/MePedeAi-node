import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Order, Product } from "../../entities";
import { UpdateOrder, iOrder } from "../../interfaces/order/order.interfaces";

import { returnOrderSchema } from "../../schemas/order/order.schemas";

export const updateOrderService = async (
  orderData: UpdateOrder,
  orderId: number
): Promise<iOrder> => {
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const findOrder: Order | null = await orderRepository.findOne({
    where: {
      id: orderId,
    },
    relations: {
      address: true,
      client: true,
      menu: true,
      establish: true,
    },
  });
  const findClient: Client | null = await clientRepository.findOne({
    where: {
      id: findOrder!.client.id,
    },
    relations: {
      address: true,
      establish: true,
    },
  });
  if (orderData.products) {
    const ids: (number | undefined)[] = orderData.products.map(
      (prod) => prod.id
    );
    const findProducts: Product[] | null = await productRepository.find({
      where: {
        id: In(orderData.products.map((prod) => prod.id)),
      },
      cache: false,
      relations: {
        type: true,
      },
    });
    const totalPrice: number = findProducts.reduce((prev, next, index) => {
      const manys: (number | undefined)[] = ids.filter((id) => id == next.id);
      if (manys.length > 1) {
        for (let i = 1; i < manys.length; i++) {
          findProducts.push(next);
        }
      }
      return prev + next.price * manys.length;
    }, 0);
    findOrder!.total = totalPrice;
    // findOrder! = findProducts;
  }

  const updateOrder: any = {
    ...findOrder,
    ...orderData,
  };
  await orderRepository.save(updateOrder);
  const returnOrder = returnOrderSchema.parse({
    ...updateOrder,
    // productsOrder: [...findOrder!],
    client: findClient,
    // establish: findClient!.establish,
  });
  return returnOrder;
};
