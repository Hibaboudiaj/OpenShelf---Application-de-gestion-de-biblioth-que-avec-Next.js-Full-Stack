import { BookOpen, CirclePlus } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <BookOpen size={20} />
            </div>

            <div>
              <h1 className={styles.title}>Bibliothèque Horizon</h1>
              <p className={styles.subtitle}>Gestion de Catalogue</p>
            </div>
          </div>

          <nav className={styles.nav}>
            <button className={`${styles.button} ${styles.active}`}>
              Catalogue
            </button>

            <button className={`${styles.button} ${styles.addButton}`}>
              <CirclePlus size={16} />
              <span>Ajouter un livre</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}