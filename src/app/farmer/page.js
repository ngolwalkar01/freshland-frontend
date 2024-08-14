'use client';

import Farmers from '@/components/pages/farmer-page/farmer';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Farmer = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Farmers />
        </Layout>
    )
};

export default Farmer;