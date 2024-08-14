'use client'

import Rightwithdraw from '@/components/pages/rightwithdraw';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const RightWithdraws = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Rightwithdraw />
        </Layout>
    )
};

export default RightWithdraws;