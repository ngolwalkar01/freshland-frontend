'use client';

import Gift from '@/components/pages/gift/gifts';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Gcard = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Gift />
        </Layout>
    )
};

export default Gcard;
