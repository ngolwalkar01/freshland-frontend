"use client";

import { useState, useEffect } from "react";
import Order from '@/components/pages/OrderConfirmation/Order';
import { useParams } from 'next/navigation'

import Detail from '@/components/pages/product/detail/index';
import Layout from '@/components/layout';
import productService from '@/services/product'
import DescriptionSkeleton from '@/components/skeleton/detailsskeleton'
import { trackProductDetailPage } from '@/components/service/klaviyoTrack';

const ProductPage = () => {
    const params = useParams();
    const [data, setData] = useState({
        productDetail: null,
        relatedProducts: [],
        productId: ''
    });
    const [loading, setLoading] = useState(false);

    const productId = params?.id;

    const trackProductDetail = (productDetail) => {
        trackProductDetailPage(productDetail);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [productDetail, relatedProducts] = await Promise.all([
                    productService.getProductDetail(productId),
                    productService.getRelatedProducts(productId),
                ]);
                setData({
                    productDetail,
                    relatedProducts,
                    productId
                });
                trackProductDetail(productDetail);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        if (productId)
            fetchData();
    }, [productId]);

    if (!productId || typeof productId !== 'string') {
        return <>
            <div>Product not found!</div>
        </>
    }



    return (
        <Layout>
            {loading ? <DescriptionSkeleton /> : <Detail productDetailProps={{ ...data }} />}
        </Layout>
    );
};

export default ProductPage;
