import { GetServerSideProps, NextPage } from 'next';
import Login from '@/components/pages/login-page/page';
import Layout from '@/components/layout';

const LoginPage = () => {
    return (
        <Layout>
        <Login />
       </Layout>
    )
};
    
export default LoginPage;
