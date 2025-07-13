import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchUrl } from "@/utils/fetchUrl";
import { Product } from "@/types/product";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchUrl("products", `?where=slug%3D'${slug}'`);
    const product: Product = data[0];

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }

    let images: string[] = [];
    if (product.images) {
      try {
        images = JSON.parse(product.images);
      } catch {
        images = [];
      }
    }

    const imageUrl = images.length > 0 ? images[0] : "/tea-placeholder.svg";

    return {
      title: product.name,
      description:
        product.description ||
        `Discover ${product.name} - premium packaging solution by Pick & Pack. Innovative design meets exceptional quality.`,
      keywords: [
        product.name,
        product.category || "packaging",
        "Pick & Pack product",
        "packaging solution",
        "custom packaging",
        "brand packaging",
      ],
      openGraph: {
        title: `${product.name} - Pick & Pack`,
        description:
          product.description ||
          `Discover ${product.name} - premium packaging solution by Pick & Pack.`,
        url: `https://pickandpack.vercel.app/products/${slug}`,
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - Pick & Pack`,
        description:
          product.description ||
          `Discover ${product.name} - premium packaging solution by Pick & Pack.`,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://pickandpack.vercel.app/products/${slug}`,
      },
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchUrl("products", `?where=slug%3D'${slug}'`);
  const product: Product = data[0];

  if (!product) {
    notFound();
  }

  let images: string[] = [];
  if (product.images) {
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [];
    }
  }

  return (
    <main className="px-2 sm:px-4 md:px-8 lg:px-28 py-8 pt-20 md:pt-25">
      <div className="text-xs sm:text-sm text-gray-400 mb-4">
        Home / <span className="text-gray-900">{product.name}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 w-full">
        <ProductGallery images={images} name={product.name} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
}
