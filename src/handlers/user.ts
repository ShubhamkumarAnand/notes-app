import prisma from "../config/db";
import { comparePassword, createJWTToken, hashPassword } from "../modules/auth";

export const createNewUser = async (
  userName: string,
  email: string,
  password: string
) => {
  // Checking if the provided username already exists
  const userNameFound = await prisma.user.findFirst({
    where: {
      userName,
    },
  });
  if (userNameFound)
    return "UserName Already exist. Please try with Another UserName";

  // checking if the provided email already exists
  const emailFound = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (emailFound) return "Email already exist. Please try with another Email.";

  const hashedPassword = await hashPassword(password);
  // Creating a new user in the db
  const user = await prisma.user.create({
    data: {
      userName,
      email,
      password: hashedPassword,
    },
  });
  if (!user) return "Something went wrong, while creating a user. Try Again!";

  // creating a JWT Token for new user
  const token = await createJWTToken(user);
  return {
    message: `User Created Successfully with UserName: ${user.userName}!`,
    token,
  };
};

export const signIn = async (userName: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      userName,
    },
  });

  // Checking if the user is in the Database
  if (!user)
    return "Invalid UserName! Please try again with valid username or Create an account";

  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) return "Not valid credentials!";

  // Creating token for the signed in user
  const token = await createJWTToken(user);
  return { message: "Signed In Successfully!", token };
};
