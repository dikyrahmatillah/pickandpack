import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-10 md:px-28 mt-40 mb-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SHOP</h3>
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  products
                </Link>
              </li>
              <li>
                <Link
                  href="/top-sales"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  top sales
                </Link>
              </li>
              <li>
                <Link
                  href="/premium-tea"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  premium tea
                </Link>
              </li>
              <li>
                <Link
                  href="/set"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  set
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns-exchanges"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  returns and exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  terms and conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  about us
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="text-gray-800 hover:text-white transition-colors"
                >
                  journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GET 20% OFF</h3>
            <p className="text-gray-800 mb-4">
              Your first order + future sales updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2  border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              You can safely unsubscribe anytime from any email footer. Here is
              our{" "}
              <Link
                href="/privacy-policy"
                className="text-green-400 hover:text-green-300"
              >
                privacy policy
              </Link>
            </p>
          </div>
        </div>

        {/* Social Media and Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">FOLLOW US</h3>
              <a
                href="https://www.instagram.com/tea_flow_usa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-white transition-colors"
              >
                @tea_flow
              </a>
            </div>
            <div className="text-center text-gray-400 text-sm">
              © 2024 Tea Flow. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
