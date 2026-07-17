import { connectDB } from "@/src/lib/db";
import Book from "@/src/models/Book";
import { bookSchema } from "@/src/lib/validators";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      _id: "1",
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Development",
      publicationYear: 2018,
      description:
        "A practical guide to building good habits and breaking bad ones.",
      available: true,
    },
    {
      _id: "2",
      title: "1984",
      author: "George Orwell",
      category: "Novel",
      publicationYear: 1949,
      description:
        "A dystopian novel about a totalitarian society controlled by Big Brother.",
      available: false,
    },
    {
      _id: "3",
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      publicationYear: 2008,
      description:
        "A handbook of agile software craftsmanship.",
      available: true,
    },
  ]);
}

// export async function GET() {
//   try {
//     await connectDB();

//     const books = await Book.find().sort({ createdAt: -1 });

//     return NextResponse.json(books, { status: 200 });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData = bookSchema.parse(body);

    const book = await Book.create(validatedData);

    return NextResponse.json(book, { status: 201 });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Validation or Server Error",
        error,
      },
      {
        status: 400,
      }
    );
  }
}
