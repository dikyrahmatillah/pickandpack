"use client";

import AboutHero from "./components/AboutHero";
import AboutHistory from "./components/AboutHistory";
import AboutTeam from "./components/AboutTeam";
import AboutCulture from "./components/AboutCulture";

export default function AboutPage() {
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <main className="px-4 sm:px-8 md:px-28 py-2 pt-4 md:pt-8 mt-12">
      <AboutHero textVariant={textVariant} />
      <AboutHistory sectionVariant={sectionVariant} textVariant={textVariant} />
      <AboutTeam textVariant={textVariant} />
      <AboutCulture sectionVariant={sectionVariant} />
    </main>
  );
}
