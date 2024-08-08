import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import authService from '@/services/auth';
import { SessionProvider } from "next-auth/react";
import { setUserLoggedInData } from "@/components/service/auth";
import { serviceTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const AuthHandler = ({ stopRedirect, activateApis }) => {
    const service = serviceTranslation[lang];
    const { data: session, status } = useSession();
    const router = useRouter();
    const toastTimer = 5000;

    useEffect(() => {
        const activateCall = () => {
            if (typeof activateApis === 'function')
                activateApis(true);
        }
        const handleAuthenticatedSession = async () => {
            try {
                const data = await authService.loginWithGoogle({ id_token: session.idToken });

                if (data?.user?.token && data?.user.ID) {
                    setUserLoggedInData({
                        token: data?.user?.token,
                        user_id: data?.user.ID
                    })
                    if (!stopRedirect)
                        router.push("/account");
                }
            } catch (error) {
                console.error("Authentication error:", error);
                toast.error(service.failedFetchUserData, { autoClose: toastTimer });
            }

            activateCall();
        };

        if (status === "authenticated") {
            handleAuthenticatedSession();
        } else {
            activateCall();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return null;
};

const AuthHandlerWithSession = ({ stopRedirect = false, activateApis = () => { } }) => {
    return <SessionProvider>
        <AuthHandler stopRedirect={stopRedirect} activateApis={activateApis} />
    </SessionProvider>
}
export default AuthHandlerWithSession;
