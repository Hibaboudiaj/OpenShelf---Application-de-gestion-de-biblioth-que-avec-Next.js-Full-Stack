import { BookOpen } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundIcon}>
        <BookOpen size={380} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot}></span>
          <span>Catalogue Ouvert</span>
        </div>

        <h1 className={styles.title}>Bibliothèque Horizon</h1>

        <p className={styles.description}>
          Explorez notre sélection complète de classiques et d'œuvres
          contemporaines. Empruntez, lisez, apprenez, et gérez notre fonds de
          livres en toute simplicité.
        </p>
      </div>
    </section>
  );
}