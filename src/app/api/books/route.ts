import { NextResponse } from "next/server";

import { books } from "@/src/data/books";
import { bookSchema } from "@/src/lib/validators";

export async function GET() {
  return NextResponse.json(books);
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
  } catch {
    return NextResponse.json(
      {
        message: "Validation Error.",
      },
      {
        status: 400,
      }
    );
  }
}