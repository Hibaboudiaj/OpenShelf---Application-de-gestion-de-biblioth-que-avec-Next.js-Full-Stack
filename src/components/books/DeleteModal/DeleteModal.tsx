"use client";

import { TriangleAlert } from "lucide-react";

import styles from "./DeleteModal.module.css";

export default function DeleteModal({
  book,
  onCancel,
  onConfirm,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.iconBox}>
            <TriangleAlert size={24} />
          </div>

          <div className={styles.text}>
            <h3 className={styles.title}>
              Confirmer la suppression
            </h3>

            <p className={styles.description}>
              Êtes-vous sûr de vouloir supprimer l'ouvrage{" "}
              <strong>"{book.title}"</strong> de l'auteur{" "}
              {book.author} ?
            </p>

            <p className={styles.warning}>
              Cette action est irréversible et retirera
              définitivement le livre de la base de données.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Annuler
          </button>

          <button
            type="button"
            className={styles.deleteBtn}
            onClick={onConfirm}
          >
            Supprimer l'ouvrage
          </button>
        </div>
      </div>
    </div>
  );
}