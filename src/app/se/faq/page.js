'use client';

import Faqs from '@/components/pages/faq-page/faq';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Faq = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <Faqs />
        </Layout>
    )
};

export default Faq;