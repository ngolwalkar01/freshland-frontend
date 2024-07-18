import { GetServerSideProps, NextPage } from 'next';
import About from '@/components/pages/aboutUs/about';
import Layout from '@/components/layout';

const AboutUs = () => {
    return (
    <Layout>
     <About />
    </Layout>
    )
};
    
export default AboutUs;