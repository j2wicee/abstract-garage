import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Services from "./components/Services";
import Work from "./components/Work";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { workItems, reviews } from "./data/content";

// Work and Reviews only appear on the live site once they have real content.
// In dev they always show, with placeholders, so the layout can be checked.
const sections = [
  { id: "services", label: "Services", Component: Services, show: true },
  { id: "work", label: "Work", Component: Work, show: workItems.length > 0 },
  { id: "about", label: "About", Component: About, show: true },
  { id: "reviews", label: "Reviews", Component: Reviews, show: reviews.length > 0 },
  { id: "contact", label: "Contact", Component: Contact, show: true },
].filter((s) => s.show || import.meta.env.DEV);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header links={sections} />
      <main>
        <Hero />
        <Ticker />
        {sections.map((section, i) => (
          <section.Component
            key={section.id}
            number={String(i + 1).padStart(2, "0")}
          />
        ))}
      </main>
      <Footer links={sections} />
    </MotionConfig>
  );
}
