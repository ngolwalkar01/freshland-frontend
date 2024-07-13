"use client";
import MyAccount from '@/components/pages/MyAccount/Account';
import Layout from '@/components/layout';
import accountService from '@/services/account'
import { useState, useEffect } from 'react';
import { retryCall } from "@/components/service/retry";

const Account = ({ orders }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const errorMessage = "There was an issue in fetching cart data. Please try again.";
            const orders = await accountService.getOrders(localStorage.getItem("token"));
            setData(orders);
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <Layout>
            {loading ? <>Loading...</> : <MyAccount orders={data} />}
        </Layout>
    );
};

export default Account;

