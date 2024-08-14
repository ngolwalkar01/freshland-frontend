"use client";

import VIP from '@/components/pages/vip';
import Layout from '@/components/layout';
import vipPagesService from '@/services/vipPages';
import { useState, useEffect } from 'react';

const Vip = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const vipData = await vipPagesService.getAllVipPages();
                setData(vipData)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    return (
        <Layout>
            {loading ? <></> : <VIP vipPageData={data} />}
        </Layout>
    )
};

export default Vip;