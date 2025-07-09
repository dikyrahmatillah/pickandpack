"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";

// Define the product type
interface ProductSpecification {
  name: string;
  value: string;
}

interface ProductType {
  id: string | number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  minimumOrder: number;
  specifications: ProductSpecification[];
  relatedProducts: number[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    // For this example, we'll simulate an API call
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock product data - this would come from your API
        const mockProduct: ProductType = {
          id: productId as string,
          name: "Premium Tea Box",
          description:
            "Elegant packaging solution for premium tea brands. Our sustainable materials provide excellent protection while maintaining a luxurious feel. Available with custom printing options to showcase your brand identity.",
          longDescription:
            "Our Premium Tea Box is designed specifically for tea brands looking to elevate their packaging experience. Each box is made from sustainably sourced materials that are both recyclable and biodegradable.\n\nFeatures:\n- Available in multiple sizes to accommodate different tea quantities\n- Customizable with your brand logo and colors\n- Interior compartments to separate tea varieties\n- Sturdy construction to protect delicate tea leaves\n- Elegant finish with matte or glossy options",
          price: 12.99,
          category: "Packaging",
          imageUrl: "/public/images/products/burger-box-1.webp",
          stock: 250,
          minimumOrder: 100,
          specifications: [
            { name: "Material", value: "Recycled Cardboard" },
            { name: "Dimensions", value: "10cm x 10cm x 5cm" },
            { name: "Weight", value: "50g" },
            { name: "Color Options", value: "White, Kraft, Black" },
            { name: "Printing", value: "Digital, Offset, Hot Stamping" },
          ],
          relatedProducts: [2, 3, 4],
        };

        setProduct(mockProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <RoleGuard>
        <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
          <DashboardSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-gray-500">
                Loading product details...
              </div>
            </div>
          </div>
        </main>
      </RoleGuard>
    );
  }

  if (!product) {
    return (
      <RoleGuard>
        <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
          <DashboardSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="text-center p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Product Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The product you&apos;re looking for doesn&apos;t exist or has
                been removed.
              </p>
              <Link
                href="/dashboard/products"
                className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </main>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard>
      <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
        <DashboardSidebar />

        <div className="flex-1 ml-64 p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/dashboard" className="hover:text-gray-700">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link href="/dashboard/products" className="hover:text-gray-700">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </button>

          {/* Product Detail */}
          <div className="bg-white rounded-none shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Left: Product Image */}
              <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
                <div className="h-64 w-64 bg-gray-200 flex items-center justify-center text-gray-400">
                  Product Image
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="md:w-1/2 p-8">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                </div>

                <div className="text-xl font-bold text-gray-900 mb-4">
                  ${product.price.toFixed(2)}
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm border-b pb-2 mb-2">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-semibold text-green-600">
                      In Stock ({product.stock} units)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-2 mb-2">
                    <span className="text-gray-600">Minimum Order</span>
                    <span className="font-semibold">
                      {product.minimumOrder} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold">{product.category}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/products/edit/${product.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 flex-1 text-center"
                  >
                    Edit Product
                  </Link>
                  <Link
                    href="/dashboard/products/order"
                    className="px-4 py-2 bg-gray-800 text-white rounded-none hover:bg-gray-900 flex-1 text-center"
                  >
                    Place Order
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t">
              <div className="px-8 py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Details
                </h2>
                <div className="prose max-w-none">
                  <p className="mb-4">{product.longDescription}</p>
                </div>
              </div>

              {/* Specifications */}
              <div className="px-8 py-6 bg-gray-50 border-t">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Specifications
                </h2>
                <table className="w-full text-left">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="py-2 px-4 font-medium">{spec.name}</td>
                        <td className="py-2 px-4">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
