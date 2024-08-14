"use client";

import Order from '@/components/pages/OrderConfirmation/Order';
import Layout from '@/components/layout';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const OrderPage = () => {
    const params = useParams();
    const orderId = params?.id;
    if (!orderId || typeof orderId !== 'string') {
        return <>
            <div>Order not found!</div>
        </>
    }
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Order orderId={params?.id} />
        </Layout>
    );
};

export default OrderPage;
