"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface BooksContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export function BooksProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <BooksContext.Provider
      value={{
        search,
        setSearch,
        filter,
        setFilter,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error(
      "useBooks must be used inside BooksProvider"
    );
  }

  return context;
}