import { fetchUrl } from "@/utils/fetchUrl";
import { Product } from "@/types/product";
import { Journal } from "@/types/journal";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pickandpack.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/journals`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products: Product[] = await fetchUrl("products", "?pageSize=100");
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Dynamic journal routes
  let journalRoutes: MetadataRoute.Sitemap = [];
  try {
    const journals: Journal[] = await fetchUrl("journals", "?pageSize=100");
    journalRoutes = journals.map((journal) => ({
      url: `${baseUrl}/journals/${journal.slug}`,
      lastModified: journal.publishDate
        ? new Date(journal.publishDate)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching journals for sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
