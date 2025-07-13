"use client";

import { motion } from "framer-motion";
import FooterSection from "./FooterSection";
import NewsletterForm from "./NewsLetterForm";
import SocialLinks from "./SocialLinks";
import { shopLinks, helpLinks, aboutLinks } from "./footerLinks";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <FooterSection title="SHOP" links={shopLinks} />
          <FooterSection title="HELP" links={helpLinks} delay={0.1} />
          <FooterSection title="ABOUT US" links={aboutLinks} delay={0.2} />
          <NewsletterForm />
        </motion.div>
        <SocialLinks />
      </div>
    </footer>
  );
}
