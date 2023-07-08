import { Repository } from "typeorm";
import { Addresses, Client } from "../../entities";
import {
  CreateClient,
  iClient,
} from "../../interfaces/client/client.interfaces";
import { AppDataSource } from "../../data-source";
import {
  CreateAddress,
  iAddress,
} from "../../interfaces/addresses/addresses.interfaces";
import { returnClientSchema } from "../../schemas/client/client.schemas";

export const createClientService = async (
  clientData: CreateClient
): Promise<iClient> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const addressRepository: Repository<Addresses> =
    AppDataSource.getRepository(Addresses);
  const addressData: CreateAddress = clientData.addresses;

  const client: Client = clientRepository.create(clientData);
  await clientRepository.save(client);
  const newAddress: any = {
    ...addressData,
    client: client,
  };
  const address: any = addressRepository.create(newAddress);
  await addressRepository.save(address);

  client.address = address;

  const returnClient = returnClientSchema.parse(client);
  return returnClient;
};
