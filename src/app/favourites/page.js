'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { getCartData } from "@/components/service/cart";
import Shopskeleton from "@/components/skeleton/shopskeleton";
import productService from '@/services/product';
import CategoryProducts from '@/components/atoms/search';
import Header from '@/components/atoms/Header/Header';
import { commonTranslation} from '@/locales';
import { decodeString } from '@/helper';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const Favourites = () => {
    const cmt = commonTranslation[lang];
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    const getSearchedProducts = async () => {
        try {
            setLoading(true);

            const data = await productService.getFavoritesProducts();
            setProductData(data && data.length > 0 ? data : []);
            getCartData();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSearchedProducts();
    }, [])

    const reload = async () => {
        await getSearchedProducts();
    }

    return (
        <>
            <Layout>
                {loading ? <Shopskeleton /> : <>
                    <Header />
                    <div id='categoryContainer'>
                    <CategoryProducts
                        cardHeading={decodeString(cmt.favoritesProducts)}
                        productData={productData}
                        reload={reload}
                        nofavoriteMessage={cmt.noFavorites}
                    />
                    </div>
                </>}
            </Layout>
        </>

    );
};

export default Favourites;