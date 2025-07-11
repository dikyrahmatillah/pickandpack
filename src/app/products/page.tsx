"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const sidebar = ["Semua Produk", "Makanan", "Minuman", "Pengiriman"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("Semua Produk");
  const [sort, setSort] = useState("newest");
  const pageSize = 4;

  type Product = {
    name: string;
    slug: string;
    images: string[];
    utility: string;
  };
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch total count
    async function fetchTotal() {
      let countUrl =
        "https://headwheel-us.backendless.app/api/data/products/count";
      if (filter !== "Semua Produk") {
        countUrl += `?where=category%3D'${encodeURIComponent(filter)}'`;
      }
      const countRes = await fetch(countUrl);
      const countData = await countRes.json();
      setTotal(Number(countData));
    }
    fetchTotal();
  }, [filter]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let where = "";
      if (filter !== "Semua Produk") {
        where = `&where=category%3D'${encodeURIComponent(filter)}'`;
      }
      let sortBy = "";
      if (sort === "price-asc") sortBy = "&sortBy=price%20asc";
      else if (sort === "price-desc") sortBy = "&sortBy=price%20desc";
      else if (sort === "name-asc") sortBy = "&sortBy=name%20asc";
      else if (sort === "name-desc") sortBy = "&sortBy=name%20desc";
      else if (sort === "oldest") sortBy = "&sortBy=created%20asc";
      else if (sort === "newest") sortBy = "&sortBy=created%20desc";

      const res = await fetch(
        `https://headwheel-us.backendless.app/api/data/products?pageSize=${pageSize}&offset=${
          (page - 1) * pageSize
        }${where}${sortBy}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [page, filter, sort]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-20 md:pt-25">
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
        <h1 className="text-4xl font-extrabold tracking-tight">Produk Kami:</h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-48 mb-8 lg:mb-0 lg:mr-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="font-semibold text-base mb-4 text-gray-800 tracking-wide">
              Kategori
            </div>
            <ul className="space-y-2 font-semibold text-sm">
              {sidebar.map((item, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer px-3 py-2 transition-colors
                    ${
                      filter === item
                        ? "bg-black text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => {
                    setFilter(item);
                    setPage(1);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Sort Button Group */}
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">Urutkan:</div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSort(opt.value);
                    setPage(1);
                  }}
                  className={`px-2 py-1 border transition-colors duration-150 cursor-pointer
                    ${
                      sort === opt.value
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    }
                  `}
                >
                  <span className="text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <section className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-8">
              {products.map((product, idx) => {
                const isBox = isPrime(idx);
                let images: string[] = [];
                if (typeof product.images === "string")
                  images = JSON.parse(product.images);

                return (
                  <div key={product.name} className="max-w-full w-full mx-auto">
                    <div
                      className={`aspect-square w-full mb-4 relative group overflow-hidden ${
                        isBox ? "rounded-none" : "rounded-[20%]"
                      }`}
                    >
                      <Image
                        src={images[0]}
                        alt={product.name}
                        fill
                        className={`object-cover w-full h-full transition-transform duration-1000 ease-out hover:scale-110 ${
                          isBox ? "rounded-none" : "rounded-[20%]"
                        }`}
                        sizes="(max-width: 640px) 100vw, 420px"
                      />
                      <Link
                        href={`/products/${product.slug}`}
                        className="absolute left-0 right-0 bottom-0 translate-y-8 group-hover:-translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <span
                          id="contact-button-black"
                          className={
                            isBox
                              ? "block bg-black text-white py-10 mx-4 text-lg shadow-lg text-center rounded-none"
                              : "block bg-black text-white py-10 mx-4 text-lg shadow-lg text-center rounded-full"
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
                    <div className="text-base text-gray-500 mb-4 mt-1">
                      {product.utility}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-xl ${
                page === i + 1 ? "bg-white text-black border" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
