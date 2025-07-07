export const products = [
  {
    id: 1,
    slug: "paper-bag",
    name: "Lunch Box",
    images: [
      "/images/products/lunch-box-1.webp",
      "/images/products/lunch-box-2.webp",
    ],
    utility: "Cocok untuk packaging makanan takeaway",
    description:
      "Packaging lunch box ini memastikan produk/makanan Anda terjaga higienitasnya serta memberikan kemudahan bagi customer untuk menikmati makanan/produk Anda.",
    model: "LUNCH BOX",
  },
  {
    id: 2,
    slug: "kotak-burger",
    name: "Kotak Burger",
    images: [
      "/images/products/burger-box-1.webp",
      "/images/products/burger-box-2.webp",
      "/images/products/burger-box-3.webp",
    ],
    utility: "Cocok untuk packaging burger",
    description:
      "Packaging yang cocok untuk menjadi opsi yang praktis dan hemat biaya untuk pengemasan makanan take away karena ukurannya dapat disesuaikan dengan kebutuhan Anda.",
    model: "KOTAK BURGER",
  },
  {
    id: 3,
    slug: "kantong-makanan",
    name: "Kantong Makanan",
    images: ["/images/products/food-bag.webp"],
    utility: "Cocok untuk packaging makanan dan produk dengan ukuran kecil",
    description:
      "Penggunaan material yang tipis dan ringan membuat jenis kemasan ini cocok untuk mengemas produk berukuran kecil sehingga menambah kesan manis bagi produk Anda.",
    model: "KANTONG MAKANAN",
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
    model: "PAPER BOWL",
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
      "Packaging yang cocok untuk menjadi opsi yang praktis dan hemat biaya untuk pengemasan makanan take away karena ukurannya dapat disesuaikan dengan kebutuhan Anda.",
    model: "WRAPPER",
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
      "Packaging yang cocok untuk menjadi opsi yang praktis dan hemat biaya untuk pengemasan makanan take away karena ukurannya dapat disesuaikan dengan kebutuhan Anda.",
    model: "COASTER",
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
      "Packaging yang cocok untuk menjadi opsi yang praktis dan hemat biaya untuk pengemasan makanan take away karena ukurannya dapat disesuaikan dengan kebutuhan Anda.",
    model: "SLEEVE",
  },
  {
    id: 8,
    slug: "kotak-kardus-mailer",
    name: "Kotak Kardus Mailer",
    images: [
      "/images/products/kardus-mailer-1.webp",
      "/images/products/kardus-mailer-2.webp",
    ],
    utility:
      "Cocok untuk packaging pengiriman jarak jauh, pakaian, makanan, produk pecah belah",
    description:
      "Mailer Box memberikan keamanan bagi produk Anda selama proses pengiriman. Berikan pengalaman terbaik ketika membuka paket melalui box yang dibuat khusus untuk produk Anda.",
    model: "KOTAK KARDUS MAILER",
  },
];

export type Product = {
  model: string;
  images: string[];
  utility: string;
  // add other fields as needed
};
