import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login/login.interfaces";

export const createLoginService = async (
  loginData: iLogin
): Promise<string> => {
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);

  const establish: Establish | null = await establishRepository.findOneBy({
    email: loginData.email,
  });
  if (!establish) {
    throw new AppError("Invalid credentials", 401);
  }
  const passwordMatch = await compare(loginData.password, establish.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: establish.admin,
      type: "establish",
      establishId: establish.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(establish.id),
    }
  );

  return token;
};
