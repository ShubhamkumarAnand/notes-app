import { Hono } from "hono";
import notes from "./routes/notes";

const app = new Hono();

app.route("/api", notes);
export default app;
