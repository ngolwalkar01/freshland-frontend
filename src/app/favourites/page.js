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

    const getSearchedProducts = async () => {
        try {
            setLoading(true);

            const data = await productService.getFavoritesProducts();
            setProductData(data && data.length > 0 ? data : []);
            getCartData();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSearchedProducts();
    }, [])

    const reload = async () => {
        await getSearchedProducts();
    }

    return (
        <>
            <Layout>
                {loading ? <Shopskeleton /> : <>
                    <Header />
                    <CategoryProducts
                        cardHeading={"Favorites Products"}
                        productData={productData}
                        reload={reload}
                    />
                </>}
            </Layout>
        </>

    );
};

export default Favourites;