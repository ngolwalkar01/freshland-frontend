'use client'

import Vip from '@/components/pages/viplist';
import Layout from '@/components/layout';
import { useParams } from 'next/navigation';
import CartAPI from '@/services/cart';
import { useState, useEffect } from 'react';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';
import Header from "@/components/atoms/Header/Header";

const VipList = () => {
    const params = useParams();
    const vipPageId = params?.id;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await CartAPI.getVipPageDataById(vipPageId);
                setData(data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        if (vipPageId)
            fetchData();
    }, [vipPageId]);

    return (
        <Layout>
            <ActiveUserKlaviyo />
            <main>
                <Header />
                {loading ? <></> : <Vip vipPageData={data} />}
            </main>
        </Layout>
    )
};

export default VipList;