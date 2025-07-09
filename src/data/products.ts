export const products = [
  {
    id: 1,
    slug: "lunch-box",
    name: "Lunch Box",
    images: [
      "/images/products/lunch-box-1.webp",
      "/images/products/lunch-box-2.webp",
    ],
    utility: "Cocok untuk packaging makanan takeaway",
    description:
      "Packaging lunch box ini memastikan produk/makanan Anda terjaga higienitasnya serta memberikan kemudahan bagi customer untuk menikmati makanan/produk Anda.",
    material: "Kertas Food Grade",
    size: "Medium",
  },
  {
    id: 2,
    slug: "burger-box",
    name: "Kotak Burger",
    images: [
      "/images/products/burger-box-1.webp",
      "/images/products/burger-box-2.webp",
      "/images/products/burger-box-3.webp",
    ],
    utility: "Cocok untuk packaging burger",
    description:
      "Packaging yang cocok untuk menjadi opsi yang praktis dan hemat biaya untuk pengemasan makanan take away karena ukurannya dapat disesuaikan dengan kebutuhan Anda.",
    material: "Kertas Duplex",
    size: "Small/Medium",
  },
  {
    id: 3,
    slug: "food-bag",
    name: "Kantong Makanan",
    images: ["/images/products/food-bag.webp"],
    utility: "Cocok untuk packaging makanan dan produk dengan ukuran kecil",
    description:
      "Penggunaan material yang tipis dan ringan membuat jenis kemasan ini cocok untuk mengemas produk berukuran kecil sehingga menambah kesan manis bagi produk Anda.",
    material: "Kertas Kraft",
    size: "Small",
  },
  {
    id: 4,
    slug: "paper-bowl",
    name: "Paper Bowl",
    images: [
      "/images/products/paper-bowl-1.webp",
      "/images/products/paper-bowl-2.webp",
    ],
    utility: "Cocok untuk packaging makanan berkuah",
    description:
      "Paper bowl ini terbuat dari bahan kertas yang ramah lingkungan dan aman untuk makanan. Dengan desain yang praktis, paper bowl ini cocok untuk mengemas makanan berkuah seperti sup, mie, atau salad.",
    material: "Kertas Food Grade",
    size: "Large",
  },
  {
    id: 5,
    slug: "wrapper",
    name: "Wrapper",
    images: [
      "/images/products/wrapper-1.webp",
      "/images/products/wrapper-2.webp",
    ],
    utility: "Cocok untuk packaging makanan seperti burger, sandwich, dan roti",
    description:
      "Wrapper ini sangat praktis dan hemat biaya untuk pengemasan makanan take away karena ukurannya dapat disesuaikan dengan kebutuhan Anda.",
    material: "Kertas Greaseproof",
    size: "Custom",
  },
  {
    id: 6,
    slug: "coaster",
    name: "Coaster",
    images: [
      "/images/products/coaster-1.webp",
      "/images/products/coaster-2.webp",
    ],
    utility: "Cocok untuk kebutuhan printing restoran, cafe, atau hotel",
    description:
      "Coaster ini dapat dicetak custom sesuai kebutuhan branding restoran, cafe, atau hotel Anda.",
    material: "Kertas Tebal",
    size: "Custom",
  },
  {
    id: 7,
    slug: "sleeve",
    name: "Sleeve",
    images: [
      "/images/products/sleeve-1.webp",
      "/images/products/sleeve-2.webp",
      "/images/products/sleeve-3.webp",
    ],
    utility: "Cocok untuk packaging minuman seperti kopi, teh, atau jus",
    description:
      "Sleeve ini membantu menjaga suhu minuman dan memberikan kenyamanan saat memegang gelas panas atau dingin.",
    material: "Kertas Berlapis",
    size: "Custom",
  },
  {
    id: 8,
    slug: "mailer-box",
    name: "Kotak Kardus Mailer",
    images: [
      "/images/products/kardus-mailer-1.webp",
      "/images/products/kardus-mailer-2.webp",
    ],
    utility:
      "Cocok untuk packaging pengiriman jarak jauh, pakaian, makanan, produk pecah belah",
    description:
      "Mailer Box memberikan keamanan bagi produk Anda selama proses pengiriman. Berikan pengalaman terbaik ketika membuka paket melalui box yang dibuat khusus untuk produk Anda.",
    material: "Kardus Tebal",
    size: "Large",
  },
  {
    id: 9,
    slug: "eco-cup",
    name: "Eco Cup",
    images: [
      "/images/products/eco-cup-1.webp",
      "/images/products/eco-cup-2.webp",
    ],
    utility: "Cocok untuk minuman dingin dan panas, ramah lingkungan",
    description:
      "Eco Cup terbuat dari bahan biodegradable yang aman untuk lingkungan dan cocok untuk berbagai jenis minuman.",
    material: "Biodegradable Paper",
    size: "Medium",
  },
];

export type Product = {
  images: string[];
  utility: string;
  material?: string;
  size?: string;
  description: string;
  name: string;
  slug: string;
  id: number;
};
