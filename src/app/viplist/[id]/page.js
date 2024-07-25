'use client'

import Vip from '@/components/pages/viplist';
import Layout from '@/components/layout';
import { useParams } from 'next/navigation';
import CartAPI from '@/services/cart';
import { useState, useEffect } from 'react';
import klaviyoService from '@/services/klaviyo';

const VipList = () => {
    const params = useParams();
    const vipPageId = params?.id;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await CartAPI.getVipPageDataById(vipPageId);
            // await klaviyoService.getProfile();
            // await klaviyoService.createProfile("sdasasddas@sasas.saas", "assas");
            // await klaviyoService.addProfileToList();
            setData(data);
            setLoading(false);
        }

        if (vipPageId)
            fetchData();
    }, [vipPageId]);

    return (
        <Layout>
            <Vip vipPageData={data}/>
        </Layout>
    )
};

export default VipList;