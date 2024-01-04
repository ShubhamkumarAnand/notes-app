import { Hono } from "hono";
import { logger } from "hono/logger";

import notes from "./routes/notes";
import { findNote } from "./handlers/notes";
import auth from "./routes/auth";
import { verify } from "hono/jwt";

const app = new Hono().basePath("/api");

// Logger
app.use("*", logger());

// auth middleware
app.use("/notes/*", async (c, next) => {
  const bearer = c.req.header().authorization;
  if (!bearer) return c.json({ message: "Not Authorized" }, 401);

  const [, token] = bearer.split(" ");
  if (!token) return c.json({ message: "Not a valid token!" }, 401);

  try {
    const user = await verify(token, process.env.JWT_SECRET as string);

    // Setup the request header
    c.req.raw.headers.set("userId", user.id);

    await next();
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

app.route("/auth", auth);

app.route("", notes);

// search middleware
app.use("/search/*", async (c, next) => {
  const bearer = c.req.header().authorization;
  if (!bearer) return c.json({ message: "Not Authorized" }, 401);

  const [, token] = bearer.split(" ");
  if (!token) return c.json({ message: "Not a valid token!" }, 401);

  try {
    const user = await verify(token, process.env.JWT_SECRET as string);

    // Setup the request header
    c.req.raw.headers.set("userId", user.id);

    await next();
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

app.get("/search", async (c) => {
  const query = c.req.query("q");
  const userData = (await c.req.raw.headers.get("userId")) as string;
  const notes = await findNote(query, userData);
  if (!notes) return c.json({ message: "Note Not Found!" });
  return c.json({ notes });
});

export default app;
