import { Hono } from "hono";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../handlers/notes";

const notes = new Hono().basePath("/notes");

notes.get("/", async (c) => {
  const userData = (await c.req.raw.headers.get("userId")) as string;
  console.log(userData);
  if (!userData) return c.json({ message: "User data is not Valid" }, 401);
  const notes = await getNotes(userData);
  return c.json({ notes });
});

notes.get("/:id", async (c) => {
  const userData = (await c.req.raw.headers.get("userId")) as string;
  const id = c.req.param("id");
  const note = await getNote(id, userData);
  console.log(note);
  return c.json({ note });
});

notes.post("/", async (c) => {
  const body = await c.req.json();
  const noteContent = body["noteContent"];
  const userData = (await c.req.raw.headers.get("userId")) as string;
  const message = await createNote(noteContent, userData);
  return c.json({ message });
});

notes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const noteContent = body["noteContent"];
  const userData = (await c.req.raw.headers.get("userId")) as string;
  const message = await updateNote(id, noteContent, userData);
  return c.json({ message });
});

notes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const userData = (await c.req.raw.headers.get("userId")) as string;
  const note = await deleteNote(id, userData);
  return c.text(note);
});

export default notes;
