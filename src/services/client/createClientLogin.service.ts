import { Repository } from "typeorm";
import { iLogin } from "../../interfaces/login/login.interfaces";
import { Client } from "../../entities";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const createClientLoginService = async (
  loginData: iLogin
): Promise<string> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const client: Client | null = await clientRepository.findOneBy({
    email: loginData.email,
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
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(client.id),
    }
  );
  return token;
};
