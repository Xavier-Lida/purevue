import { BookingForm } from "./components/BookingForm";
import { ContactSection } from "./components/ContactSection";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SectionCommercial } from "./components/SectionCommercial";
import { SectionCopropriete } from "./components/SectionCopropriete";
import { SectionResidentiel } from "./components/SectionResidentiel";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <BookingForm />
        <ServicesSection />
        <SectionResidentiel />
        <SectionCommercial />
        <SectionCopropriete />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <footer className="border-t border-slate-100 bg-slate-50 py-8 px-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Nettoyage & Services — Local & Jeune
      </footer>
    </div>
  );
}
