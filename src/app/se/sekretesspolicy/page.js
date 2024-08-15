'use client'

import Personaldata from '@/components/pages/personaldata';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const PersonalData = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Personaldata />
        </Layout>
    )
};

export default PersonalData;