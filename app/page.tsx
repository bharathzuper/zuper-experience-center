import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import FeatureShowcase from "@/components/FeatureShowcase";
import Footer from "@/components/Footer";
import { features } from "@/lib/features";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeatureShowcase features={features} />
      <Footer />
    </main>
  );
}
