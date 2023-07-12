import { In, Repository } from "typeorm";
import {
  Addresses,
  Client,
  Establish,
  Menu,
  Order,
  Product,
} from "../../entities";
import { CreateOrder, iOrder } from "../../interfaces/order/order.interfaces";
import { AppDataSource } from "../../data-source";

import { returnOrderSchema } from "../../schemas/order/order.schemas";

export const createOrderService = async (
  orderData: CreateOrder,
  admin: boolean,
  id: string,
  type: string
): Promise<iOrder> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const addressRepository: Repository<Addresses> =
    AppDataSource.getRepository(Addresses);
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);

  const findClient: Client | null = await clientRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      establish: true,
      address: true,
    },
  });

  const findEstablish: Establish | null = await establishRepository.findOne({
    where: {
      id: findClient!.establish.id,
    },
  });
  let findAddressClient: Addresses | null = await addressRepository.findOne({
    where: {
      id: findClient!.address.id,
    },
  });
  if (orderData.address) {
    const newAddress: Addresses = addressRepository.create(orderData.address);
    await addressRepository.save(newAddress);
    findAddressClient = newAddress;
  }

  const findMenu: Menu | null = await menuRepository.findOne({
    where: {
      id: orderData.menu.id,
    },
  });
  const ids: number[] = orderData.products.map((prod) => prod.id);

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
    const manys: number[] = ids.filter((id) => id == next.id);
    if (manys.length > 1) {
      for (let i = 1; i < manys.length; i++) {
        findProducts.push(next);
      }
    }
    return prev + next.price * manys.length;
  }, 0);
  console.log(findProducts);
  const order: any = {
    menu: findMenu!,
    order_type: orderData.order_type,
    products: findProducts,
    address: findAddressClient!,
    client: findClient!,
    establish: findEstablish,
    total: totalPrice,
  };

  console.log(order);
  const newOrder = orderRepository.create(order);
  await orderRepository.save(newOrder);

  const returnOrder = returnOrderSchema.parse({
    ...newOrder,
    productsOrder: [...findProducts],
  });
  return returnOrder;
};
