'use client';

import { useEffect } from "react";
import Head from 'next/head';
import Checkout from '@/components/pages/checkout/checkout';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const CheckoutPage = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://x.klarnacdn.net/kp/lib/v1/api.js";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (
        <>
            <Layout>
                <ActiveUserKlaviyo />
                <Checkout />
            </Layout>
        </>

    );
};

export default CheckoutPage;