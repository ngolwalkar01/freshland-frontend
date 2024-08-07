import React, { useEffect, useState } from "react";
import styles from "./detail.module.css";
import ProductList from "../../../atoms/ProductList/ProductList";
import Header from "@/components/atoms/Header/Header";
import TextWrapper from "@/components/atoms/TextWrapper/TextWrapper";
import Image from "next/image";
import {
  addToCart,
  updateCartQuantity,
  removeCartItem,
  getSubscriptionOptions,
} from "@/components/service/cart";
import LazyLoad from "react-lazyload"; // Import LazyLoad component
import { productdetailTranslation } from "@/locales";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/atoms/loader/loader";

const lang = process.env.NEXT_PUBLIC_LANG || "dk";

const Description = ({ productDetailProps }) => {
  const router = useRouter();

  const pdt = productdetailTranslation[lang];
  const [subscriptionOpt, setSubcriptionOpt] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    productDetail: originalProductDetail,
    relatedProducts,
    productId,
  } = productDetailProps;
  const enableMockData = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true";

  const productDetail = originalProductDetail;

  const relatedProductProps = {
    cardHeading: "Related Items",
    productData: relatedProducts,
    enableMockData,
    addToCart,
    updateCartQuantity,
    removeCartItem,
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(
        productDetail.id.toString(),
        quantity.toString(),
        isOneTimePurchaseActive ? "" : deliveryOption
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const [deliveryOption, setDeliveryOption] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [isOneTimePurchaseActive, setIsOneTimePurchaseActive] = useState(true);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOneTimePurchaseClick = () => {
    setIsOneTimePurchaseActive(true);
  };

  const handleSubscribeClick = () => {
    setIsOneTimePurchaseActive(false);
  };

  useEffect(() => {
    const getSubOptions = async () => {
      if (!productId) return;
      const data = await getSubscriptionOptions(productId);
      const opts = data || null;
      setSubcriptionOpt(opts);

      if (opts && opts.is_subscription) {
        const currentDeliveryOpt =
          opts?.subscription_schemes && opts?.subscription_schemes.length > 0
            ? opts?.subscription_schemes[0].id
            : "";
        setDeliveryOption(currentDeliveryOpt);
      }
    };

    getSubOptions();
  }, [productId]);

  const categories = productDetailProps?.productDetail?.categories ?? [];
  const joinedCategories = categories.join(",");
  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <div className={styles.containerBody}>
        <Header />
        <div className={styles.container}>
          <div className={styles.navBack} onClick={() => router.back()}>
            <Image
              src="/Images/Gobackicon.svg"
              alt="logo"
              width={24}
              height={24}
            ></Image>
            <p>Go Back</p>
          </div>
          <section className={styles.productSection}>
            {/* <div className={`${styles.productTitleMob}`}>
              <h3>
                {productDetail.name}
              </h3>
              <h3>$ {productDetail.price}</h3>
            </div> */}
            <div className={styles.leftSide}>
              <div className={styles.smallImage}>
                <Image
                  src="/Images/productTop.png"
                  alt="Small Image"
                  width={120}
                  height={78}
                />
              </div>
              {productDetail && (
                <div className={styles.mainImage}>
                  <Image
                    src={productDetail.thumbnail}
                    alt="Main Image"
                    width={584}
                    height={584}
                    priority
                  />
                </div>
              )}
            </div>
            <div className={styles.rightSide}>
              <div className={`${styles.productTitle}`}>
                <div>
                  {productDetail && <h3>{productDetail.name}</h3>}
                  {/* <Image
                  src="/mockImage/Spain Flag.png"
                  width={40}
                  height={40}
                  alt="Spain Flag"
                /> */}
                </div>

                {productDetail && (
                  <h5
                    dangerouslySetInnerHTML={{ __html: productDetail.price }}
                  />
                )}
              </div>

              {productDetail?.excerpt && (
                <div
                  className={styles.productDetails}
                  dangerouslySetInnerHTML={{ __html: productDetail?.excerpt }}
                ></div>
              )}
              <div className={styles.boxWrapper}>
                {subscriptionOpt &&
                  subscriptionOpt.is_subscription &&
                  subscriptionOpt.subscription_schemes &&
                  subscriptionOpt.subscription_schemes.length > 0 && (
                    <>
                      <div className={styles.purchaseBtnWrapper}>
                        <label
                          className={
                            isOneTimePurchaseActive
                              ? styles.active
                              : styles.inactive
                          }
                        >
                          <input
                            type="radio"
                            name="purchaseOption"
                            checked={isOneTimePurchaseActive}
                            onChange={handleOneTimePurchaseClick}
                          />
                          {pdt.oneTimePurchase}
                        </label>
                        <label
                          className={
                            !isOneTimePurchaseActive
                              ? styles.active
                              : styles.inactive
                          }
                        >
                          <input
                            type="radio"
                            name="purchaseOption"
                            checked={!isOneTimePurchaseActive}
                            onChange={handleSubscribeClick}
                          />
                          {pdt.subscribe}
                        </label>
                      </div>
                      <div
                        className={`${styles.fieldColumn} ${
                          styles.fieldColumnDelivery
                        } ${
                          isOneTimePurchaseActive ? styles.hidden : styles.show
                        }`}
                      >
                        <label htmlFor="selectDelivery">{pdt.delivery}</label>
                        <select
                          id="selectDelivery"
                          value={deliveryOption}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className={styles.selectbox}
                        >
                          {subscriptionOpt.subscription_schemes &&
                            Array.isArray(
                              subscriptionOpt.subscription_schemes
                            ) &&
                            subscriptionOpt.subscription_schemes.map((x, i) => (
                              <option key={i} value={x.id}>
                                {x.title ? x.title : x.id}
                              </option>
                            ))}
                        </select>
                        <span className={styles.customArrow}></span>
                      </div>
                    </>
                  )}

                {/* <div className={styles.purchaseBtnWrapper}>
                  <button
                    className={`${styles.oneTimePurchaseButton} ${isOneTimePurchaseActive ? styles.greenBg : styles.whiteBg}`}
                    onClick={handleOneTimePurchaseClick}
                  >
                    One Time Purchase
                  </button>
                  <button
                    className={`${styles.subscribeButton} ${!isOneTimePurchaseActive ? styles.greenBg : styles.whiteBg}`}
                    onClick={handleSubscribeClick}
                  >
                    Subscribe
                  </button>
                </div> */}

                <div className={styles.addToConatiner}>
                  <div className={styles.addToBasket}>
                    <button
                      className={`${styles.valueButton} ${styles.decreaseButton}`}
                      onClick={decreaseQuantity}
                    >
                      <i
                        className="fa-solid fa-minus"
                        aria-label="Decrease quantity"
                      ></i>{" "}
                    </button>
                    <p className={styles.number}>{quantity}</p>
                    <button
                      className={`${styles.valueButton} ${styles.increaseButton}`}
                      onClick={increaseQuantity}
                    >
                      <i
                        className="fa-solid fa-plus"
                        aria-label="Increase quantity"
                      ></i>
                    </button>
                  </div>
                  <div className={`M-Body-Large ${styles.basketWrapper}`}>
                    <span onClick={handleAddToCart}>
                      {loading ? <Loader /> : null}
                      {isOneTimePurchaseActive ? "Add To Basket" : "Subscribe"}
                    </span>
                  </div>
                </div>
                <div className={styles.itemCatagory}>
                  <div className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="checkbox"
                      checked={checked}
                      onChange={handleCheckboxChange}
                      className={styles.checkboxInput}
                    />
                    <label htmlFor="checkbox" className={styles.checkboxLabel}>
                     {pdt.sendAnother}
                    </label>
                  </div>
                  <p>
                    {pdt.itemNumberSKU} F176 <br />
                    {pdt.category} {joinedCategories}
                  </p>
                  <p className={`W-Body-Regular ${styles.ordertime}`}>
                   {pdt.orderbefore} <strong>{pdt.time}</strong> {pdt.collection}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* USPS icons */}
          <div className={styles.uspsIcon}>
            <div className={styles.productIcons}>
              <div className={styles.textConatainer}>
                <Image
                  src="\Images\naturalproduct.svg"
                  width={24}
                  height={24}
                  alt="naturalproduct"
                />
                <p className="W-Body-Large-Medium">{pdt.naturalproducts}</p>
              </div>

              <p className="W-Body-Regular">
               {pdt.allProduct}
              </p>
            </div>
            <div className={styles.productIcons}>
              <div className={styles.textConatainer}>
                <Image src="/Images/straight.svg" width={24} height={24} alt="straight"/>
                <p className="W-Body-Large-Medium">{pdt.StraightFrom}</p>
              </div>

              <p className="W-Body-Regular">
              {pdt.skip}
              </p>
            </div>
            <div className={styles.productIcons}>
              <div className={styles.textConatainer}>
                <Image src="/Images/freeshipping.svg" width={24} height={24}  alt="freeshipping"/>
                <p className="W-Body-Large-Medium">{pdt.freeShipping}</p>
              </div>

              <p className="W-Body-Regular">
               {pdt.shiipingOrder}
              </p>
            </div>
            <div className={styles.productIcons}>
              <div className={styles.textConatainer}>
                <Image src="/Images/fast.svg" width={24} height={24} alt="fast"/>
                <p className="W-Body-Large-Medium">{pdt.fastDeliver}</p>
              </div>

              <p className="W-Body-Regular">
               {pdt.orderTime}
              </p>
            </div>
          </div>
        </div>
        <LazyLoad height={200} offset={100}>
          <div className={styles.wrapper}>
            <h2 className={styles.descripTion}>{pdt.descriptionHeading}</h2>
            <section
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: productDetail?.description }}
            />

            {/* <h2>{pdt.description}</h2>
              <div className={styles.mainDescription}>
                <div className={styles.storageWrapper}>
                  <div>
                    <h3>
                      {pdt.sweetJuice}{" "}
                      <span>
                        <Image
                          src="/Images/Orange_Icon.png"
                          width={30}
                          height={30}
                          alt="Orange Icon"
                        />
                      </span>
                    </h3>
                  </div>
                  <span>
                    {pdt.theseOrange}
                  </span>

                  <br />
                  <span>
                    {pdt.orangeContent}
                  </span>
                </div>

                <div className={styles.storageWrapper}>
                  <h4>{pdt.storage}</h4>
                  <span>
                    {pdt.orangeTemp}
                    <br />
                    {pdt.byStoring}
                  </span>
                </div>

                <div className={styles.storageWrapper}>
                  <h4>{pdt.ourEconomy}</h4>
                  <span>
                    {pdt.oneOfour}
                  </span>
                </div>

                <div className={styles.storageWrapper}>
                  <h4>{pdt.season}</h4>
                  <span>
                    {pdt.orangeThrive}
                  </span>
                </div>
                <div className={styles.nutriWrapper}>
                  <h4>{pdt.nutritionalContent}</h4>
                  <table className={styles.tableData}>
                    <tbody>
                      <tr>
                        <td>{pdt.averageValues}</td>
                        <td>{pdt.per100g}</td>
                      </tr>
                      <tr>
                        <td>{pdt.energy}</td>
                        <td>197 kg (47 kcal)</td>
                      </tr>
                      <tr>
                        <td>{pdt.fatOfWhich}</td>
                        <td>0.2 g</td>
                      </tr>
                      <tr>
                        <td>
                          <span>{pdt.saturatedFattyAcids}</span>
                        </td>
                        <td>
                          <span>0 g</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{pdt.monounsaturatedFattyAcids}</span>
                        </td>
                        <td>
                          <span>197 kg (47 kcal)</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{pdt.polyunsaturatedFattyAcids}</span>
                        </td>
                        <td>
                          <span>197 kg (47 kcal)</span>
                        </td>
                      </tr>
                      <tr>
                        <td>{pdt.carbohydrateOfWhich}</td>
                        <td>11.8 g</td>
                      </tr>
                      <tr>
                        <td>
                          <span>{pdt.sugars}</span>
                        </td>
                        <td>
                          <span>9.8 g</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{pdt.dietaryFiber}</span>
                        </td>
                        <td>
                          <span>2.4 g </span>
                        </td>
                      </tr>
                      <tr>
                        <td>{pdt.protein}</td>
                        <td>0.9 g</td>
                      </tr>
                      <tr>
                        <td>{pdt.salt}</td>
                        <td>0 g</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>  */}
          </div>

          <section className={styles.productData}>
            <ProductList {...relatedProductProps} />
          </section>
        </LazyLoad>
      </div>
    </>
  );
};

export default Description;
