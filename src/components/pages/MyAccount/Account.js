import React, { useState, useEffect } from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "./Account.module.css";
import Image from "next/image";
import Link from "next/link";
import Orderaccount from "@/components/atoms/orderaccount/orderaccount";
import Mysubscription from "@/components/atoms/mysubscription/mysubscription";
import Address from "@/components/atoms/address/address";
import Accountinformation from "@/components/atoms/accountinformation/accountinformation";
import Payment from "@/components/atoms/paymentmethod/payment";
import { myaccountTranslation } from "@/locales";
import cookieService from "@/services/cookie";
import { useRouter } from 'next/navigation';
import accountService from '@/services/account'
import subscriptionService from "@/services/subscriptions";
import Loader from "@/components/atoms/loader/loader";
import AuthAPI from "@/services/auth";
import { getCheckoutOrderById, getOrderDates } from "@/components/service/account";
import { signOut as googleSignOut } from 'next-auth/react';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';
import OverLayLoader from '@/components/atoms/overLayLoader';
import { applyLoader } from "@/helper/loader";
import { config } from "@/helper/config";
import AccountAPI from "@/services/account";

const lang = process.env.NEXT_PUBLIC_LANG || "se";

function Account({ orders }) {
  const mat = myaccountTranslation[lang];
  const [activeOption, setActiveOption] = useState("orders");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showAccountNavbar, setShowAccountNavbar] = useState(true);
  const [showOrderView, setShowOrderView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSaveAddressBox, setShowSaveAddressBox] = useState(false);
  const [showAddAddressButton, setShowAddAddressButton] = useState(true);
  const [showshippingAddress, setShippingAddress] = useState(false);
  const [orderObj, setorderObj] = useState(null)
  const [orderDatesData, setOrderDatesData] = useState(null);
  const [olloading, setOlloading] = useState(false);
  const [profile, setUserProfile] = useState(null);

  const router = useRouter();

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router('/login');
      return false;
    }
    return token;
  }


  const toggleOrderView = async (id, val) => {
    try {
      const token = isUserLoggedIn();
      if (token) {
        setLoading(true);
        setProgress(60)
        const orderDetail = await getCheckoutOrderById(id);
        const orderDates = await getOrderDates(id);
        setOrderDatesData(orderDates);
        setorderObj(orderDetail);
        setShowOrderView(val);

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100)
    }
  }

  const showOrderViewTab = async (id, val) => {
    await toggleOrderView(id, val)
    setActiveOption("orders");
  }

  const toggleAccountNavbar = () => {
    setShowAccountNavbar(!showAccountNavbar);
  };

  const handleLogout = () => {
    // Show the logout confirmation popup
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = async () => {
    const token = isUserLoggedIn();
    try {
      await AuthAPI.logout(token);
    } catch (error) { }

    cookieService.removeCookie("token");
    cookieService.removeCookie("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    setShowLogoutConfirmation(false);
    try {
      await googleSignOut({
        redirect: false,
      });
    } catch (error) { }
    router.push("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setShowAccountNavbar(false);
    setShowAccountNavbar(false);
    setShowOrderView(false); // Reset
    setShowSaveAddressBox(false);
    setShowAddAddressButton(true);
    setShippingAddress(false);
  };

  useEffect(() => {
    const token = isUserLoggedIn();
    if (token && !profile) {
      const getUserProfile = async () => {
        const userData = await AccountAPI.getCustomerProfile();
        setUserProfile(userData);
      };

      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {olloading && <OverLayLoader />}
      <ActiveUserKlaviyo />
      {loading ? <Loader progress={progress} /> : null}
      <div className={styles.myaccount}>
        <div className={styles.Headeraccount}>
          <Header />
        </div>
        <div className={styles.mainnavbar}>
          <span className={styles.menuToggle} onClick={toggleAccountNavbar}>
            {showAccountNavbar ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </span>

          <div
            className={`${styles.accountnavbar} ${styles.accountcontainer} 
            ${showAccountNavbar ? styles.showNavbar : ""}`}
          >
            <h2>{mat.pageHeading}</h2>
            <nav className={styles.navbar}>
              <ul>
                <li onClick={() => handleOptionClick("orders")}>
                  <Link
                    href="#orders"
                    className={
                      activeOption === "orders" ? styles.activeOption : ""
                    }
                  >
                    <span>{mat.ordersHeading}</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li>
                {
                  config.isActivateSubscription &&
                  <li onClick={() => handleOptionClick("subscription")}>
                    <Link
                      href="#subscription"
                      className={
                        activeOption === "subscription" ? styles.activeOption : ""
                      }
                    >
                      {" "}
                      <span>{mat.subscriptionHeading}</span>
                      <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                  </li>
                }
                <li onClick={() => handleOptionClick("address")}>
                  <Link
                    href="#address"
                    className={
                      activeOption === "address" ? styles.activeOption : ""
                    }
                  >
                    <span>{mat.addressesHeading}</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li>
                {/* <li onClick={() => handleOptionClick("payment")}>
                  <Link
                    href="#payment"
                    className={
                      activeOption === "payment" ? styles.activeOption : ""
                    }
                  >
                    <span>{mat.paymentHeading}</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li> */}
                <li onClick={() => handleOptionClick("accountinfo")}>
                  <Link
                    href="#accountinfo"
                    className={
                      activeOption === "accountinfo" ? styles.activeOption : ""
                    }
                  >
                    <span>{mat.accountHeading}</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <Link href="#logout">
                    <span>{mat.logHeading}</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Render active content based on activeOption */}
        <div className={styles.allcontainer}>
          {activeOption === "orders" && (
            <div>
              <h4 className={styles.ordercontainer}>{mat.ordersHeading}</h4>
              <Orderaccount showOrderView={showOrderView} isUserLoggedIn={isUserLoggedIn}
                setShowOrderView={toggleOrderView} orders={orders} orderobj={orderObj}
                setOlloading={setOlloading} applyLoader={applyLoader}
                orderDates={orderDatesData} />
            </div>
          )}

          {activeOption === "subscription" &&

            (
              <div>
                <h4 className={styles.ordercontainer}>{mat.subscriptionHeading}</h4>
                <Mysubscription showOrderView={showOrderView} isUserLoggedIn={isUserLoggedIn}
                  setOlloading={setOlloading} applyLoader={applyLoader}
                  setShowOrderView={setShowOrderView} setLoading={setLoading} showOrderViewTab={showOrderViewTab} />
              </div>
            )}
          {activeOption === "address" && profile && (
            <div>
              <h4 className={styles.ordercontainer}>{mat.addressesHeading}</h4>
              <Address
                profile={profile} setUserProfile={setUserProfile}
                setOlloading={setOlloading} applyLoader={applyLoader}
                setShowSaveAddressBox={setShowSaveAddressBox}
                showSaveAddressBox={showSaveAddressBox}
                showAddAddressButton={showAddAddressButton}
                setShowAddAddressButton={setShowAddAddressButton}
                showshippingAddress={showshippingAddress}
                setShippingAddress={setShippingAddress}
                isUserLoggedIn={isUserLoggedIn}
              />
            </div>
          )}

          {activeOption === "accountinfo" && profile && (
            <div>
              <h4 className={styles.ordercontainer}>{mat.accountHeading}</h4>
              <Accountinformation profile={profile} setUserProfile={setUserProfile}
                setOlloading={setOlloading} applyLoader={applyLoader} isUserLoggedIn={isUserLoggedIn} />
            </div>
          )}

          {activeOption === "payment" && (
            <div>
              <h4 className={styles.ordercontainer}>{mat.paymentHeading}</h4>
              <Payment setOlloading={setOlloading} applyLoader={applyLoader} />
            </div>
          )}
        </div>

        {/* Logout confirmation popup */}
        {showLogoutConfirmation && (
          <div className={styles.overlay}>
            <div className={styles.logoutConfirmation}>
              <div className={styles.confirmationMessage}>
                <p>{mat.areYouSure}</p>
                <div className={styles.actions}>
                  <button onClick={cancelLogout} className={styles.cancelbtn}>
                    {mat.cancelHeading}
                  </button>
                  <button onClick={async () => {
                    await applyLoader(setOlloading, confirmLogout, [])
                  }} className={styles.logoutbtn}>
                    {mat.logHeading}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Account;
