import Link from "next/link";
import type { Session } from "next-auth";

interface Props {
  isMenuOpen: boolean;
  session: Session | null;
}

export default function DesktopNav({ isMenuOpen, session }: Props) {
  return (
    <div
      className={`
        hidden xl:flex items-center gap-6
        transition-all duration-300
        ${
          isMenuOpen
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0 pointer-events-auto"
        }
      `}
    >
      <Link
        href="/products"
        className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
      >
        products
      </Link>
      <Link
        href="/about-us"
        className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
      >
        about
      </Link>
      <Link
        href="/team"
        className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
      >
        team
      </Link>
      <Link
        href="/journals"
        className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
      >
        journals
      </Link>
      {session?.user ? (
        <Link
          href={
            session.user.role === "viewer" ? "/dashboard/viewer" : "/dashboard"
          }
          className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="uppercase text-gray-900 hover:text-gray-700 text-sm font-semibold tracking-wide"
        >
          Login
        </Link>
      )}
    </div>
  );
}
