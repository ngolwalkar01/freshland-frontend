"use client";

import { useState, useEffect } from "react";
import Order from '@/components/pages/OrderConfirmation/Order';
import { useParams } from 'next/navigation'

import Detail from '@/components/pages/product/detail/index';
import Layout from '@/components/layout';
import productService from '@/services/product'
import DescriptionSkeleton from '@/components/skeleton/detailsskeleton'
import deliveryCycleAPI from '@/services/deliveryCycle';
import { trackProductDetailPage } from '@/components/service/klaviyoTrack';

const ProductPage = () => {
    const params = useParams();
    const [data, setData] = useState({
        productDetail: null,
        relatedProducts: [],
        productId: '',
        cutOffDaysDetail: undefined
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
                const [productDetail, relatedProducts, DeliveryCycleResponse] = await Promise.all([
                    productService.getProductDetail(productId),
                    productService.getRelatedProducts(productId),
                    deliveryCycleAPI.getcuttoffday()
                ]);
                setData({
                    productDetail,
                    relatedProducts,
                    productId,
                    cutOffDaysDetail: DeliveryCycleResponse || undefined
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
