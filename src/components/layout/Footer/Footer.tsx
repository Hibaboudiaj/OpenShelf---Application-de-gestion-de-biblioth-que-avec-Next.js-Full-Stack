import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Bibliothèque Horizon • © 2026 • Développé avec React & MongoDB
      </span>
    </footer>
  );
}