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
import { iAddress } from "../../interfaces/addresses/addresses.interfaces";
import { iEstablish } from "../../interfaces/establish/establish.interfaces";
import { returnClientSchema } from "../../schemas/client/client.schemas";
import { returnOrderSchema } from "../../schemas/order/order.schemas";

export const createOrderService = async (
  orderData: CreateOrder,
  admin: boolean,
  id: string,
  type: string
): Promise<any> => {
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
  let listOfProducts: Product[] = [];

  const res: Promise<Product[]>[] = ids.map(async (prod: number) => {
    const findProd: Product | null = await productRepository.findOne({
      where: {
        id: prod,
      },
      relations: {
        type: true,
      },
      select: {
        type: {
          name: true,
          id: true,
          description: true,
        },
      },
    });

    if (findProd) {
      listOfProducts.push(findProd);
    }
    return listOfProducts;
  });

  const findProducts: Product[] | null = await productRepository.find({
    where: {
      id: In(orderData.products.map((prod) => prod.id)),
    },
    cache: false,
  });

  const totalPrice: number = findProducts.reduce((prev, next, index) => {
    const manys: number[] = ids.filter((id) => id == next.id);

    return prev + next.price * manys.length;
  }, 0);

  const order: any = {
    menu: findMenu!,
    order_type: orderData.order_type,
    products: listOfProducts,
    address: findAddressClient!,
    client: findClient!,
    establish: findEstablish,
    total: totalPrice,
  };

  const newOrder = orderRepository.create(order);

  await orderRepository.save(newOrder);

  const returnOrder = returnOrderSchema.parse({
    ...newOrder,
    productsOrder: [...listOfProducts],
  });
  return returnOrder;
};
