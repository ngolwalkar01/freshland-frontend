import { GetServerSideProps, NextPage } from 'next';
import Detail from '@/components/pages/product/detail/index';
import Layout from '@/components/layout';
import { Product } from '@/interfaces/product';
import productService from '@/services/product'

interface ProductDetailProps {
    productDetail?: Product;
    relatedProducts: Product[];
    productId: string;
}

export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (context) => {
    try {
        const productId = context.params?.productId;
        if (typeof productId !== 'string') {
            return {
                notFound: true,
            };
        }

        const productIdNumber: number = parseInt(productId, 10);
        const [productDetail, relatedProducts] = await Promise.all([
            productService.getProductDetail(productIdNumber),
            productService.getRelatedProducts(productIdNumber),
        ]);
        return {
            props: {
                productDetail: productDetail || null,
                relatedProducts,
                productId
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                productDetail: null,
                relatedProducts: [],
                productId: ''
            },
        };
    }
};

const DescriptionPage: NextPage<ProductDetailProps> = (props) => {
    return (
        <Layout>
            <Detail productDetailProps={{ ...props }} />
        </Layout>
    )
};

export default DescriptionPage;
