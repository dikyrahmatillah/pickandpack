import Link from "next/link";
import { motion } from "framer-motion";

interface FooterSectionProps {
  title: string;
  links: { href: string; label: string }[];
  delay?: number;
}

export default function FooterSection({
  title,
  links,
  delay = 0,
}: FooterSectionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-800 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
