import { Repository } from "typeorm";
import { iClients, returnAllClientsSchema } from "../../schemas/client.schemas";
import { Client } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllClientsEstablishService=async(establishId:string):Promise<iClients>=>{

    const clientRepository:Repository<Client> = AppDataSource.getRepository(Client)

    const clients:Client[]= await clientRepository.find({
        where:{
            establish:{
                id:establishId
            }
        },
        relations:{
            address:true
        }
    })
    const allClients = returnAllClientsSchema.parse(clients)
    return allClients

}