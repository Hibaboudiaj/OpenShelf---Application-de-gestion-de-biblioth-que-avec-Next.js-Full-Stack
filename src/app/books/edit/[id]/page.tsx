import BookForm from "@/src/components/books/BookForm/BookForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBookPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <BookForm id={id} />;
}