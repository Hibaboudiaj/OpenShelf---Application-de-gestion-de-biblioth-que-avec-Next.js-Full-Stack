"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  createBook,
  getBookById,
  updateBook,
} from "@/src/services/book.service";

import styles from "./BookForm.module.css";

interface BookFormProps {
  id?: string;
}

export default function BookForm({ id }: BookFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Littérature",
    publicationYear: new Date().getFullYear(),
    description: "",
    available: true,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  async function loadBook() {
    try {
      const book = await getBookById(id!);

      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        publicationYear: book.publicationYear,
        description: book.description,
        available: book.available,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    try {
      if (id) {
        await updateBook(id, formData);

        router.push(`/books/${id}`);
      } else {
        await createBook(formData);

        router.push("/");
      }
    } catch (error) {
      console.error(error);

      setError("Erreur lors de l'enregistrement du livre.");
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className={styles.title}>
          {id ? "Modifier le livre" : "Ajouter un nouveau livre au catalogue"}
        </h2>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">
            Titre de l'ouvrage <span>*</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex : Le Petit Prince"
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="author">
              Auteur de l'ouvrage <span>*</span>
            </label>

            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="Ex : Antoine de Saint-Exupery"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="isbn">
              Code ISBN <span>*</span>
            </label>

            <input
              id="isbn"
              name="isbn"
              type="text"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Ex : 987-2345678"
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="category">Catégorie</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Littérature</option>
              <option>Science-Fiction</option>
              <option>Philosophie</option>
              <option>Histoire</option>
              <option>Poésie</option>
              <option>Biographie</option>
              <option>Développement Personnel</option>
              <option>Jeunesse</option>
              <option>Thrillers & Polars</option>
              <option>Autre</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="publicationYear">Année de publication</label>

            <input
              id="publicationYear"
              name="publicationYear"
              type="number"
              value={formData.publicationYear}
              onChange={handleChange}
              placeholder="Ex : 1967"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description / Synopsis</label>

          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Ecrivez un resume captivant de cet ouvrage (minimum 10 caracters)..."
          />
        </div>

        <div className={styles.statusCard}>
          <div className={styles.statusInfo}>
            <h4>Statut de l'exemplaire</h4>
            <p>Indiquez si l'ouvrage est disponible au prêt immédiat.</p>
          </div>

          <label className={styles.switch}>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />

            <span className={styles.slider}></span>

            <span
              className={`${styles.statusText} ${
                formData.available ? styles.available : styles.borrowed
              }`}
            >
              {formData.available ? "Disponible" : "Emprunté"}
            </span>
          </label>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push("/")}
          >
            Annuler
          </button>

          <button type="submit" className={styles.submitButton}>
            <Save size={16} />

            <span>{id ? "Modifier" : "Ajouter l'ouvrage"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
