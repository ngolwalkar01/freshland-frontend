import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AuthAPI from '@/services/auth';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            authorizationUrl: process.env.NEXT_PUBLIC_Auth_URL
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                console.log(">>>>>>>>>>>", window?.localStorage)
                // console.log(JSON.stringify(account))
                // const data = await AuthAPI.loginWithGoogle(account);
                // console.log("Success", JSON.stringify(data))
            } catch (error) {
                console.log(JSON.stringify(error));
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            console.log("SignIn Callback Triggered");
            return baseUrl;
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: null
    },
    session: {
        strategy: 'jwt'
    }
});
