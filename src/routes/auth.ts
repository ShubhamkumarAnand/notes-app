import { Hono } from "hono";
import { createNewUser, signIn } from "../handlers/user";

const auth = new Hono();

auth.post("/sign-in", async (c) => {
  const body = await c.req.json();
  const username = body["username"];
  const password = body["password"];
  const message = await signIn(username, password);
  return c.json({ message });
});
auth.post("/sign-up", async (c) => {
  const body = await c.req.json();
  const username = body["username"];
  const email = body["email"];
  const password = body["password"];
  console.log(body);
  const userData = await createNewUser(username, email, password);
  return c.json({ userData });
});

export default auth;
