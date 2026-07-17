"use client";

import { useEffect, useState } from "react";

import BookCard from "../BookCard/BookCard";
import DeleteModal from "../DeleteModal/DeleteModal";

import styles from "./BookGrid.module.css";

import { deleteBook, getBooks } from "@/src/services/book.service";
import { Book } from "@/src/types/book";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  function handleDelete(id: string) {
    const book = books.find((book) => book._id === id);

    if (!book) return;

    setSelectedBook(book);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!selectedBook) return;

    try {
      await deleteBook(selectedBook._id);

      setBooks((prevBooks) =>
        prevBooks.filter(
          (book) => book._id !== selectedBook._id
        )
      );

      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Failed to delete book:", error);
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
    <>
      <section className={styles.grid}>
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {showDeleteModal && selectedBook && (
        <DeleteModal
          book={selectedBook}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedBook(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}