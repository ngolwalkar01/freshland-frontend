'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { getCartData } from "@/components/service/cart";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import productService from '@/services/product';
import SearchComp from '@/components/atoms/search';
import Header from '@/components/atoms/Header/Header';
import { useParams } from 'next/navigation'

const Search = () => {
    const params = useParams();
    const searchTxt = params?.id;
    const [productData, setProductData] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSearchedProducts = async () => {
            setLoading(true);
            if (searchTxt) {
                const data = await productService.getSearchedProducts(searchTxt);
                setProductData(data?.suggestions && data?.suggestions.length > 0 ? data.suggestions : []);
            } else {
                setProductData([]);
            }
            setLoading(false);
            getCartData();
        }

        getSearchedProducts();
    }, [searchTxt])

    return (
        <>
            <Layout>
                {loading ? <Shopskeleton /> : <>
                    <Header />
                    <SearchComp
                        cardHeading={`Search results: "${searchTxt}"`}
                        productData={productData}
                    />
                </>
                }
            </Layout>
        </>

    );
};

export default Search;