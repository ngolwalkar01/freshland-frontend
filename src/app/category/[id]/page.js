'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { getCartData } from "@/components/service/cart";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import productService from '@/services/product';
import CategoryProducts from '@/components/atoms/search';
import Header from '@/components/atoms/Header/Header';
import { useParams } from 'next/navigation'

const Category = () => {
    const params = useParams();
    const category = params?.id;
    const [productData, setProductData] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSearchedProducts = async () => {
            setLoading(true);
            if (category) {
                const data = await productService.getProductsByCategory(category);
                setProductData(data && data.length > 0 ? data : []);
            } else {
                setProductData([]);
            }
            setLoading(false);
            getCartData();
        }

        getSearchedProducts();
    }, [category])

    return (
        <>
            <Layout>
                {loading ? <Shopskeleton /> : <>
                    <Header />
                    <div id='categoryContainer'>
                    <CategoryProducts
                        cardHeading={category}
                        productData={productData}
                    />
                    </div>
                </>}
            </Layout>
        </>

    );
};

export default Category;