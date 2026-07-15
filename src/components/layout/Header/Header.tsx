import Link from "next/link";
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
            <Link href="/" className={`${styles.button} ${styles.active}`}>
              Catalogue
            </Link>

            <Link
              href="/books/create"
              className={`${styles.button} ${styles.addButton}`}
            >
              <CirclePlus size={16} />
              <span>Ajouter un livre</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
