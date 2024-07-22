import React, { useState, useEffect } from "react";
import styles from "@/components/atoms/Telephone/Telephone.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Telephone = () => {
  // const [value, setValue] = useState()

  useEffect(() => {
    // Access the flag element by class name
    const flagElement = document.querySelector(".selected-flag");
    // Check if the flag element exists
    if (flagElement) {
      // Set the aria-label attribute
      flagElement.setAttribute("aria-label", "Country Code Selection");
    }
  }, []);

  return (
    <PhoneInput
      inputStyle={{
        border: "10px solid black",
        boxsizing: "border-box",
        width: "100%",
        maxwidth: "319px",
        height: "48px",
        background: "#FFFFFF",
        border: "1px solid #E7E7E7",
        borderradius: "8px",
        fontWeight: "600",
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`,
      }}
      buttonStyle={{
        background: "rgb(44, 44, 44, 0.2)",
      }}
      required
      countryCodeEditable={false}
    />
  );
};

export default Telephone;
