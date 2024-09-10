import React, { useState, useEffect } from 'react';
import styles from './Telephone.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Telephone = ({ value = '', onChange, onBlur = () => {}, onlyValue = false }) => {
  const [countryCode, setCountryCode] = useState('+46');
  const [phoneNumber, setPhoneNumber] = useState(value);

  useEffect(() => {
    // Access the flag element by class name
    const flagElement = document.querySelector('.selected-flag');
    // Check if the flag element exists
    if (flagElement) {
      // Set the aria-label attribute
      flagElement.setAttribute('aria-label', 'Country Code Selection');
    }
  }, []);

  const handlePhoneChange = (value, countryData) => {
    const { dialCode } = countryData;
    const purePhoneNumber = value.replace(dialCode, '');

    setCountryCode(dialCode);
    setPhoneNumber(purePhoneNumber);
    onChange(purePhoneNumber);
  };

  return (
    <PhoneInput
      value={onlyValue ? countryCode + phoneNumber : value}
      country={countryCode}
      onChange={onlyValue ? handlePhoneChange : onChange}
      defaultCountry="se"
      onlyCountries={['se']}
      masks={{
        se: '(...) ...-....',
      }}
      onBlur={onBlur}
      inputStyle={{
        border: "1px solid #E7E7E7", 
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "319px",
        height: "48px",
        background: "#FFFFFF",
        borderRadius: "8px",
        fontWeight: "600",
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`
      }}
      buttonStyle={{
        background: "rgba(44, 44, 44, 0.2)"
      }}
      required
      countryCodeEditable={false}
    />
  );
}

export default Telephone;
