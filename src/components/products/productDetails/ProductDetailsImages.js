const ProductDetailsImages = ({ product }) => {
  let productImage;
  try {
    productImage = require(`../../../assets/images/products/${product.image}`);
  } catch (error) {
    console.log("Image not Found", product.image);
    productImage = require("../../../assets/images/placeholderImage.jpg");
  }

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start md:ml-20">
      {/* left photos */}
      <div className="flex md:flex-col gap-3 md:gap-4 md:h-[620px] order-2 md:order-1 mt-4 md:mt-0">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="h-20 w-20 md:h-36 md:w-36 bg-gray-200 rounded-xl shadow-sm"
          >
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={productImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain py-2 md:py-4"
              />
            </div>
          </div>
        ))}
      </div>

      {/* main photo */}
      <div className="bg-gray-200 w-[320px] h-[320px] md:w-[620px] md:h-[620px] rounded-xl shadow-sm ml-0 md:ml-8 order-1 md:order-2">
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={productImage}
            alt={product.name}
            className="h-5/6 w-full object-contain py-6 md:py-12 px-6 md:px-12 bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsImages;