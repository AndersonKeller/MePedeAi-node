import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Order } from "../../entities";
import { iFinancial } from "../../schemas/financials.schemas";
import moment from "moment";

export const getFinancialService = async (): Promise<iFinancial[]> => {
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);

  const orderTotals = await orderRepository
    .createQueryBuilder("order")
    .select("order.createdAt","createdAt")
    .addSelect("SUM(order.total)", "total")
    .addSelect("count(*)","orders")
    .addSelect("order.payment","payment")
    .groupBy("order.createdAt").addGroupBy("order.payment")
    .getRawMany();
  console.log(orderTotals);
    orderTotals.map((order)=>order.createdAt = moment(order.createdAt).format("DD/MM/YYYY"))
  return orderTotals;
};
