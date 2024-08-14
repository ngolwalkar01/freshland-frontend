"use client";

import Cart from '@/components/pages/cart/cart';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const CartPage = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Cart />
        </Layout>
    );
};

export default CartPage;