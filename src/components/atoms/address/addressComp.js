import React, { useState, useEffect } from 'react';
import UserAddress from './userAddress';
import { checkoutTranslation, cartTranslation, errorTranslation } from '@/locales';
import styles from './address.module.css';
import {
    setCustomerDetails, saveUserInformation
} from "@/components/service/cart";
import OverLayLoader from "@/components/atoms/overLayLoader";

function AddressComp({ billingAddressData }) {
    const [userAddresses, setUserAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
    const [billingAddress, setBillingAddress] = useState(null);
    const [showBillingAddress, setShowBillingAddress] = useState(true);
    const [firstName, setFirstName] = useState(billingAddressData?.first_name || "");
    const [lastName, setLastName] = useState(billingAddressData?.last_name || "");
    const [errors, setErrors] = useState({});
    const [token, setToken] = useState("");
    const [olLoader, setOlLoader] = useState(false);
    const [enableEditableMode, setEditableMode] = useState({
        status: false,
        index: -1,
    });

    const lang = process.env.NEXT_PUBLIC_LANG || 'se';
    const check = checkoutTranslation[lang];
    const errormsg = errorTranslation[lang];

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const setCustomerDetail = async (
        firstName,
        lastName,
        userAddresses,
        selectedAddressIndex,
        stopRedirectToLogin
    ) => {
        stopRedirectToLogin = stopRedirectToLogin || "";
        if (
            !(userAddresses && userAddresses.length > 0 && selectedAddressIndex > -1)
        )
            return;
        const currentAddress = userAddresses[selectedAddressIndex];
        const { address_1, city, postcode, phone } = currentAddress;

        const country = process.env.NEXT_PUBLIC_COUNTRY || "SE";
        const customerInfo = {
            billing_address: {
                first_name: firstName,
                last_name: lastName,
                company: "",
                address_1: address_1,
                address_2: "",
                city: city,
                state: "",
                postcode: postcode,
                country: country,
                email: email,
                phone: phone,
            },
            shipping_address: {
                first_name: firstName,
                last_name: lastName,
                company: "",
                address_1: address_1,
                address_2: "",
                city: city,
                state: "",
                postcode: postcode,
                country: country,
                phone: phone,
            },
        };
        const data = await setCustomerDetails(customerInfo, stopRedirectToLogin);
        return data;
    };

    const handleErrorChange = (event, key) => {
        const { value } = event.target;
        setErrors(prevErrors => ({
            ...prevErrors,
            [key]: value.trim() ? null : errormsg[key + 'Required']
        }));
    };

    const validateUserAddress = () => {
        const { address_1, city, postcode, phone } = billingAddress || {};
        const isNotValidBillingAddress = !(address_1 && city && postcode && phone && phone.length >= 9);
        return isNotValidBillingAddress || (userAddresses && userAddresses.length > 0 && userAddresses.some(item => item.errors && typeof item.errors === 'object' && item.errors !== null && Object.keys(item.errors).length > 0));
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = errormsg.firstNameRequired;
            valid = false;
        }

        if (!lastName.trim()) {
            newErrors.lastName = errormsg.lastNameRequired;
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmit(true);
        if (validateForm()) {
            console.log('Form is valid, proceed with submission');
        } else {
            console.log('Form is invalid, display errors');
        }
    };

    const getSuggestions = async (value) => {
        if (value.length >= 2) {
            let url = process.env.NEXT_PUBLIC_ADDRESS_URL;
            url = url.replace("searchParam", encodeURIComponent(value));
            const data = axios.get(url);
            return data;
        }
    };

    const saveUserInfo = async () => {
        const currentAddress = userAddresses[selectedAddressIndex];
        const { address_1, city, postcode, phone } = currentAddress;
    
        const country = process.env.NEXT_PUBLIC_COUNTRY || "SE";
        const customerInfo = {
          billing_address: {
            first_name: firstName,
            last_name: lastName,
            company: "",
            address_1: address_1,
            address_2: "",
            city: city,
            state: "",
            postcode: postcode,
            country: country,
            email: billingAddressData?.email,
            phone: phone,
          },
          shipping_address: {
            first_name: firstName,
            last_name: lastName,
            company: "",
            address_1: address_1,
            address_2: "",
            city: city,
            state: "",
            postcode: postcode,
            country: country,
            phone: phone,
          },
        };
        const data = await setCustomerDetails(customerInfo, "preventAuthRedirect");
        console.log(data);
    }

    const userAddressProps = {
        styles,
        token,
        getSuggestions,
        userAddresses, setUserAddresses,
        enableEditableMode, setEditableMode,
        selectedAddressIndex, setSelectedAddressIndex,
        billingAddress, setBillingAddress,
        showBillingAddress, setShowBillingAddress,
        firstName, setFirstName,
        lastName, setLastName,
        errors,
        validateUserAddress,
        setOlLoader,
        handleErrorChange,
        validateForm,
        saveUserInfo
    };

    return (
        <>
            {token && <>
                {olLoader && <OverLayLoader />}
                <div className={styles.Checkoutcontainer}>
                    <h1>{check.checkoutTitle}</h1>
                    <UserAddress userAddressProps={userAddressProps} />
                </div>
            </>}
        </>
    );
}

export default AddressComp;
