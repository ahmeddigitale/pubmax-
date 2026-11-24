import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ResultsGallery } from "@/components/sections/ResultsGallery";
import { FounderSection } from "@/components/sections/FounderSection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { OfferComparison } from "@/components/sections/OfferComparison";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { EbookSection } from "@/components/sections/EbookSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="contenu">
        <HeroSection />
        <ProblemSection />
        <TransformationSection />
        <ServicesSection />
        <ResultsGallery />
        <FounderSection />
        <InstagramSection />
        <OfferComparison />
        <ProcessSection />
        <EbookSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
