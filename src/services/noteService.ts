import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const BASE_URL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search?: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const createNote = async (
  title: string,
  content: string,
  tag: NoteTag
): Promise<Note> => {
  const newNote = {
    title,
    content,
    tag,
  };

  const response = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};
