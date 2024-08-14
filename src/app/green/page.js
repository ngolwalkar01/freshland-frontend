"use client";

import Green from '@/components/pages/greenfruit/greenfruit';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const GreenFruit = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Green />
        </Layout>
    )
};

export default GreenFruit;
