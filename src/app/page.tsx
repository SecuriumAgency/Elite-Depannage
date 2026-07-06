import AmbientBackground from "@/components/AmbientBackground";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex-1">
      <AmbientBackground />
      <Hero />
      <TrustBadges />
      <Services />
      <WhyUs />
      <ContactSection />
    </main>
  );
}
