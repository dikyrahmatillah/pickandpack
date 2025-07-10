"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  objectId: string;
  name: string;
  images?: string; // images is a JSON string
};

export default function SingleProduct() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(
      "https://headwheel-us.backendless.app/api/data/products/85F17778-DC92-4A0E-9A58-4C037FCD88D6"
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  if (!product) return <div>Loading...</div>;

  // Parse images string to array
  let images: string[] = [];
  if (product.images) {
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [];
    }
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <div style={{ display: "flex", gap: 8 }}>
        {images.map((img, idx) => (
          <Image
            key={img}
            src={img}
            alt={`${product.name} image ${idx + 1}`}
            width={120}
            height={90}
            style={{ borderRadius: 8, height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
}
