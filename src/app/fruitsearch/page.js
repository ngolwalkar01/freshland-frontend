'use client';

import Fruitsearch from '@/components/pages/fruitsearch/fruitsearch';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Fruit = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Fruitsearch />
        </Layout>
    )
};

export default Fruit;
