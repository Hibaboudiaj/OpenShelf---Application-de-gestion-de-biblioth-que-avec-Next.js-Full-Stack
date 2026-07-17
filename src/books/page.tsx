import BookDetails from "@/src/components/books/BookDetails/BookDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <BookDetails id={id} />;
}