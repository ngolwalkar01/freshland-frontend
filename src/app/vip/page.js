"use client";

import VIP from '@/components/pages/vip';
import Layout from '@/components/layout';
import vipPagesService from '@/services/vipPages';
import { useState, useEffect } from 'react';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';
import Header from '@/components/atoms/Header/Header';
import { useData } from '@/contexts/DataContext';

const Vip = () => {
    const { vipPageData: data, loadingVipPage: loading, fetchVipData } = useData() || {};

    useEffect(() => {
        fetchVipData(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Header />
            {loading ? <></> : <VIP vipPageData={data} />}
        </Layout>
    )
};

export default Vip;