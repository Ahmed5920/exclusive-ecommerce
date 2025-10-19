import { useState } from "react";
import { GrLinkNext, GrLinkPrevious, GrLinkDown, GrLinkUp } from "react-icons/gr";
import ProductCard from "../ProductCard";

const ProductDetailsRelatedItems = ({ product, productsCategory }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerSlide = 4;

  const restOfProducts = productsCategory.filter(
    (currProduct) => currProduct.id !== product.id
  );

  const nextSlide = () => {
    if (startIndex + itemsPerSlide < restOfProducts.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-20 md:mt-44 ml-4 md:ml-20 mr-4 md:mr-20 mb-24">
      <div className="relative flex items-center justify-between">
        <h1 className="border-l-[8px] md:border-l-[16px] border-red-500 pl-2 font-bold text-xl md:text-2xl mb-6 md:mb-12">
          Related Items
        </h1>

        <div>
          {startIndex > 0 && (
            <button
              onClick={prevSlide}
              className="hidden md:block absolute top-1/2 right-12 md:right-16 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition"
            >
              <GrLinkPrevious size={18} />
            </button>
          )}
          {startIndex + itemsPerSlide < restOfProducts.length && (
            <button
              onClick={nextSlide}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition"
            >
              <GrLinkNext size={18} />
            </button>
          )}
          {startIndex > 0 && (
            <button
              onClick={prevSlide}
              className="md:hidden absolute top-1/2 right-12 md:right-16 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition"
            >
              <GrLinkDown size={18} />
            </button>
          )}
          {startIndex + itemsPerSlide < restOfProducts.length && (
            <button
              onClick={nextSlide}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition"
            >
              <GrLinkUp size={18} />
            </button>
          )}
        </div>
      </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start transition-all transform duration-1000">
          {restOfProducts
            .slice(startIndex, startIndex + itemsPerSlide)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  );
};

export default ProductDetailsRelatedItems;
