import prisma from "../config/db";

export const getNotes = async (userId: string) => {
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return notes;
};

export const getNote = async (id: string, userId: string) => {
  const note = await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });
  return note;
};

export const createNote = async (noteContent: string, userId: string) => {
  const note = await prisma.note.create({
    data: {
      noteContent,
      userId,
    },
  });
  if (!note) return "Something went Wrong. Please Try Again";
  return note;
};

export const updateNote = async (
  id: string,
  noteContent: string,
  userId: string
) => {
  const note = await getNote(id, userId);
  if (!note) {
    return "Note with provided id doesn't exists";
  }
  const updatedNote = await prisma.note.update({
    where: {
      id,
      userId,
    },
    data: {
      noteContent,
    },
  });
  if (!updateNote) return "Something Went Wrong";
  return "Note Updated Successfully";
};

export const deleteNote = async (id: string, userId: string) => {
  const note = await getNote(id, userId);
  if (!note) {
    return `Note with given id doesn't Exist`;
  }
  await prisma.note.delete({
    where: {
      id,
      userId,
    },
  });
  return "Note Deleted Successfully";
};

interface Note {
  id: string;
  noteContent: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

function searchNotes(notesData: Note[], searchString: string): Note[] {
  return notesData.filter((note) => {
    // Case-insensitive search for flexibility
    return note.noteContent.toLowerCase().includes(searchString.toLowerCase());
  });
}

export const findNote = async (note: string | undefined, userId: string) => {
  if (!note) return "Note Doesn't Exists";
  const notes: Note[] = await getNotes(userId);
  if (!notes) return "Please Insert Some Notes";
  const data = searchNotes(notes, note);
  if (data.length === 0) return "Note with given keyword doesn't exists";
  return searchNotes(notes, note);
};
