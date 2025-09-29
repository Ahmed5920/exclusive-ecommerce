import { Fragment } from "react/jsx-runtime"
import { getAllProducts } from "../../services/productsApi";
import { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const AllProductPage = () => {
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchProducts() {
            try{
                const all = await getAllProducts();
                setProducts(all);
            }
            catch(error){
                console.error("Error Fetching products",error);
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchProducts();
    },[])

    if(isLoading){
        return (
            <div ><LoadingSpinner/></div>
        )
    }
    return (
        <Fragment>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </Fragment>
    )
}

export default AllProductPage;