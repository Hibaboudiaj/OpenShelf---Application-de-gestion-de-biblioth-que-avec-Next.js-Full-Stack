import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import { bookSchema } from "@/src/lib/validators";
import Book from "@/src/models/Book";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        { message: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
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