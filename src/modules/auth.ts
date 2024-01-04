import { decode, sign, verify } from "hono/jwt";

export const comparePassword = (password: string, hash: string) => {
  return Bun.password.verify(password, hash);
};

export const hashPassword = (password: string) => {
  return Bun.password.hash(password);
};

interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const createJWTToken = async (user: User) => {
  const token = await sign(
    {
      id: user.id,
      userName: user.userName,
    },
    process.env.JWT_SECRET as string
  );
  console.log(token);
  return token;
};
