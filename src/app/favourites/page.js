'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { getCartData } from "@/components/service/cart";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import productService from '@/services/product';
import CategoryProducts from '@/components/atoms/search';
import Header from '@/components/atoms/Header/Header';

const Favourites = () => {
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const getSearchedProducts = async () => {
            setLoading(true);

            const data = await productService.getFavoritesProducts();
            setProductData(data && data.length > 0 ? data : []);

            setLoading(false);
            getCartData();
        }

        getSearchedProducts();
    }, [])

    return (
        <>
            <Layout>
                {loading ? <Shopskeleton /> : <>
                    <Header />
                    <CategoryProducts
                        cardHeading={"Favorites Products"}
                        productData={productData}
                    />
                </>}
            </Layout>
        </>

    );
};

export default Favourites;