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

export const updateNote = async (id: string, noteContent: string) => {
  const note = await getNote(id);
  if (!note) {
    return "Note with provided id doesn't exists";
  }
  const updatedNote = await prisma.note.update({
    where: {
      id,
    },
    data: {
      noteContent,
    },
  });
  if (!updateNote) return "Something Went Wrong";
  return "Note Updated Successfully";
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

export const findNote = async (note: string | undefined) => {
  if (!note) return "Note Doesn't Exists";
  const notes: Note[] = await getNotes();
  if (!notes) return "Please Insert Some Notes";
  const data = searchNotes(notes, note);
  if (data.length === 0) return "Note with given keyword doesn't exists";
  return searchNotes(notes, note);
};
