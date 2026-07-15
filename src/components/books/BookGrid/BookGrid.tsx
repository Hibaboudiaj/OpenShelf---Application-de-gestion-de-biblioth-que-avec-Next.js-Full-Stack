"use client";

import { useEffect, useState } from "react";

import BookCard from "../BookCard/BookCard";
import styles from "./BookGrid.module.css";

import { deleteBook, getBooks } from "@/src/services/book.service";
import { Book } from "@/src/types/book";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to load books:", error);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await deleteBook(id);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Failed to delete book.");
    }
  }

  if (loading) {
    return (
      <div className={styles.message}>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.message}>
        <p>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className={styles.message}>
        <p>No books found.</p>
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}