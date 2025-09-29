import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
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
    <div className="mt-44 ml-20 mr-20 mb-24">
      <div className=" relative flex">
        <h1 className="border-l-[16px] border-red-500 pl-2 font-bold text-2xl mb-12">
          Related Items
        </h1>
        <div>
          {startIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute top-1/2 right-16 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
            >
              <GrLinkPrevious size={20} />
            </button>
          )}

          {/* Next Button */}
          {startIndex + itemsPerSlide < restOfProducts.length && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
            >
              <GrLinkNext size={20} />
            </button>
          )}
        </div>
      </div>
      {/* Slide Container */}
      <div className="flex gap-8 transition-all -transform duration-1000">
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
