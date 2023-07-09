import { Repository } from "typeorm";
import { Addresses, Client, Establish } from "../../entities";
import {
  CreateClient,
  iClient,
} from "../../interfaces/client/client.interfaces";
import { AppDataSource } from "../../data-source";
import { CreateAddress } from "../../interfaces/addresses/addresses.interfaces";
import { returnClientSchema } from "../../schemas/client/client.schemas";

export const createClientService = async (
  clientData: CreateClient
): Promise<iClient> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const addressRepository: Repository<Addresses> =
    AppDataSource.getRepository(Addresses);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);

  const addressData: CreateAddress = clientData.addresses;
  const address: Addresses = addressRepository.create(addressData);
  await addressRepository.save(address);

  clientData.addresses = address;
  const findEstablish: Establish | null = await establishRepository.findOne({
    where: {
      id: clientData.establish.id,
    },
  });
  const newClient: any = {
    ...clientData,
    address: clientData.addresses,
  };

  const client: Client[] = clientRepository.create({
    establish: findEstablish!,
    ...newClient,
  });

  await clientRepository.save(client);

  const returnClient = returnClientSchema.parse(client);
  return returnClient;
};
