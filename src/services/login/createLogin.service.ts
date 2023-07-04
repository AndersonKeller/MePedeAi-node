import { Repository } from "typeorm";
import { iLogin } from "../../interfaces/login/login.interfaces";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Establish } from "../../entities";

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
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(establish.id),
    }
  );

  return token;
};
