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
import { CreateOrder, iOrder } from "../../schemas/order.schemas";

import { returnOrderSchema, statusOrder } from "../../schemas/order.schemas";
import { AppError } from "../../errors";
import { iProduct } from "../../schemas/product.schemas";

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
    }
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

  const findProducts: Product[] | null = await productRepository.find({
    where: {
      id: In(orderData.products.map((prod) => prod.id)),
    },
    cache: false,
    relations: {
      type: true,
    },
  });


  if(findProducts.length !== orderData.products.length){
    throw new AppError("Any product not found", 404)
  }
  const orderQuantities = orderData.products.map((prod) => {
    const findProd: Product | undefined = findProducts.find(
      (prodFind) => prodFind.id == prod.id
    );
    const newProd = { ...findProd, quantity: prod.quantity };
    return newProd;
  });
  // console.log("findProds",findProducts)
  const totalValues: number[] = orderQuantities.map((prod) => {
    const findProd = findProducts.find((item)=>item.id === prod.id)

    return findProd?.price! * +prod.quantity;
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
    status: statusOrder.pending,
    comments: orderData.comments,
    payment: orderData.payment
  };

  // console.log(findProducts);
  const newOrder: Order[] = orderRepository.create(order);

  const orderSaved: Order[] = await orderRepository.save(newOrder);
  console.log(orderQuantities,"judas")
  const newP: any = 
  orderQuantities.forEach(async (prod) => {
    const newP: any = {
      order:orderSaved,
      quantity:prod.quantity,
      product:prod
    }
    const order_products:any = orderproductRepository.create(newP);
    await orderproductRepository.save(order_products);
  });
  const returnOrder = returnOrderSchema.parse({
    ...newOrder,
    orderProducts: [...orderQuantities],
  });
  return returnOrder;
};
