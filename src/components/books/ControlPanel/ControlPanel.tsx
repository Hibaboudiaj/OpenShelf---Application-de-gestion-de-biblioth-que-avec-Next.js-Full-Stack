import { Search } from "lucide-react";
import styles from "./ControlPanel.module.css";

export default function ControlPanel() {
  return (
    <section className={styles.panel}>
      <div className={styles.container}>
        {/* Search */}
        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <Search size={18} className={styles.searchIcon} />

            <input
              type="text"
              placeholder="Rechercher par titre ou auteur..."
              className={styles.input}
            />
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <button className={`${styles.filterButton} ${styles.active}`}>
            <span>Tous</span>
            <span className={`${styles.count} ${styles.activeCount}`}>3</span>
          </button>

          <button className={styles.filterButton}>
            <span>Disponibles</span>
            <span className={styles.count}>2</span>
          </button>

          <button className={styles.filterButton}>
            <span>Empruntés</span>
            <span className={styles.count}>1</span>
          </button>
        </div>
      </div>
    </section>
  );
}