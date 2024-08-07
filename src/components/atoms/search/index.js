import { addToCart, updateCartQuantity, removeCartItem } from '@/components/service/cart'
import ProductList from '../ProductList/ProductList';
import { shopTranslation } from '@/locales';
import styles from "@/components/pages/shop/AllGoods.module.css";

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Search = ({ cardHeading, productData, overRideClass = false, reload = () => { } ,nofavoriteMessage }) => {
    const st = shopTranslation[lang];
    return (
        <>
            <div className={styles.categoryContainer}>
                <ProductList
                    overRideClass={overRideClass}
                    cardHeading={cardHeading}
                    productData={productData}
                    addToCart={addToCart}
                    updateCartQuantity={updateCartQuantity}
                    removeCartItem={removeCartItem}
                    reload={reload}
                />
                {!(productData && productData.length > 0) && (
                    <p className={styles.comingSoon} style={{ textAlign: 'center' }}>
                   {nofavoriteMessage || `${st.ourProductComingSoon}  ${st.stayTuned}`}

                    </p>
                )}
            </div>
        </>
    );
};

export default Search;