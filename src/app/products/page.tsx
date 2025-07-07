"use client";

import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import Image from "next/image";

const sidebar = [
  "Tipe Box",
  "PREMIUM TEA",
  "SETS",
  "TOP SALES",
  "NEW ARRIVALS",
  "TEAWARE",
  "ACCESSORIES",
];

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function ProductsPage() {
  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-4">
        <ol className="list-reset flex">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">{">"}</span>
          </li>
          <li>Produk</li>
        </ol>
      </nav>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-6xl font-extrabold tracking-tight">Produk Kami:</h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-48 mb-8 lg:mb-0 lg:mr-8">
          <ul className="space-y-3 font-semibold text-lg flex lg:block flex-wrap gap-4">
            {sidebar.map((item, idx) => (
              <li
                key={idx}
                className={
                  idx === 0
                    ? "text-black"
                    : "text-gray-700 hover:text-black cursor-pointer"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-14">
            {products.map((product, idx) => {
              const isBox = isPrime(idx);

              return (
                <div key={product.name} className="max-w-md w-full mx-auto">
                  <div
                    className={`aspect-square w-full mb-6 relative group overflow-hidden ${
                      isBox ? "rounded-none" : "rounded-3xl"
                    }`}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className={`object-cover w-full h-full transition-transform duration-1000 ease-out hover:scale-110 ${
                        isBox ? "rounded-none" : "rounded-3xl"
                      }`}
                      sizes="(max-width: 640px) 100vw, 420px"
                    />
                    <Link
                      href={`/products/${product.slug}`}
                      className="absolute left-0 right-0 bottom-0 translate-y-10 group-hover:-translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <span
                        className={
                          isBox
                            ? "block bg-black text-white py-6 mx-4 text-base shadow-lg text-center rounded-none"
                            : "block bg-black text-white py-6 mx-4 text-base shadow-lg text-center rounded-full"
                        }
                      >
                        Detail
                      </span>
                    </Link>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-bold uppercase text-base sm:text-lg"
                  >
                    {product.name}
                  </Link>
                  <div className="text-base text-gray-500 mb-6 mt-2">
                    {product.utility}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
