"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBook } from "@/src/services/book.service";
import styles from "./BookForm.module.css";

export default function BookForm() {
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

    try {
      await createBook(formData);

      router.push("/");
    } catch (error) {
      console.error(error);
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

        <h2 className={styles.title}>Ajouter un nouveau livre au catalogue</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Title */}

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

        {/* Author + ISBN */}

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
              placeholder="Ex : Antoine de Saint-Exupéry"
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
              placeholder="Ex : 978-2070612758"
            />
          </div>
        </div>

        {/* Category + Publication Year */}

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="category">
              Catégorie <span>*</span>
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Littérature">Littérature</option>
              <option value="Science-Fiction">Science-Fiction</option>
              <option value="Philosophie">Philosophie</option>
              <option value="Histoire">Histoire</option>
              <option value="Poésie">Poésie</option>
              <option value="Biographie">Biographie</option>
              <option value="Développement Personnel">
                Développement Personnel
              </option>
              <option value="Jeunesse">Jeunesse</option>
              <option value="Thrillers & Polars">Thrillers & Polars</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="publicationYear">
              Année de publication <span>*</span>
            </label>

            <input
              id="publicationYear"
              name="publicationYear"
              type="number"
              value={formData.publicationYear}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}

        <div className={styles.field}>
          <label htmlFor="description">
            Description / Synopsis <span>*</span>
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Écrivez un résumé captivant ou les détails de cet ouvrage..."
          />
        </div>

        {/* Availability */}

        <div className={styles.statusCard}>
          <div>
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

            <span className={styles.statusText}>Disponible</span>
          </label>
        </div>

        {/* Footer */}

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
            <span>Ajouter l'ouvrage</span>
          </button>
        </div>
      </form>
    </div>
  );
}
