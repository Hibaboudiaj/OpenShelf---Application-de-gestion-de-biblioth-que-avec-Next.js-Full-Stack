import { Book } from "@/src/types/book";

export const books: Book[] = [
  {
    _id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    category: "Self Development",
    publicationYear: 2018,
    description:
      "A practical guide to building good habits and breaking bad ones.",
    available: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    category: "Novel",
    publicationYear: 1949,
    description:
      "A dystopian novel about a totalitarian society controlled by Big Brother.",
    available: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    category: "Programming",
    publicationYear: 2008,
    description:
      "A handbook of agile software craftsmanship.",
    available: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];