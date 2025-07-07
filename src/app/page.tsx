import HeroSection from "@/components/homepage/HeroSection";
import ProductSection from "@/components/homepage/ProductSection";
import WhyUsSection from "@/components/homepage/WhyUsSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import PartnerSection from "@/components/homepage/PartnerSection";
import JournalSection from "@/components/homepage/JournalSection";
import PhilosophySection from "@/components/homepage/PhilosophySection";
import CallUsSection from "@/components/homepage/CallUsSection";
import FollowUsSection from "@/components/homepage/FollowUsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <WhyUsSection />
      <TestimonialsSection />
      <PartnerSection />
      <JournalSection />
      <PhilosophySection />
      <CallUsSection />
      <FollowUsSection />
    </main>
  );
}
