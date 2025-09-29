import { Fragment } from "react/jsx-runtime";
import HomeBanner from "../components/home/HomeBanner";
import HomeContent from "../components/home/HomeContent";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getAllBanners , getAllProducts } from "../services/productsApi";
import { useState, useEffect } from "react";
import AboutServices from "../components/about/AboutServices";

const HomePage = () => {
    const [products,setProducts] = useState([]);
    const [banners,setBanners] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchProducts() {
            try{
                const allBanners = await getAllBanners();
                const allProducts = await getAllProducts();
                const randomProducts=allProducts.sort(() => Math.random() - 0.5);
                setBanners(allBanners);
                setProducts(randomProducts);
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
            <div className="flex items-center justify-center h-screen" ><LoadingSpinner/></div>
        )
    }
    return (
        <Fragment>
            <HomeBanner banners={banners}/>
            <HomeContent products={products} duration={2*24*60*60*1000}/>
            <AboutServices/>
        </Fragment>
    )
}

export default HomePage;