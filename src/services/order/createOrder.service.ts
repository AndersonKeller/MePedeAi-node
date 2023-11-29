import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  Addresses,
  Client,
  Establish,
  Menu,
  Order,
  OrderProducts,
  Product,
} from "../../entities";
import { CreateOrder, iOrder } from "../../interfaces/order.interfaces";

import { returnOrderSchema } from "../../schemas/order.schemas";

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
  const orderproductRepository: Repository<OrderProducts> =
    AppDataSource.getRepository(OrderProducts);
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

  // console.log(findProducts);
  const orderQuantities = orderData.products.map((prod) => {
    const findProd: Product | undefined = findProducts.find(
      (prodFind) => prodFind.id == prod.id
    );
    const newProd = { ...findProd, quantity: prod.quantity };
    return newProd;
  });
  const totalValues: number[] = orderQuantities.map((prod) => {
    const total = findProducts.reduce((prev, next) => {
      return next.price * prod.quantity;
    }, 0);

    return total;
  });

  const totalValueOrder: number = totalValues.reduce(
    (prev, next) => prev + next
  );
  const order: any = {
    menu: findMenu!,
    order_type: orderData.order_type,
    orderProducts: findProducts!,
    address:
      orderData.order_type == "delivery" ? findAddressClient! : undefined,
    client: findClient!,
    establish: findEstablish,
    total: totalValueOrder,
  };

  // console.log(findProducts);
  const newOrder: any = orderRepository.create(order);

  const orderSaved: Order = await orderRepository.save(newOrder);
  orderQuantities.forEach(async (prod) => {
    const order_products = orderproductRepository.create({
      order: orderSaved,
      product: prod,
      quantity: prod.quantity,
    });
    await orderproductRepository.save(order_products);
  });

  const returnOrder = returnOrderSchema.parse({
    ...newOrder,
    orderProducts: [...orderQuantities],
  });
  return returnOrder;
};
