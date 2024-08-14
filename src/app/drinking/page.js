'use client';

import Drinking from '@/components/pages/drinking/drinking';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Dking = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Drinking />
        </Layout>
    )
};

export default Dking;
