import { addToCart, updateCartQuantity, removeCartItem } from '@/components/service/cart'
import ProductList from '../ProductList/ProductList';
import { shopTranslation } from '@/locales';
import styles from "@/components/pages/shop/AllGoods.module.css";
import { decodeString } from '@/helper';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Search = ({ cardHeading, productData, overRideClass = false, reload = () => { }, nofavoriteMessage }) => {
    const st = shopTranslation[lang];
    return (
        <>
            <ActiveUserKlaviyo />
            <div className={styles.categoryContainer}>
                <ProductList
                    overRideClass={overRideClass}
                    cardHeading={decodeString(cardHeading)}
                    productData={productData}
                    addToCart={addToCart}
                    updateCartQuantity={updateCartQuantity}
                    removeCartItem={removeCartItem}
                    reload={reload}
                />
                {!(productData && productData.length > 0) && (
                    <p className={`${styles.comingSoon} ${styles.resultDiv}`} style={{ textAlign: 'center' }}>
                
                          
                {nofavoriteMessage || (
                            <>
                            <div id='resultNotfound'>
                                <div id='resultant'>
                                <p>{st.no_results}</p>
                                <p>{st.no_results_message}</p>
                                </div>
                           
                                <ul>
                                    <li>{st.check_spelling}</li>
                                    <li>{st.try_another_keyword}</li>
                                    <li>{st.search_all_items}</li>
                                    <li>{st.contact_customer_service}</li>
                                </ul>
                            </div>
                               
                            </>
                        )}

                    </p>
                )}
            </div>
        </>
    );
};

export default Search;