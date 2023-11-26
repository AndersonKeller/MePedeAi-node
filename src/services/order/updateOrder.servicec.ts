import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Order, Product } from "../../entities";
import { UpdateOrder } from "../../interfaces/order/order.interfaces";

export const updateOrderService = async (
  orderData: UpdateOrder,
  orderId: number
): Promise<Order> => {
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
      orderProducts: { product: { type: true } },
    },
  });
  if (orderData.products) {
    const ids: (number | undefined)[] = orderData.products.map(
      (prod) => prod.id
    );
    const findProducts: Product[] | null = await productRepository.find({
      where: {
        id: In(ids),
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

    findOrder!.orderProducts.map((order) => {
      console.log("order", order);
      orderData.products?.forEach((data) => {
        if (order.product.id == data.id) {
          order.product.quantity = data.quantity!;
        } else {
          const findProd: any | undefined = findProducts.find((item) => {
            return item.id == data.id;
          });
          if (findProd) {
            findProd.quantity = data.quantity!;
            findOrder?.orderProducts.push(findProd);
          }
        }
      });

      return order;
    });
  }

  await orderRepository.save(findOrder!);

  // const returnOrder = returnOrderSchema.parse(findOrder);
  return findOrder!;
};
