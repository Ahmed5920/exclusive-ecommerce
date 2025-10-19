import { Fragment } from "react/jsx-runtime";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductsByCategory,
} from "../../services/productsApi";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ProductDetailsImages from "../../components/products/productDetails/ProductDetailsImages";
import ProductDetailsDescription from "../../components/products/productDetails/ProductDetailsDescription";
import ProductDetailsRelatedItems from "../../components/products/productDetails/ProductDetailsRelatedItems";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();
  const category = param.category;
  const productId = param.productId;

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const product = await getProductById(category, productId);
        const productsByCategory = await getProductsByCategory(category);
        setProduct(product);
        setProductsCategory(productsByCategory);
      } catch (error) {
        console.error("Error Fetching product", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [category, productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-60">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/home/not-found" replace />;
  }

  return (
    <Fragment>
      <div className="ml-4 md:ml-24 space-x-3 mt-8 md:mt-16 text-gray-400 text-sm md:text-base">
        <Link to="/home">Home</Link>
        <span>/</span>
        <Link to={`/home/${category}`}>{category}</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row mt-10 md:mt-20 items-center md:items-start gap-8 md:gap-0">
        <ProductDetailsImages product={product} />
        <ProductDetailsDescription product={product} />
      </div>

      <ProductDetailsRelatedItems
        product={product}
        productsCategory={productsCategory}
      />
    </Fragment>
  );
};

export default ProductDetailsPage;