"use client";

import ForgotPassword from '@/components/pages/forgotpassword';
import Layout from '@/components/layout';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const Forgot = () => {
    return (
        <Layout>
            <ActiveUserKlaviyo />
            <ForgotPassword />
        </Layout>
    )
};

export default Forgot;