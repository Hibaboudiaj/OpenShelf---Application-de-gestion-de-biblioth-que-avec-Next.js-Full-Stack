import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import { bookSchema } from "@/src/lib/validators";
import Book from "@/src/models/Book";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    await connectDB();

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        {
          message: "Book not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("GET /api/books/[id] error:", error);

    return NextResponse.json(
      {
        message: "Server error while fetching the book.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const data = bookSchema.parse(body);

    await connectDB();

    const book = await Book.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!book) {
      return NextResponse.json(
        {
          message: "Book not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("PUT /api/books/[id] error:", error);

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
        message: "Server error while updating the book.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    await connectDB();

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return NextResponse.json(
        {
          message: "Book not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/books/[id] error:",
      error,
    );

    return NextResponse.json(
      {
        message: "Server error while deleting the book.",
      },
      {
        status: 500,
      },
    );
  }
}