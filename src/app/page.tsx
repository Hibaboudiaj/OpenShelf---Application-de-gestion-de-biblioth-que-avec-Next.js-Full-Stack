import ControlPanel from "../components/books/ControlPanel/ControlPanel";
import Hero from "../components/books/Hero/Hero";
import BookGrid from "../components/books/BookGrid/BookGrid"

export default function HomePage() {
  return (
   <div>
    <Hero/>
    <ControlPanel />
    <BookGrid />
   </div>
  );
}