"use client";

import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);

  const [selectedIdx, setSelectedIdx] = useState(0);
  if (!product) return notFound();

  // Assume product.images: string[], product.options: ProductOption[], etc.
  // Fallbacks for demo:
  const images: string[] = product.images || [];

  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      {/* Breadcrumb at top of image */}
      <div className="text-gray-400 text-2xl mb-8">
        Home / <span className="text-gray-900">{product.name}</span>
      </div>
      <div className="w-full h-full flex gap-20">
        {/* Left: Images */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-[150px] h-[150px] relative cursor-pointer border-4 ${
                    selectedIdx === idx
                      ? "border-gray-900"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            {/* Main image */}
            <div className="w-[1000px] h-[1000px] rounded-[15%] overflow-hidden">
              <Image
                src={images[selectedIdx]}
                alt={product.name}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
        {/* Product details */}
        <div className="flex-1 flex flex-col gap-y-2">
          <Link href="/products" className="text-gray-500 text-lg mb-4">
            ← Kembali ke daftar produk
          </Link>
          <h1 className="text-[100px] font-bold m-0">{product.name}</h1>
          <div className="mt-6 mb-2 text-gray-500 text-xl">Model:</div>
          <div className="text-2xl mb-6">{product.name.toUpperCase()}</div>
          <div className="text-gray-500 text-xl mb-2">Cocok Untuk:</div>
          <div className="text-2xl mb-6">{product.utility}</div>
          <div className="text-gray-500 text-xl mb-2">Deskripsi:</div>
          <div className=" text-2xl mb-6">{product.description}</div>
          <div className="flex flex-wrap gap-3 mb-8"></div>
          <div className="flex items-center gap-6 mb-4">
            <button className="bg-gray-900 text-white border-none rounded-full px-16 py-6 text-[22px] font-bold flex items-center gap-4 cursor-pointer">
              <span className="text-2xl">🛒</span> Hubungi Kami
            </button>
          </div>
          <div className="mt-8 text-gray-700 text-lg flex items-center gap-3">
            <span className="text-2xl">🖐️</span>
            Every time you buy our premium tea, you help clean the ocean of
            plastic!
          </div>
        </div>
      </div>
    </main>
  );
}
