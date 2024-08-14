'use client'

import Terms from '@/components/pages/term';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Term = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Terms />
        </Layout>
    )
};

export default Term;