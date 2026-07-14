import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import Book from "@/src/models/Book";

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
