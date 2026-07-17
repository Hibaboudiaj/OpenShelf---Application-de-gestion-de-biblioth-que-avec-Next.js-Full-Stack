import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import { bookSchema } from "@/src/lib/validators";
import Book from "@/src/models/Book";

const books = [
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
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const book = books.find((book) => book._id === id);

  if (!book) {
    return NextResponse.json(
      { message: "Book not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const validatedData = bookSchema.parse(body);

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      validatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return NextResponse.json(
        { message: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Validation or Server Error." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json(
        { message: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Book deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}