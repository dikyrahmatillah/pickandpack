import { notFound } from "next/navigation";
import { fetchUrl } from "@/utils/fetchUrl";
import { Product } from "@/types/product";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";

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
