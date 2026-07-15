"use client";

import Link from "next/link";
import {
  Calendar,
  Eye,
  Pencil,
  ShieldAlert,
  ShieldCheck,
  Tag,
  Trash2,
  User,
} from "lucide-react";

import styles from "./BookCard.module.css";

import { Book } from "@/src/types/book";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

export default function BookCard({
  book,
  onDelete,
}: BookCardProps) {
  return (
    <article className={styles.card}>
      <div
        className={`${styles.topBar} ${
          book.available ? styles.availableBar : styles.borrowedBar
        }`}
      />

      <div className={styles.content}>
        <div className={styles.body}>
          <div className={styles.header}>
            <span className={styles.category}>
              <Tag size={13} />
              {book.category}
            </span>

            <span
              className={`${styles.status} ${
                book.available ? styles.available : styles.borrowed
              }`}
            >
              {book.available ? (
                <>
                  <ShieldCheck size={13} />
                  Disponible
                </>
              ) : (
                <>
                  <ShieldAlert size={13} />
                  Emprunté
                </>
              )}
            </span>
          </div>

          <h3 className={styles.title}>{book.title}</h3>

          <div className={styles.info}>
            <div className={styles.row}>
              <User size={15} />
              <span>{book.author}</span>
            </div>

            <div className={styles.row}>
              <Calendar size={15} />
              <span>Publié en {book.publicationYear}</span>
            </div>
          </div>

          <p className={styles.description}>
            {book.description.length > 90
              ? `${book.description.slice(0, 90)}...`
              : book.description}
          </p>
        </div>

        <div className={styles.actions}>
          <Link
            href={`/books/${book._id}`}
            className={styles.detailsBtn}
          >
            <Eye size={15} />
            <span>Détails</span>
          </Link>

          <Link
            href={`/books/edit/${book._id}`}
            className={styles.iconBtn}
          >
            <Pencil size={15} />
          </Link>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(book._id)}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}