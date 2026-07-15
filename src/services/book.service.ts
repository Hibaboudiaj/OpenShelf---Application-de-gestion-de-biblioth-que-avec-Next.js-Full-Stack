import { Book } from "@/src/types/book";

const API_URL = "/api/books";

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch books.");
  }
  return response.json();
}

export async function getBookById(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch the book.");
  }

  return response.json();
}

export async function createBook(book: Omit<Book, "_id" | "createdAt" | "updatedAt">): Promise<Book> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Failed to create book.");
  }

  return response.json();
}

export async function updateBook(
  id: string,
  book: Omit<Book, "_id" | "createdAt" | "updatedAt">
): Promise<Book> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Failed to update book.");
  }

  return response.json();
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book.");
  }
}