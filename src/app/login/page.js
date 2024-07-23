"use client";

import Login from '@/components/pages/login-page/page';
import Layout from '@/components/layout';
import AuthHandlerWithSession from '@/components/atoms/auth/google';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkTokenExists } from '@/components/service/cart';

const LoginPage = () => {
    const [isActivatehomeApis, showLoginPage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (checkTokenExists()) {
            router.push('/account');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            {isActivatehomeApis && <Login />}
            <AuthHandlerWithSession activateApis={showLoginPage} />
        </Layout>
    )
};

export default LoginPage;