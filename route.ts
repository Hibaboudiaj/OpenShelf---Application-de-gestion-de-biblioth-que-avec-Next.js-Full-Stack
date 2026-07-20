import { NextResponse } from "next/server";

import { books } from "@/src/data/books";
import { bookSchema } from "@/src/lib/validators";

// نخلي هاد imports غير للمستقبل مع MongoDB
// import { connectDB } from "@/src/lib/db";
// import Book from "@/src/models/Book";

export async function GET() {
  // MongoDB Version
  /*
  try {
    await connectDB();

    const books = await Book.find().sort({ createdAt: -1 });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
  */

  // Static Data Version
  return NextResponse.json(books, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = bookSchema.parse(body);

    const newBook = {
      _id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    books.push(newBook);

    return NextResponse.json(newBook, {
      status: 201,
    });

    // MongoDB Version
    /*
    await connectDB();

    const book = await Book.create(data);

    return NextResponse.json(book, {
      status: 201,
    });
    */
  } catch {
    return NextResponse.json(
      {
        message: "Validation Error",
      },
      {
        status: 400,
      }
    );
  }
}