import Hero from "@/src/components/books/Hero/Hero";
import ControlPanel from "@/src/components/books/ControlPanel/ControlPanel";
import BookGrid from "@/src/components/books/BookGrid/BookGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ControlPanel />
      <BookGrid />
    </>
  );
}