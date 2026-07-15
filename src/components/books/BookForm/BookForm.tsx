"use client";

import { ArrowLeft, Save } from "lucide-react";
import styles from "./BookForm.module.css";

export default function BookForm() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className={styles.title}>
          Ajouter un nouveau livre au catalogue
        </h2>
      </div>

      <form className={styles.form}>
        {/* Title */}

        <div className={styles.field}>
          <label htmlFor="title">
            Titre de l'ouvrage <span>*</span>
          </label>

          <input
            id="title"
            type="text"
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
              type="text"
              placeholder="Ex : Antoine de Saint-Exupéry"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="isbn">
              Code ISBN <span>*</span>
            </label>

            <input
              id="isbn"
              type="text"
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

            <select id="category">
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
            <label htmlFor="publicationYear">
              Année de publication <span>*</span>
            </label>

            <input
              id="publicationYear"
              type="number"
              placeholder="Ex : 1943"
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
            rows={4}
            placeholder="Écrivez un résumé captivant ou les détails de cet ouvrage..."
          />
        </div>

        {/* Availability */}

        <div className={styles.statusCard}>
          <div>
            <h4>Statut de l'exemplaire</h4>

            <p>
              Indiquez si l'ouvrage est disponible au prêt immédiat.
            </p>
          </div>

          <label className={styles.switch}>
            <input
              type="checkbox"
              defaultChecked
            />

            <span className={styles.slider}></span>

            <span className={styles.statusText}>
              Disponible
            </span>
          </label>
        </div>

        {/* Footer */}

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
          >
            Annuler
          </button>

          <button
            type="submit"
            className={styles.submitButton}
          >
            <Save size={16} />
            <span>Ajouter l'ouvrage</span>
          </button>
        </div>
      </form>
    </div>
  );
}