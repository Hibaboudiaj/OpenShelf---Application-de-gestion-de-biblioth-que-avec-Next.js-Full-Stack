import { NextResponse } from "next/server";

import { books } from "@/src/data/books";
import { bookSchema } from "@/src/lib/validators";

export async function GET(
  request: Request,
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
    const { id } = await params;

    const body = await request.json();

    const data = bookSchema.parse(body);

    const index = books.findIndex((book) => book._id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Book not found." },
        { status: 404 }
      );
    }

    books[index] = {
      ...books[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(books[index]);
  } catch {
    return NextResponse.json(
      { message: "Validation Error." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const index = books.findIndex((book) => book._id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Book not found." },
      { status: 404 }
    );
  }

  books.splice(index, 1);

  return NextResponse.json({
    message: "Book deleted successfully.",
  });
}