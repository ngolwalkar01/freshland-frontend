"use client";

import Login from '@/components/pages/login-page/page';
import Layout from '@/components/layout';
import { SessionProvider } from "next-auth/react";

const LoginPage = () => {
    return (
        <Layout>
            <SessionProvider>
                <Login />
            </SessionProvider>
        </Layout>
    )
};

export default LoginPage;