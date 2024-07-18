import { GetServerSideProps, NextPage } from 'next';
import Cart from '@/components/pages/cart/cart';
import Layout from '@/components/layout';

import { CartData } from '@/interfaces/cartData';
import cartService from '@/services/cart';
import cookie from 'cookie';

interface CartPageProps {
    cartData?: CartData | null;
}

// export const getServerSideProps1: GetServerSideProps<CartPageProps> = async (context) => {
//     try {
//         // const cookies = context.req.headers.cookie 
//         //     ? cookie.parse(context.req.headers.cookie)
//         //     : {};
//         // const cartKey = cookies.cart_key;
        
//         // if (!cartKey) {
//         //     return { props: { cartData: null } };
//         // }
//         const cookies = context.req.headers.cookie 
//             ? cookie.parse(context.req.headers.cookie)
//             : {};
//         console.log(JSON.stringify(cookies), 'context.req.headers.cookie');
        
//         const cartData: CartData = await cartService.getCartDataFromServer(cookies);
//         return { props: { cartData } };
//     } catch (error) {
//         console.error('Error in getServerSideProps:', error);
//         return { props: { cartData: null } };
//     }
// };

// const CartPage: NextPage<CartPageProps> = ({ cartData }) =>{
const CartPage = () => {
    return (
        <Layout>
            <Cart />
            {/* <Cart cartDataProps={cartData} /> */}
        </Layout>
    );
};

export default CartPage;