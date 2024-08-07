import React, { useState, useEffect }  from "react";
import styles from "./shipping.module.css";
import Telephone from "@/components/atoms/Telephone/Telephone";
import Link from "next/link";
import { checkoutTranslation } from "@/locales";

const lang = process.env.NEXT_PUBLIC_LANG || "se";

function Shipping({ shippingAddressProp }) {
  const check = checkoutTranslation[lang];
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    if (shippingAddressProp) {
      setShippingAddress(shippingAddressProp);
    }
  }, [shippingAddressProp]);

  const updateShippingAddress = (e, column) => {
    setShippingAddress({ ...shippingAddress, [column]: e.target.value });
  };

  return (
    <>
      <div className={styles.Checkoutcontainer}>
        <div className={styles.mainconatiner}>
          <div className={styles.formcheckout}>
            <div className={styles.wrapper}>
              <main className={styles.leftContainer}>
                <div className={styles.fieldColumn}>
                  <p className={styles.formTitle}>{check.deliver}</p>
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="First_Name">{check.firstName}</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      value={shippingAddress?.first_name}
                      placeholder="First Name"
                      onChange={(e) => updateShippingAddress(e, "first_name")}
                      name="First_Name"
                    />
                  </div>
                </div>
             
                <div className={styles.fieldColumn}>
                  <label htmlFor="Last_Name">{check.lastName}</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={shippingAddress?.last_name}
                    placeholder="Last Name"
                    onChange={(e) => updateShippingAddress(e, "last_name")}
                    name="Last_Name"
                  />
                </div>
                
                <div className={styles.fieldColumn}>
                  <label htmlFor="setStandardOrderNote">{check.country}</label>
                  <select
                    id="setStandardOrderNote"
                    value={shippingAddress?.country}
                    onChange={(e) => updateShippingAddress(e, "country")}
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
                    value={shippingAddress?.address_1}
                    onChange={(e) => updateShippingAddress(e, "address_1")}
                  />
                  <input
                    className={`${styles.inputField} ${styles.apartment}`}
                    type="text"
                    placeholder="Apartment, suite, number"
                    name="Apartment, suite, number"
                    value={shippingAddress?.address_2}
                    onChange={(e) => updateShippingAddress(e, "address_2")}
                  />
                </div>
                <div className={styles.fieldsRow}>
                  <div className={styles.fieldColumn}>
                    <label htmlFor="text">{check.town}</label>
                    <input
                      className={styles.inputField}
                      type="text"
                      value={shippingAddress?.city}
                      placeholder="Town"
                      onChange={(e) => updateShippingAddress(e, "city")}
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
                      value={shippingAddress?.state}
                      onChange={(e) => updateShippingAddress(e, "state")}
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
                      value={shippingAddress?.postcode}
                      placeholder="25002"
                      onChange={(e) => updateShippingAddress(e, "postcode")}
                      name="text"
                    />
                  </div>
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

export default Shipping;
