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
  const notes = await getNotes();
  return c.json({ notes });
});

notes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const note = await getNote(id);
  console.log(note);
  return c.json({ note });
});

notes.post("/", async (c) => {
  const body = await c.req.json();
  const noteContent = body["noteContent"];
  const message = await createNote(noteContent);
  return c.json({ message });
});

notes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const noteContent = body["noteContent"];
  const message = await updateNote(id, noteContent);
  return c.json({ message });
});

notes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const note = await deleteNote(id);
  return c.text(note);
});

export default notes;