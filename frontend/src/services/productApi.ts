import { api } from "./api";
import type { Book } from "../types/Book";

// GET all books
export const getBooks = async (): Promise<Book[]> => {
    const response = await api.get<Book[]>("/book");
    return response.data;
  };
  
 // GET single book by id
export const getBookById = async (id: string): Promise<Book> => {
    const response = await api.get<Book>(`/book/${id}`); // <-- correct endpoint
    return response.data;
  };

// DELETE book
export const deleteBook = async (id: number) => {
  await api.delete(`/book/${id}`);
};

//CREATE book
export const createBook = async (book: Omit<Book, "id">) => {
    const response = await api.post<Book>("/book", book);
    return response.data;
  };

// UPDATE book
export const updateBook = async (id: number | string, updatedBook: Partial<Book>) => {
    const response = await api.put(`/book/${id}`, updatedBook);
    return response.data; // optional: return updated book
  };