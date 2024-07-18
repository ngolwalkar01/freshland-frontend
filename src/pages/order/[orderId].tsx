import Order from '@/components/pages/OrderConfirmation/Order';
import Layout from '@/components/layout';
import { GetServerSideProps, NextPage } from 'next';

interface OrderDetailProps {
    orderId: string;
}

export const getServerSideProps: GetServerSideProps<OrderDetailProps> = async (context) => {
    try {
        const orderId = context.params?.orderId;

        if (!orderId || typeof orderId !== 'string') {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                orderId,
            },
        };
    } catch (error) {
        return {
            props: {
                orderId: '',
            },
        };
    }
};

const OrderPage: NextPage<OrderDetailProps> = ({ orderId }) => {
    return (
        <Layout>
            <Order orderId={orderId} />
        </Layout>
    );
};

export default OrderPage;
