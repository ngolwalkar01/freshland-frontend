import { GetServerSideProps, NextPage } from 'next';
import MyAccount from '@/components/pages/MyAccount/Account';
import Layout from '@/components/layout';
import cookie from 'cookie';
import accountService from '@/services/account'
import { Order } from "@/interfaces/order";

interface AccountProps {
    orders: Order[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { req } = context;
        const parsedCookies = cookie.parse(req.headers.cookie || "");
        const token = parsedCookies.token;
        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
        const orders: Order[] = await accountService.getOrders(token);
        return {
            props: { orders }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
};

const Account: NextPage<AccountProps> = ({ orders }) => {
    return (
        <Layout>
            <MyAccount orders={orders} />
        </Layout>
    );
};

export default Account;

