import React, { useState, useEffect } from "react";
import styles from "./address.module.css";
import Link from "next/link";
import { myaccountTranslation } from "@/locales";
import Biiling from "../biilingaddress/biiling";
import Shipping from "@/components/atoms/shippingaddress/shipping";
import AccountAPI from "@/services/account";

const lang = process.env.NEXT_PUBLIC_LANG || "dk";

export const AddressInfo = ({ address }) => {
  if (!address)
    return (
      <div>
        <p>Not available !</p>
      </div>
    )

  const {
    address_1,
    city,
    email,
    first_name,
    last_name,
    postcode,
    country,
    state,
    phone
  } = address ? address : {};

  return (
    <div>
      <p>{first_name} {last_name}</p>
      <p>{address_1}</p>
      <p>{city ? `${city} ,` : ""} {state} {postcode}</p>
      <p>{country}</p>
      <p>{email ? email : ""}</p>
      <p>{phone ? phone : ""}</p>
    </div>
  )
}

function Address({
  isUserLoggedIn,
  showSaveAddressBox,
  setShowSaveAddressBox,
  showAddAddressButton,
  setShowAddAddressButton,
  showshippingAddress,
  setShippingAddress,
}) {
  const token = isUserLoggedIn();
  const mat = myaccountTranslation[lang];
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShipingAddress] = useState(null);
  // const [showSaveAddressBox, setShowSaveAddressBox] = useState(false);

  //  const [showshippingAddress, setShippingAddress] = useState(false);
  //  const [showshippingAddressbtn, setShippingAddressBtn] = useState(true);
  const toggleSaveAddressBox = () => {
    setShowSaveAddressBox(!showSaveAddressBox);
    setShowAddAddressButton(!showAddAddressButton);
  };
  const toggleShippingAddress = () => {
    // setShowSaveAddressBox(!showSaveAddressBox);
    setShowAddAddressButton(!showAddAddressButton);
    setShippingAddress(!showshippingAddress);
  };

  useEffect(() => {
    const getCustomerAddresses = async () => {
      const addressDetails = await AccountAPI.getCustomerAddresses(token);
      const userBillingAddress = addressDetails?.billing_address;
      const userShippingAddress = addressDetails?.shipping_address;
      setBillingAddress(userBillingAddress);
      setShipingAddress(userShippingAddress);
    }

    getCustomerAddresses();
  }, [token])

  const showEditBtn = process.env.NEXT_PUBLIC_IS_EDIT_ADDRESS === 'true';
  return (
    <>
      <div>
        {showAddAddressButton && (
          <div className={styles.addresscontent}>
            <div>
              <p className={`W-Body-Regular ${styles.followingpage}`}>
                {mat.theFollowingAddresses}
              </p>
            </div>

            <div className={styles.addresscontainer}>
              <div>
                <div className={styles.editaddress}>
                  <h4>{mat.billingAddress}</h4>
                  {showEditBtn && billingAddress && <Link href="#" onClick={toggleSaveAddressBox}>
                    {mat.edit}
                  </Link>}
                </div>
                {billingAddress && <AddressInfo address={billingAddress} />}
              </div>
              <div>
                <div className={styles.editaddress}>
                  <h4>{mat.deliveryAddress}</h4>
                  {showEditBtn && shippingAddress && <Link href="#" onClick={toggleShippingAddress}>
                    {mat.edit}
                  </Link>}
                </div>
                {shippingAddress && <AddressInfo address={shippingAddress} />}
              </div>
            </div>
          </div>
        )}
        {/*  save address box */}
        {showSaveAddressBox && <Biiling billingAddressProp={billingAddress} />}
        {showshippingAddress && <Shipping shippingAddressProp={shippingAddress} />}
      </div>
    </>
  );
}

export default Address;
