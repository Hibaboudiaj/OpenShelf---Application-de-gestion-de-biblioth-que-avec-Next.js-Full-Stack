import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import Book from "@/src/models/Book";
import { bookSchema } from "@/src/lib/validators";

export async function GET() {
  try {
    await connectDB();

    const books = await Book.find().sort({ createdAt: -1 });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

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
