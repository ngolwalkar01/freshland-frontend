import React, { useState } from "react";
import { checkoutTranslation } from "@/locales";
import Telephone from "@/components/atoms/Telephone/Telephone";
import styles from "@/components/pages/checkout/Checkout.module.css";

const lang = process.env.NEXT_PUBLIC_LANG || "se";

const ShippingBillingAddress = () => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [error, setError] = useState(false);

  const check = checkoutTranslation[lang];

  const submit = () => {
    setError(true);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.editcontentPopup} style={{ display: "editshow" ? "flex" : "none" }}>
        <div className={styles.tabs}>
          <button
            className={activeTab === "shipping" ? styles.activeTab : ""}
            onClick={() => setActiveTab("shipping")}
          >
           {check.shippingAddress}
          </button>
          <button
            className={activeTab === "billing" ? styles.activeTab : ""}
            onClick={() => setActiveTab("billing")}
            disabled={useSameAddress}
          >
            {check.billingAdd}
          </button>
        </div>

        {activeTab === "shipping" && (
          <div className={styles.shippingAdd}>
            <label>
              <strong>{check.shippingAddress}</strong>
            </label>
            <div className={styles.fieldColumn}>
              <label htmlFor="Street_Name_and_Number">{check.street}*</label>
              <input
                className={styles.inputField}
                type="text"
                placeholder={check.street}
                name="Street_Name_and_Number"
                onChange={(e) => {}}
              />
            <p className={styles.errorMessagePopup}>
                Required*
            </p>
            </div>
            <div className={styles.fieldsRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="Street_Name_and_Number">
                  {check.apartmentSuiteUnitEtc}
                </label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={check.apartmentSuiteUnitEtc}
                  name="address"
                  value={""}
                  onChange={() => {}}
                />
              <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
            </div>
            <div className={styles.fieldsRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="Zip">{check.PostcodeZip}</label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={check.PostcodeZip}
                  name="Zip code"
                  value={""}
                  onChange={(e) => {}}
                />
              <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
              <div className={styles.fieldColumn}>
                <label>{check.cPhone}*</label>
                <Telephone
                  value={""}
                  onChange={(e) => {}}
                />
              <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
            </div>
            <div className={styles.fieldsRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="city">{check.townCity}*</label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={check.townCity}
                  name="city"
                />
              </div>
            </div>
            <div className={styles.fieldsRowChecking}>

                <input
                  type="checkbox"
                  checked={useSameAddress}
                  onChange={(e) => {
                    setUseSameAddress(e.target.checked);
                    if (e.target.checked) setActiveTab("shipping");
                    else setActiveTab("billing");
                  }}
                />
                <label>{check.useSameAddressForBilling}</label>

            </div>
          </div>
        )}

        {!useSameAddress && activeTab === "billing" && (
          <div className={styles.shippingAdd}>
            <label>
              <strong>{check.billingAdd}</strong>
            </label>
            <div className={styles.fieldColumn}>
              <label htmlFor="Street_Name_and_Number">{check.street}*</label>
              <input
                className={styles.inputField}
                type="text"
                placeholder={check.street}
                name="Street_Name_and_Number"
                onChange={(e) => {}}
              />
              <p className={styles.errorMessagePopup}>
                Required*
            </p>
            </div>
            <div className={styles.fieldsRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="Street_Name_and_Number">
                {check.apartmentSuiteUnitEtc}
                </label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={check.apartmentSuiteUnitEtc}
                  name="address"
                  value={""}
                  onChange={() => {}}
                />
                <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
            </div>
            <div className={styles.fieldsRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="Zip">{check.PostcodeZip}*</label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={check.PostcodeZip}
                  name="Zip code"
                  value={""}
                  onChange={(e) => {}}
                />
                <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
              <div className={styles.fieldColumn}>
                <label>{check.cPhone}*</label>
                <Telephone
                  value={""}
                  onChange={(e) => {}}
                />
                <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
            </div>
            <div className={styles.fieldsRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="city">{check.townCity}*</label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={check.townCity}
                  name="city"
                />
                <p className={styles.errorMessagePopup}>
                Required*
            </p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.popUpBtns}>
        <button
            className={styles.closeButton}
          >
           {check.close}
          </button>
        <button
            className={styles.saveButton}
          >
            {check.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingBillingAddress;
