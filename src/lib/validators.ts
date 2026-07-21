import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters."),

  author: z
    .string()
    .min(1, "Author is required."),

  isbn: z
    .string()
    .min(1, "ISBN is required."),

  category: z
    .string()
    .min(1, "Category is required."),

  publicationYear: z
    .number()
    .int("Publication year must be an integer.")
    .min(1, "Publication year must be valid."),

  description: z
    .string()
    .min(
      10,
      "Description must contain at least 10 characters.",
    ),

  available: z.boolean().optional(),
});

export type BookInput = z.infer<typeof bookSchema>;