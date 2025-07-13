import Link from "next/link";
import { mobileNavLinks } from "./navLinks";

import type { Session } from "next-auth";

interface Props {
  session: Session | null;
  setIsMenuOpen: (open: boolean) => void;
}

export default function MobileNav({ session, setIsMenuOpen }: Props) {
  return (
    <nav className="flex flex-col items-end gap-3 md:gap-5 mt-3 md:mt-5 px-4 sm:px-6 md:px-8">
      {mobileNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      {session?.user ? (
        <Link
          href="/dashboard"
          className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase text-gray-900 hover:text-indigo-600 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </Link>
      )}
    </nav>
  );
}
