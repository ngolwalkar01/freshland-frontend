'use client'

import Complaint from '@/components/pages/complaint';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Complaints = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Complaint />
        </Layout>
    )
};

export default Complaints;