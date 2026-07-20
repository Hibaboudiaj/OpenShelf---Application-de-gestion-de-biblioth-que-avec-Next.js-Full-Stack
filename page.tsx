import ControlPanel from "./src/components/books/ControlPanel/ControlPanel";
import Hero from "./src/components/books/Hero/Hero";
import BookGrid from "./src/components/books/BookGrid/BookGrid"

export default function HomePage() {
  return (
   <div>
    <Hero/>
    <ControlPanel />
    <BookGrid />
   </div>
  );
}