import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
            // console.log("sdasdasdas", user, account, profile)
            return true;
        },
        async redirect({ url, baseUrl }) {
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
