"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Hash,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import styles from "./BookDetails.module.css";

import { Book } from "@/src/types/book";
import {
  getBookById,
  updateBook,
} from "@/src/services/book.service";

interface BookDetailsProps {
  id: string;
}

export default function BookDetails({
  id,
}: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
  }, []);

  async function loadBook() {
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus() {
    if (!book) return;

    const updatedBook = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      publicationYear: book.publicationYear,
      description: book.description,
      available: !book.available,
    };

    await updateBook(book._id, updatedBook);

    setBook({
      ...book,
      available: !book.available,
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Retour au catalogue</span>
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.sidebar}>
          <div>
            <div className={styles.iconBox}>
              <Calendar size={26} />
            </div>

            <span className={styles.category}>
              {book.category}
            </span>

            <h2 className={styles.title}>
              {book.title}
            </h2>

            <p className={styles.author}>
              {book.author}
            </p>
          </div>

          <div className={styles.sidebarInfo}>
            <div>
              <Calendar size={15} />
              <span>
                {book.publicationYear}
              </span>
            </div>

            <div>
              <Hash size={15} />
              <span>{book.isbn}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.statusCard}>
            <div>
              <span className={styles.label}>
                Disponibilité
              </span>

              <div
                className={`${styles.status} ${
                  book.available
                    ? styles.available
                    : styles.borrowed
                }`}
              >
                {book.available ? (
                  <>
                    <ShieldCheck size={16} />
                    Disponible
                  </>
                ) : (
                  <>
                    <ShieldAlert size={16} />
                    Emprunté
                  </>
                )}
              </div>
            </div>

            <button
              className={styles.toggleBtn}
              onClick={toggleStatus}
            >
              {book.available
                ? "Marquer comme Emprunté"
                : "Marquer comme Disponible"}
            </button>
          </div>

          <div className={styles.infoGrid}>
            <div>
              <span>Auteur</span>
              <strong>{book.author}</strong>
            </div>

            <div>
              <span>Catégorie</span>
              <strong>{book.category}</strong>
            </div>

            <div>
              <span>ISBN</span>
              <strong>{book.isbn}</strong>
            </div>

            <div>
              <span>Année</span>
              <strong>
                {book.publicationYear}
              </strong>
            </div>
          </div>

          <div className={styles.description}>
            <h4>Description</h4>

            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}