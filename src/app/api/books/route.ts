import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import { bookSchema } from "@/src/lib/validators";
import Book from "@/src/models/Book";

export async function GET() {
  try {
    await connectDB();

    const books = await Book.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("GET /api/books error:", error);

    return NextResponse.json(
      {
        message: "Server error while fetching books.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = bookSchema.parse(body);

    await connectDB();

    const book = await Book.create(data);

    return NextResponse.json(book, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/books error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          message: "Validation error.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          message: "This ISBN already exists.",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Server error while creating the book.",
      },
      {
        status: 500,
      },
    );
  }
}