import { GetServerSideProps, NextPage } from 'next';
import Farmers from '@/components/pages/farmer-page/farmer';
import Layout from '@/components/layout';

const Farmer = () => {
    return (
    <Layout>
     <Farmers />
    </Layout>
    )
};
    
export default Farmer;