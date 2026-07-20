"use client";

import { useEffect, useState } from "react";

import BookCard from "../BookCard/BookCard";
import DeleteModal from "../DeleteModal/DeleteModal";

import styles from "./BookGrid.module.css";

import {
  deleteBook,
  getBooks,
} from "@/src/services/book.service";

import { Book } from "@/src/types/book";
import { useBooks } from "@/src/context/BooksContext";

export default function BookGrid() {
  const { search, filter } = useBooks();

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] =
    useState<Book | null>(null);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch {
      setError("Erreur lors du chargement.");
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

      setBooks((prev) =>
        prev.filter(
          (book) => book._id !== selectedBook._id
        )
      );

      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch {
      alert("Erreur lors de la suppression.");
    }
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      book.author
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "available" &&
        book.available) ||
      (filter === "borrowed" &&
        !book.available);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className={styles.message}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.message}>
        {error}
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className={styles.message}>
        Aucun livre trouvé.
      </div>
    );
  }

  return (
    <>
      <section className={styles.grid}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {showDeleteModal &&
        selectedBook && (
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