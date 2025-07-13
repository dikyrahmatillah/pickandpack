import HeroSection from "./components/HeroSection.tsx";
import TeamMembersSection from "./components/TeamMembersSection";
import CompanyValuesSection from "./components/CompanyValuesSection";

export default function TeamPage() {
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <main className="px-4 sm:px-8 md:px-28 py-2 pt-4 md:pt-8 mt-12">
      <HeroSection />
      <TeamMembersSection sectionVariant={sectionVariant} />
      <CompanyValuesSection sectionVariant={sectionVariant} />
    </main>
  );
}
