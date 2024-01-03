import prisma from "../config/db";

export const getNotes = async () => {
  const notes = await prisma.note.findMany();
  return notes;
};

export const getNote = async (id: string) => {
  const note = await prisma.note.findFirst({
    where: {
      id,
    },
  });
  return note;
};

export const createNote = async (noteContent: string) => {
  const note = await prisma.note.create({
    data: {
      noteContent,
    },
  });
  if (!note) return "Something went Wrong. Please Try Again";
  return note;
};

export const deleteNote = async (id: string) => {
  const note = await getNote(id);
  if (!note) {
    return `Note with given id doesn't Exist`;
  }
  await prisma.note.delete({
    where: {
      id,
    },
  });
  return "Note Deleted Successfully";
};
