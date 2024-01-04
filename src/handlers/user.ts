import prisma from "../config/db";
import { comparePassword, createJWTToken, hashPassword } from "../modules/user";

export const createNewUser = async (
  userName: string,
  email: string,
  password: string
) => {
  const userNameFound = await prisma.user.findFirst({
    where: {
      userName,
    },
  });
  if (userNameFound) return "UserName Already exist! Try Another UserName";

  const emailFound = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (emailFound) return "Email already exists! Please try another email.";

  const hashPassword = await Bun.password.hash(password);
  const user = await prisma.user.create({
    data: {
      userName,
      email,
      password: hashPassword,
    },
  });
  console.log(user);
  if (!user) return "Something went wrong!";

  const token = await createJWTToken(user);
  return { message: "User Created Successfully!", token };
};

export const signIn = async (userName: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      userName,
    },
  });
  if (!user)
    return "Invalid User Name! Please try again with valid username or Create an account";

  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) return "Not valid credentials!";
  const token = await createJWTToken(user);
  return { message: "Signed In Successfully!", token };
};
