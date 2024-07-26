'use client'

import Vip from '@/components/pages/viplist';
import Layout from '@/components/layout';
import { useParams } from 'next/navigation';
import CartAPI from '@/services/cart';
import { useState, useEffect } from 'react';

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
            <Vip vipPageData={data} />
        </Layout>
    )
};

export default VipList;