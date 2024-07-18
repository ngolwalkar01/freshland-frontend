import { GetServerSideProps, NextPage } from 'next';
import Home from '@/components/pages/home-page/page';
import Layout from '@/components/layout';

import { Product } from '@/interfaces/product';
import { ShippingMethod } from '@/interfaces/shippingMethod';
import { VipPage } from '@/interfaces/vipPage';
import { DeliveryCycle } from '@/interfaces/deliveryCycle';

import productService from '@/services/product';
import shippingService from '@/services/shipping';
import vipPagesService from '@/services/vipPages';
import deliveryCycleAPI from '@/services/deliveryCycle';

import cookie from 'cookie';

interface HomePageProps {
    farmProducts: Product[];
    sessionalProducts: Product[];
    shippingMethods: ShippingMethod[];
    vipPages: VipPage[];
    cutOffDaysDetail?: DeliveryCycle;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
    try {
        const [productsResponse, sessionalProductsResponse, shippingResponse, vipPagesResponse, DeliveryCycleResponse] = await Promise.all([
            productService.getProducts(),
            productService.getSessionalProducts(),
            shippingService.getShippingMethods(),
            vipPagesService.getVipPages(),
            deliveryCycleAPI.getcuttoffday()
        ]);
        const farmProducts: Product[] = productsResponse ? productsResponse : [];
        const sessionalProducts: Product[] = sessionalProductsResponse ? sessionalProductsResponse : [];
        const shippingMethods: ShippingMethod[] = shippingResponse ? shippingResponse : [];
        const vipPages: VipPage[] = vipPagesResponse ? vipPagesResponse : [];   
        const cutOffDaysDetail: DeliveryCycle = DeliveryCycleResponse ? DeliveryCycleResponse : undefined;    
        
        return { props: { farmProducts, sessionalProducts, shippingMethods, vipPages, cutOffDaysDetail } };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { props: { farmProducts: [], sessionalProducts: [], shippingMethods: [], vipPages: [], cutOffDaysDetail: undefined } };
    }
};

const HomePage: NextPage<HomePageProps> = (props) => {
    return (
        <Layout>
            <Home homePageProps={{ ...props }} />
        </Layout>
    )
};

export default HomePage;
