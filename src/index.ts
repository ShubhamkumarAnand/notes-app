import { Hono } from "hono";
import { logger } from "hono/logger";

import notes from "./routes/notes";
import { findNote } from "./handlers/notes";
import auth from "./routes/auth";

const app = new Hono().basePath("/api");

// Logger
app.use("*", logger());

app.route("/auth", auth);

app.route("", notes);

app.get("/search", async (c) => {
  const query = c.req.query("q");
  const notes = await findNote(query);
  if (!notes) return c.json({ message: "Note Not Found!" });
  return c.json({ notes });
});

export default app;
