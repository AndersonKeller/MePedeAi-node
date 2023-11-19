import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login/login.interfaces";

export const createClientLoginService = async (
  loginData: iLogin,
  establishID: string
): Promise<string> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const client: Client | null = await clientRepository.findOneBy({
    email: loginData.email,
    establish: {
      id: establishID,
    },
  });
  if (!client) {
    throw new AppError("Invalid credentials", 401);
  }
  const passwordMatch = await compare(loginData.password, client.password);
  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }
  const token: string = jwt.sign(
    {
      admin: false,
      type: "client",
      establishId: establishID!,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(client.id),
    }
  );

  return token;
};
