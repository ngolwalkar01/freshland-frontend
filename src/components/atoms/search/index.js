import { addToCart, updateCartQuantity, removeCartItem } from '@/components/service/cart'
import ProductList from '../ProductList/ProductList';
import { shopTranslation } from '@/locales';
import styles from "@/components/pages/shop/AllGoods.module.css";

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Search = ({ cardHeading, productData, overRideClass = false }) => {
    const st = shopTranslation[lang];
    return (
        <>
            <ProductList
                overRideClass={overRideClass}
                cardHeading={cardHeading}
                productData={productData}
                addToCart={addToCart}
                updateCartQuantity={updateCartQuantity}
                removeCartItem={removeCartItem}
            />
            {!(productData && productData.length > 0) && (
                <p className={styles.comingSoon} style={{ textAlign: 'center' }}>
                    {st.ourProductComingSoon} <br />{st.stayTuned}
                </p>
            )}
        </>
    );
};

export default Search;