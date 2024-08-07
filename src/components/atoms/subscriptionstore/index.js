import React from "react";
import styles from "./subscription.module.css";
import Image from "next/image";
import Link from "next/link";
import subscriptionService from "@/services/subscriptions";
import { toast } from 'react-toastify';
import { myaccountTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const Subscription = ({ newsubscriptionProducts: products, onClose, subDetail, token }) => {
  const mat = myaccountTranslation[lang];

  const onAddSubscription = async (product_id) => {
    const prop = `convert_to_sub_${product_id}`;
    const { billing_interval, billing_period, id: sub_id } = subDetail
    const data = {
      "add-to-subscription": sub_id,
      "add-product-to-subscription": product_id,
      [prop]: `${billing_interval}_${billing_period}`
    }
    const response = await subscriptionService.addPRoductTosubscription(data, token)
    toast.success(response.message ? response.message: "Your request is processed", { autoClose: toastTimer });
  }

  return (
    <>
      {" "}
      <div>
        <div className={styles.skipoveraly}>
          <div className={styles.skippaymentpopup}>
            <i className="fa-solid fa-xmark" onClick={onClose}></i>
            <h1 className={styles.subheading}>{mat.product}</h1>
            <div className={styles.skiptext}>
              {products && products.length > 0 && products.map((product, i) => (
                <div key={product.id} className={styles.gridItem}>
                  <div className={styles.transparentCard}>
                    <Link href={`/product/${product.id}`} className={styles.imgContainer}>
                      <Image
                        className={styles.cardTopImage}
                        src="/Images/productTop.png" alt="" width={40} height={10}
                      />
                      <Image
                        className={styles.cardImage}
                        src={product.thumbnail ? product.thumbnail : ""}
                        alt={product?.name}
                        width={174} height={152}
                      />
                    </Link>
                    <div className={styles.cardContent}>
                      <Link href={`/product/${product.id}`}>
                        <h3 className={styles.cardTitle}>{product.name}</h3>
                      </Link>
                    </div>
                    <div className={styles.cardPrice} dangerouslySetInnerHTML={{ __html: product.price }} />
                    <button className={styles.addToBasketButton} onClick={() => { onAddSubscription(product.id); }}>
                      {" "}
                     {mat.aadSubscription}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
