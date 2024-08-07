import React, { useState, useEffect } from "react";
import styles from "./biiling.module.css";
import { checkoutTranslation } from "@/locales";
import Telephone from "@/components/atoms/Telephone/Telephone";

const lang = process.env.NEXT_PUBLIC_LANG || "se";

function Billing({ billingAddressProp }) {
  const check = checkoutTranslation[lang];

  const [billingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    if (billingAddressProp) {
      setShippingAddress(billingAddressProp);
    }
  }, [billingAddressProp]);

  const updateBillingAddress = (e, column) => {
    setShippingAddress({ ...billingAddress, [column]: e.target.value });
  };
  return (
    <>
      <div className={styles.Checkoutcontainer}>
        <div className={styles.mainconatiner}>
          <div className={styles.formcheckout}>
            <div className={styles.wrapper}>
              <main className={styles.leftContainer}>
                <div className={styles.fieldColumn}>
                  <p className={styles.formTitle}>{check.billingAdd}</p>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="First_Name">{check.firstName}</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      value={billingAddress?.first_name}
                      placeholder="First Name"
                      onChange={(e) => updateBillingAddress(e, "first_name")}
                      name="First_Name"
                    />
                  </div>
                </div>
                <div className={styles.fieldColumn}>
                  <label htmlFor="Last_Name">{check.lastName}</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={billingAddress?.last_name}
                    placeholder="Last Name"
                    onChange={(e) => updateBillingAddress(e, "last_name")}
                    name="Last_Name"
                  />
                </div>
                <div className={styles.fieldColumn}>
                  <label htmlFor="setStandardOrderNote">{check.country}</label>
                  <select
                    id="setStandardOrderNote"
                    onChange={(e) => updateBillingAddress(e, "country")}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                  <span className={styles.customArrow}></span>
                </div>
                <div className={styles.fieldColumn}>
                  <label htmlFor="Street_Name_and_Number">
                    {check.streetAdd}
                  </label>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="House No and Street Name"
                    name="House No and Street Name"
                    value={billingAddress?.address_1}
                    onChange={(e) => updateBillingAddress(e, "address_1")}
                  />
                  <input
                    className={`${styles.inputField} ${styles.apartment}`}
                    type="text"
                    placeholder="Apartment, suite, number"
                    name="Apartment, suite, number"
                    value={billingAddress?.address_2}
                    onChange={(e) => updateBillingAddress(e, "address_2")}
                  />
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="text">{check.town}</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="Town"
                      value={billingAddress?.city}
                      onChange={(e) => updateBillingAddress(e, "city")}
                      name="text"
                    />
                  </div>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="text">{check.state}</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="Country Option"
                      value={billingAddress?.state}
                      onChange={(e) => updateBillingAddress(e, "state")}
                      name="text"
                    />
                  </div>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="text">{check.postcode}</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="25002"
                      value={billingAddress?.postcode}
                      onChange={(e) => updateBillingAddress(e, "postcode")}
                      name="text"
                    />
                  </div>
                </div>
                <div className={styles.radioField}>
                  <label htmlFor="isBusinessAddress">{check.isThedelivery}</label>
                  <div className={styles.radioContainer}>
                    <div>
                      <input
                        type="radio"
                        id="businessNo"
                        name="isBusinessAddress"
                      />
                      <label htmlFor="businessNo">{check.noTag}</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="businessYes"
                        name="isBusinessAddress"
                      />
                      <label htmlFor="businessYes">{check.yesTag}</label>
                    </div>
                  </div>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <input
                      className={styles.inputField}
                      type="text"
                      placeholder="INSERT COMPANY NAME"
                      value={billingAddress?.company}
                      onChange={(e) => updateBillingAddress(e, "company")}
                      name="text"
                    />
                  </div>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="Phone_Number">{check.phoneno}</label>
                    <Telephone
                      value={billingAddress?.phone}
                      onChange={(e) => updateBillingAddress({ target: { value: e } }, "phone")}
                    />
                  </div>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="Email">{check.emailAddress}</label>
                    <input
                      className={styles.inputField}
                      type="email"
                      placeholder="Email Address"
                      value={billingAddress?.email}
                      onChange={(e) => updateBillingAddress(e, "email")}
                      name="Email"
                    />
                  </div>
                </div>
                <div className={styles.sendaddress}>
                  <input type="checkbox" id="Sign_me_up" />
                  <label htmlFor="Sign_me_up">{check.checkupdate}</label>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Save Address"
                    className={styles.saveaddressbtn}
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;
