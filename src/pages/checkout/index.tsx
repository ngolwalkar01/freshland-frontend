import { GetServerSideProps, NextPage } from 'next';
import Checkout from '@/components/pages/checkout/checkout';
import Layout from '@/components/layout';

import { CartData } from '@/interfaces/cartData';
import cartService from '@/services/cart';
import cookie from 'cookie';

interface CartPageProps {
    cartData?: CartData;
}

// export const getServerSideProps1: GetServerSideProps<CartPageProps> = async (context) => {
//     try {
//         // const cookies = context.req.headers.cookie
//         //     ? cookie.parse(context.req.headers.cookie)
//         //     : {};
//         // const cartKey = cookies.cart_key;

//         // if (!cartKey) {
//         //     throw new Error('Cart key is missing');
//         // }
//         // const cartData: CartData = await cartService.getCartData(cartKey);
//         const cartData: CartData = await cartService.getCartData();

//         return { props: { cartData } };
//     } catch (error) {
//         console.error('Error in getServerSideProps:', error);
//         return { props: { cartData: undefined } };
//     }
// };

// const CheckoutPage: NextPage<CartPageProps> = ({ cartData }) => {
//     return (
//         <Layout>
//             <Checkout cartDataProps={cartData} />
//         </Layout>
//     );
// };

const CheckoutPage = () => {
    return (
        <Layout>
            <Checkout />
        </Layout>
    );
};

export default CheckoutPage;