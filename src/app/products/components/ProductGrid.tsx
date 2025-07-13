import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <motion.div
      className="grid grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product, idx) => {
        const isBox = isPrime(idx);
        let images: string[] = [];
        if (typeof product.images === "string")
          images = JSON.parse(product.images);

        return (
          <motion.div
            key={product.objectId}
            className="max-w-full w-full mx-auto"
            variants={itemVariants}
          >
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
                  data-cursor="white"
                  className={
                    isBox
                      ? "block bg-black text-white py-[8%] mx-[7%] text-lg shadow-lg text-center rounded-none"
                      : "block bg-black text-white py-[8%] mx-[7%] text-lg shadow-lg text-center rounded-full"
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}
