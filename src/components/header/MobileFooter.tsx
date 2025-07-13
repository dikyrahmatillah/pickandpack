import Link from "next/link";
import { mobileFooterLinks1, mobileFooterLinks2 } from "./navLinks";

export default function MobileFooter() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-end items-end gap-4 md:gap-12 px-4 sm:px-8 md:px-16 pb-8 md:pb-16">
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-sm md:text-2xl font-semibold text-gray-700">
        {mobileFooterLinks1.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-indigo-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-sm md:text-2xl font-semibold text-gray-700 md:ml-12">
        {mobileFooterLinks2.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="hover:text-indigo-600"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-600"
            >
              {link.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
