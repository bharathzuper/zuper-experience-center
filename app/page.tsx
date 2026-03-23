import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import { features } from "@/lib/features";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeatureGrid features={features} />
      <Footer />
    </main>
  );
}
