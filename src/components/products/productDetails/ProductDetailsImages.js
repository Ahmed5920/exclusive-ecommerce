const ProductDetailsImages = ({ product }) => {
  let productImage;
  try {
    productImage = require(`../../../assets/images/products/${product.image}`);
  } catch (error) {
    console.log("Image not Found", product.image);
    productImage = require("../../../assets/images/placeholderImage.jpg");
  }

  return (
    <div className="flex">
      {/* left photos */}
      <div className="flex flex-col gap-4 h-[620px] ml-20">
        {[1, 2, 3, 4].map((sideImage, i) => (
          <div key={i} className="h-36 w-36 bg-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={productImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain py-4"
              />
            </div>
          </div>
        ))}
      </div>
      {/* right photos */}
      <div className="bg-gray-200 w-[620px] h-[620px] rounded-xl shadow-sm ml-8">
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={productImage}
            alt={product.name}
            className="h-5/6 w-full object-contain py-12 px-12 bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsImages;
