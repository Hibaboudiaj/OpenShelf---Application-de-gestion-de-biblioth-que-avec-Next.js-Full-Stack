"use client";

import { getBookById } from "@/src/services/book.service";
import { useEffect, useState } from "react";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Hash,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

import styles from "./BookDetails.module.css";

import { Book } from "@/src/types/book";

interface BookDetailsProps {
  id: string;
}

export default function BookDetails({
  id,
}: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
  }, []);

  async function loadBook() {
    try {
      const data = await getBookById(id);

      setBook(data);
      setAvailable(data.available);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        {/* LEFT SIDE */}

        <div className={styles.sidebar}>
          <div>
            <div className={styles.iconBox}>
              <Calendar size={26} />
            </div>

            <span className={styles.category}>{book.category}</span>

            <h2 className={styles.title}>{book.title}</h2>

            <p className={styles.author}>par {book.author}</p>
          </div>

          <div className={styles.sidebarInfo}>
            <div>
              <Calendar size={15} />
              <span>Publié en {book.publicationYear}</span>
            </div>

            <div>
              <Hash size={15} />
              <span>ISBN : {book.isbn}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className={styles.content}>
          <div className={styles.statusCard}>
            <div>
              <span className={styles.label}>Statut de disponibilité</span>

              <div
                className={`${styles.status} ${
                  available ? styles.available : styles.borrowed
                }`}
              >
                {available ? (
                  <>
                    <ShieldCheck size={16} />
                    Disponible au prêt
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
              onClick={() => setAvailable(!available)}
            >
              {available
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
              <strong>{book.publicationYear}</strong>
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
