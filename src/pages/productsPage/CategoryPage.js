import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime"
import { getProductsByCategory } from "../../services/productsApi";
import ProductCard from "../../components/products/ProductCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { categoryNames } from "../../constants/categoryNames";

const CategoryPage = () => {
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [validCategory,setValidCategory] = useState(true);
    const param = useParams();
    const category = param.category;
    useEffect(()=>{
        if(!categoryNames[category]){
            setValidCategory(false);
            return;
        }
        async function fetchProducts() {
            setIsLoading(true);
            try {
                const all = await getProductsByCategory(category);
                setProducts(all);
            } 
            catch(error){
                console.error("Error Fetching products",error);
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchProducts();
    },[category])

    if(!validCategory){
        return <Navigate to="/home/not-found" replace />
    }

    if(isLoading){
        return <div className="text-center"><LoadingSpinner/></div>
    }
    return (
        <Fragment>
            {products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </Fragment>
    )
}

export default CategoryPage;