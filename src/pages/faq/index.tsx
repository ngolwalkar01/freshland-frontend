import { GetServerSideProps, NextPage } from 'next';
import Faqs from '@/components/pages/faq-page/faq';
import Layout from '@/components/layout';

const Faq = () => {
    return (
    <Layout>
     <Faqs />
    </Layout>
    )
};
    
export default Faq;