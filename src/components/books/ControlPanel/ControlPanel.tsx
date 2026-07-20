"use client";

import { Search } from "lucide-react";
import styles from "./ControlPanel.module.css";

import { useBooks } from "@/src/context/BooksContext";

export default function ControlPanel() {
  const {
    search,
    setSearch,
    filter,
    setFilter,
  } = useBooks();

  return (
    <section className={styles.panel}>
      <div className={styles.container}>
        {/* Search */}
        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <Search
              size={18}
              className={styles.searchIcon}
            />

            <input
              type="text"
              placeholder="Rechercher par titre ou auteur..."
              className={styles.input}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.filterButton} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            Tous
          </button>

          <button
            type="button"
            className={`${styles.filterButton} ${
              filter === "available"
                ? styles.active
                : ""
            }`}
            onClick={() =>
              setFilter("available")
            }
          >
            Disponibles
          </button>

          <button
            type="button"
            className={`${styles.filterButton} ${
              filter === "borrowed"
                ? styles.active
                : ""
            }`}
            onClick={() =>
              setFilter("borrowed")
            }
          >
            Empruntés
          </button>
        </div>
      </div>
    </section>
  );
}