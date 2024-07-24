import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AuthAPI from '@/services/auth';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
            // authorization    Url: process.env.NEXT_PUBLIC_Auth_URL || process.env.GOOGLE_Auth_URL
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            return true;
        },
        async jwt({ token, account }) {
            if (account?.provider === 'google' && account?.id_token) {
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.idToken) {
                session.idToken = token.idToken;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log("SignIn Callback Triggered");
            return baseUrl + '/login';
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: null
    },
    site: process.env.NEXTAUTH_URL,
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    logger: {
        error(code, metadata) {
            console.error(code, metadata)
        },
        warn(message) {
            console.warn(message)
        },
        debug(message) {
            console.debug(message)
        }
    }
});
