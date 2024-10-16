import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { checkoutTranslation, cartTranslation, commonTranslation, errorTranslation } from "@/locales";
import Telephone from "@/components/atoms/Telephone/Telephone";
import { getUserAddresses, setUserAddressesAsync, saveUserAddresses } from '@/components/service/cart';
import Image from 'next/image';
import { applyLoader } from "@/helper/loader";
import { deepCopyArray } from "@/helper/deepCopy";

const lang = process.env.NEXT_PUBLIC_LANG || "se";
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const INTIAL_ADDRESS = {
    address_1: "",
    address_2: "",
    city: "",
    postcode: "",
    country: process.env.NEXT_PUBLIC_COUNTRY || "SE",
    state: "",
    selected: false,
    isNewAddress: true,
    phone: ""
}

const MOCK_INTIAL_ADDRESSES = [1, 2, 3].map((x) => {
    return {
        address_1: `address_1_${x}`,
        address_2: `address_2_${x}`,
        city: `city_${x}`,
        postcode: `postcode_${x}`,
        country: `country_${x}`,
        state: `state_${x}`,
        selected: false,
        isNewAddress: false,
        phone: ""
    }
})

const Suggestions = ({ styles, suggestions, handleSelectSuggestion }) => {
    return (
        <>
            {suggestions.length > 0 && (
                <ul className={styles.addresssdrop}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.tekst}
                            onClick={() =>
                                handleSelectSuggestion(suggestion)
                            }
                        >
                            {suggestion.tekst}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

function UserAddress({ userAddressProps }) {
    const {
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
        setCustomerDetail,
        updateLocalStorageCartData,
        errors, setErrors,
        cartData,
        isSubmit, setIsSubmit,
        validateUserAddress,
        setOlLoader,
        setCartDataByCartData,
        handleErrorChange
    } = userAddressProps;

    const check = checkoutTranslation[lang];
    const ct = cartTranslation[lang];
    const co = commonTranslation[lang];
    const errormsg = errorTranslation[lang]
    const [suggestions, setSuggestions] = useState([]);
    const [billingSuggestions, setBillingSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddressAdded, setNewAddressAdded] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [isAddressEdit, setIsAddressEdit] = useState(false);
    const [originalUserAddresses, setOriginalUserAddresses] = useState([]);
    const [userAddressSubmit, setUserAddressSubmit] = useState(false);

    const cart_shipping_address = (token && userAddresses
        && userAddresses.length > 0)
        ? null : cartData?.shipping_address;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getSavedAddress = useCallback(async () => {
        return await getUserAddresses();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setIntialAddress = (isNewlyAddress) => {
        const {
            address_1,
            address_2,
            city,
            postcode,
            country,
            state,
            selected,
            isNewAddress,
            phone
        } = cart_shipping_address || {}
        const obj = {
            address_1,
            address_2,
            city,
            postcode,
            country,
            state,
            selected,
            isNewAddress: isNewlyAddress ? isNewlyAddress : isNewAddress,
            phone
        }
        const validAddress = checkAddress(obj);
        setUserAddresses([{ ...validAddress }]);
        setSelectedAddress({ ...validAddress });
        setSelectedAddressIndex(0);
        setEditableMode({ index: 0, status: true });
    }

    const resetForm = () => {
        setEditableMode({
            status: false,
            index: -1,
        });
        setSelectedAddress(null);
        setNewAddressAdded(false);
        setShowSaveButton(false);
    }

    const onCancel = () => {
        setUserAddresses(deepCopyArray(originalUserAddresses));
        resetForm();
    }

    const checkIfUserHaveAddress = useCallback(async () => {
        let isNewAddress = true;
        if (token) {
            let userAddress = await getSavedAddress();
            if (userAddress && userAddress.length > 0) {
                isNewAddress = false;
                const selectedIndex = userAddress && userAddress.length > 0 && userAddress.findIndex(x => x.selected);
                const validUserAddresses = userAddress.map((x) => {
                    const validAddress = checkAddress(x);
                    return validAddress;
                })
                setUserAddresses(validUserAddresses);
                setOriginalUserAddresses(deepCopyArray(validUserAddresses));
                setSelectedAddressIndex(selectedIndex);
                setShowSaveButton(validUserAddresses.length > 0);
                return;
            }
        }

        setIntialAddress(isNewAddress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, getSavedAddress, setUserAddresses, setSelectedAddressIndex, setShowSaveButton, setEditableMode])

    const checkAddress = (userCurrentAddress) => {
        const currentAdd = { ...userCurrentAddress };
        const errorData = isAddressValid(currentAdd);
        currentAdd.errors = errorData.isValid ? null : errorData.errors;
        return { ...currentAdd };
    }

    useEffect(() => {
        if (showBillingAddress && selectedAddressIndex > -1 && userAddresses && userAddresses.length > 0) {
            const currentBillingAddress = checkAddress(userAddresses[selectedAddressIndex]);
            setBillingAddress(currentBillingAddress);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showBillingAddress, selectedAddressIndex, userAddresses, setBillingAddress])

    useEffect(() => {
        checkIfUserHaveAddress();
    }, [checkIfUserHaveAddress])

    useEffect(() => {
        if (newAddressAdded) {
            const index = userAddresses.length - 1;
            const newAdd = userAddresses[userAddresses.length - 1];
            setSelectedAddress(newAdd);
            setNewAddressAdded(false);
            setEditableMode({ index, status: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddresses, newAddressAdded]);

    const validateAddress = () => {
        const addressErrors = {};
        for (const key in selectedAddress) {
            if (address.hasOwnProperty(key)) {
                switch (key) {
                    case 'address_1':
                        if (!address[key]) {
                            addressErrors[key] = errormsg.streetNameAndNumberRequired;
                        }
                        break;
                    case 'city':
                        if (!address[key]) {
                            addressErrors[key] = errormsg.cityRequired;
                        }
                        break;
                    case 'postcode':
                        if (!address[key]) {
                            addressErrors[key] = errormsg.postcodeRequired;
                        }
                        break;
                    case 'phone':
                        if (!address[key]) {
                            addressErrors[key] = 'Phone number is required';
                        } else if (!/^\+?\d{1,2}-\d{10}$/.test(address[key])) {
                            addressErrors[key] = 'Phone number must include country code (1-2 digits) followed by 10 digits';
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return addressErrors
    };

    const editAddress = async (address, index) => {
        await onSelectAddress(index);
        resetForm();
        const prevAddress = { ...enableEditableMode };
        if (prevAddress.index === -1 || index === prevAddress.index) {
            setEditableMode({ index, status: !prevAddress.status });
        } else {
            setEditableMode({ index, status: true });
        }
        // setSelectedAddressIndex(index);
        setSelectedAddress({ ...userAddresses[index] });
    }

    const handleChange = async (event, suggestionEvent, updateShippingBillingAddress, column) => {
        try {
            const value = event.target.value;
            updateShippingBillingAddress(event, column);
            if (value.length >= 2) {
                const suggData = await getSuggestions(value);
                suggestionEvent(suggData.data);
            } else {
                suggestionEvent([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const addNewAddress = async () => {
        let index = userAddresses.findIndex(x => x.isNewAddress);
        if (index === -1) {
            const newAdd = { ...INTIAL_ADDRESS, isNewAddress: true };
            const validAddress = checkAddress(newAdd);
            index = userAddresses.length;
            setUserAddresses([...userAddresses, validAddress]);
        }
        setNewAddressAdded(true);
        // setSelectedAddressIndex(index);
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchData1 = async () => {
        if (!validateUserAddress() && isAddressEdit) {
            try {
                const preventAuthRedirect = "preventAuthRedirect";
                const cartData = await applyLoader(setOlLoader, setCustomerDetail, [
                    firstName, lastName, userAddresses, selectedAddressIndex, preventAuthRedirect
                ]);
                setCartDataByCartData(cartData);
                setIsAddressEdit(false);
            } catch (error) {
                await applyLoader(setOlLoader, updateLocalStorageCartData, []);
            }
        }
    }

    // const fetchData1 = async (firstName, lastName, userAddresses, selectedAddressIndex) => {
    //     const preventAuthRedirect = "preventAuthRedirect";
    //     await setCustomerDetail(firstName, lastName, userAddresses, selectedAddressIndex, preventAuthRedirect);
    //     await updateLocalStorageCartData();
    // }

    // Disable linting for this line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const debouncedFetchResults = useCallback(debounce(fetchData1, 3000), []);

    // useEffect(() => {
    //     if (selectedAddress && userAddresses.length > 0 && selectedAddressIndex > -1) {
    //         debouncedFetchResults(firstName, lastName, userAddresses, selectedAddressIndex);
    //     }
    //     // Disable linting for the dependencies warning
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedAddress])

    const isAddressValid = (fields) => {
        const errors = {};

        if (!(fields.address_1 && fields.address_1.trim())) {
            errors.address_1 = errormsg.addressRequired;
        }

        if (!(fields.city && fields.city.trim())) {
            errors.city = errormsg.cityRequired;
        }

        if (!(fields.postcode && fields.postcode.trim())) {
            errors.postcode = errormsg.postcodeRequired;
        }

        if (!(fields.phone && fields.phone.trim())) {
            errors.phone = errormsg.phoneNumberRequired;
        } else if (fields.phone.length < 9) {
            errors.phone = errormsg.phoneNumberInvalid;
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    const onUpdateShippingAddress = async (e, column) => {
        let userAdd = [...userAddresses];
        let currentIndex = enableEditableMode ? enableEditableMode.index : 0;

        if (selectedAddress?.isNewAddress)
            currentIndex = userAddresses.length - 1;

        userAdd[currentIndex][column] = e.target.value;
        const errorData = isAddressValid(userAdd[currentIndex]);
        userAdd[currentIndex].errors = errorData.isValid ? null : errorData.errors
        setUserAddresses(userAdd);
        setSelectedAddress({ ...userAdd[currentIndex] });
        setIsAddressEdit(true);
    }

    const handleShippingSuggestion = (e) => {
        handleChange(e, setSuggestions, onUpdateShippingAddress, 'address_1');
    }

    const onUpdateBillingAddress = (e, column) => {
        const newBillingAddress = billingAddress ? { ...billingAddress } : {};
        newBillingAddress[column] = e.target.value;
        const currentBillingAddress = checkAddress(newBillingAddress);
        setBillingAddress(currentBillingAddress);
        setIsAddressEdit(true);
    }

    const handleBillingSuggestion = (e) => {
        handleChange(e, setBillingSuggestions, onUpdateBillingAddress, 'address_1');
    }

    const handleShippingSelectSuggestion = async (suggestion) => {
        const city = suggestion?.adgangsadresse?.postnrnavn;
        const postcode = suggestion?.adgangsadresse?.postnr;
        const country = process.env.NEXT_PUBLIC_COUNTRY || "DK";

        const userAdd = [...userAddresses];
        const currIndex = enableEditableMode.index;
        userAdd[currIndex]['address_1'] = suggestion.tekst;
        userAdd[currIndex]['city'] = city;
        userAdd[currIndex]['postcode'] = postcode;
        userAdd[currIndex]['country'] = country;
        const errorData = isAddressValid(userAdd[currIndex]);
        userAdd[currIndex].errors = errorData.isValid ? null : errorData.errors
        setUserAddresses(userAdd);
        setSuggestions([]);
        setSelectedAddress({ ...userAdd[currIndex] });
    };

    const handleBillingSelectSuggestion = async (suggestion) => {
        const city = suggestion?.adgangsadresse?.postnrnavn;
        const postcode = suggestion?.adgangsadresse?.postnr;
        const country = process.env.NEXT_PUBLIC_COUNTRY || "DK";

        const newBillingAddress = billingAddress ? { ...billingAddress } : {};
        newBillingAddress['address_1'] = suggestion.tekst;
        newBillingAddress['city'] = city;
        newBillingAddress['postcode'] = postcode;
        newBillingAddress['country'] = country;
        const currentBillingAddress = checkAddress(newBillingAddress);
        setBillingAddress(currentBillingAddress);
        setBillingSuggestions([]);
    };

    const updateUserAddress = async (i) => {
        await setUserAddressesAsync(i);
        await checkIfUserHaveAddress();
    }

    const onSelectAddress = async (i) => {
        await applyLoader(setOlLoader, updateUserAddress, [
            i
        ]);
        updateLocalStorageCartData();
    }

    const checkUserAddressValidity = (currentUserAdd) => {
        if (currentUserAdd && currentUserAdd.length > 0) {
            let isValid = true;
            currentUserAdd.forEach(x => {
                const errorData = isAddressValid(x);
                if (isValid)
                    isValid = errorData.isValid
            });
            return isValid;
        }
        return false;
    }

    const savedAddress = async (isNewAddress) => {
        try {
            setUserAddressSubmit(true);
            const isnew = isNewAddress === "true";
            const addressesToSave = isnew ? userAddresses : userAddresses.filter(x => !x.isNewAddress);
            if (checkUserAddressValidity(addressesToSave)) {
                setOlLoader(true);
                await saveUserAddresses(addressesToSave);
                resetForm();
                if (isnew) {
                    await setUserAddressesAsync(userAddresses.length - 1);
                    updateLocalStorageCartData();
                    await checkIfUserHaveAddress();
                }
                await fetchData1();
                setOlLoader(false);
                setUserAddressSubmit(false);
            }
        } catch (error) {
            setOlLoader(false);
            setUserAddressSubmit(false);
            console.log(error);
        }
    }

    const triggerFocusOut = () => {
        if (!token) {
            setTimeout(fetchData1, 100)
        }
    }

    return (
        <>
            <div className={styles.fieldColumn}>
                <div className={styles.shippingAdd}>
                    <label>
                        <strong>{check.shippingAddress}</strong>
                    </label>
                </div>
                {token && (
                    <>
                        {
                            userAddresses && userAddresses.length > 0 && userAddresses.filter(x => !x.isNewAddress).map((x, i) => {
                                const isError = (isSubmit || userAddressSubmit) && x?.errors ? Object.keys(errors).length : false
                                return (
                                    <>
                                        {(x.address_1 || firstName || lastName) ? (
                                            <>
                                                <div key={i} className={`${styles.addresscontainer} ${isError ? styles.error_border : ''}`}>
                                                    <div className={styles.selectAddress}>
                                                        <input type="radio" id="user_address" checked={x.selected} name="user_address" value="user_address" onChange={async () => {
                                                            await onSelectAddress(i);
                                                        }} />
                                                        <div className={styles.address}>
                                                            <p className="M-Body-Medium">{firstName} {lastName}</p>
                                                            <p className="M-Caption">
                                                                {x.address_1}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p onClick={() => { editAddress(x, i); }}>
                                                        <Image
                                                            src="/Images/lucide_edit.png"
                                                            width={20}
                                                            height={20}
                                                            alt="google"
                                                        ></Image>
                                                    </p>
                                                </div>

                                                <div
                                                    className={styles.editcontent}
                                                    style={{ display: "editshow" ? "block" : "none" }}
                                                >

                                                    {(enableEditableMode.index === i && enableEditableMode.status) && (
                                                        <div className={styles.shippingAdd}>
                                                            <div className={styles.fieldsRow}>
                                                                <div className={styles.fieldColumn}>
                                                                    <label htmlFor="First_Name">{check.fName}*</label>
                                                                    <input
                                                                        className={styles.inputField}
                                                                        type="text"
                                                                        value={firstName}
                                                                        placeholder={check.fName}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            setFirstName(value);
                                                                            handleErrorChange(e, 'firstName');
                                                                        }}
                                                                        name="First_Name"
                                                                        onBlur={triggerFocusOut}
                                                                    />
                                                                    {(isSubmit || userAddressSubmit) && errors.firstName && (
                                                                        <span className={styles.errorMessage}>
                                                                            {errors.firstName}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className={styles.fieldColumn}>
                                                                    <label htmlFor="Last_Name">{check.lName}*</label>
                                                                    <input
                                                                        className={styles.inputField}
                                                                        type="text"
                                                                        value={lastName}
                                                                        placeholder={check.lName}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            setLastName(value);
                                                                            handleErrorChange(e, 'lastName');
                                                                        }}
                                                                        name="Last_Name"
                                                                        onBlur={triggerFocusOut}
                                                                    />
                                                                    {(isSubmit || userAddressSubmit) && errors.lastName && (
                                                                        <span className={styles.errorMessage}>
                                                                            {errors.lastName}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={styles.fieldColumn}>
                                                                <label htmlFor="Street_Name_and_Number">
                                                                    {check.street}*
                                                                </label>
                                                                <input
                                                                    className={styles.inputField}
                                                                    type="text"
                                                                    placeholder={check.street}
                                                                    name="Street_Name_and_Number"
                                                                    value={selectedAddress?.address_1 || ""}
                                                                    onChange={(e) => { onUpdateShippingAddress(e, 'address_1'); }}
                                                                    onBlur={triggerFocusOut}
                                                                />
                                                                {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.address_1 && (
                                                                    <span className={styles.errorMessage}>
                                                                        {selectedAddress?.errors.address_1}
                                                                    </span>
                                                                )}
                                                                <Suggestions styles={styles} handleSelectSuggestion={handleShippingSelectSuggestion} suggestions={suggestions} />
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
                                                                        value={selectedAddress?.address_2 || ""}
                                                                        onChange={(e) => { onUpdateShippingAddress(e, 'address_2'); }}
                                                                        onBlur={triggerFocusOut}
                                                                    />
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
                                                                        value={selectedAddress?.postcode || ""}
                                                                        onChange={(e) => { onUpdateShippingAddress(e, 'postcode'); }}
                                                                        onBlur={triggerFocusOut}
                                                                    />
                                                                    {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.postcode && (
                                                                        <span className={styles.errorMessage}>
                                                                            {selectedAddress?.errors.postcode}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className={styles.fieldColumn}>
                                                                    <label>{check.cPhone}*</label>
                                                                    <Telephone
                                                                        value={selectedAddress?.phone || ""}
                                                                        onlyValue={true}
                                                                        onChange={(e) => {
                                                                            onUpdateShippingAddress({
                                                                                target: {
                                                                                    value: e
                                                                                }
                                                                            }, 'phone');
                                                                        }}
                                                                        onBlur={triggerFocusOut}
                                                                    />
                                                                    {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.phone && (
                                                                        <span className={styles.errorMessage}>
                                                                            {selectedAddress?.errors.phone}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={styles.fieldsRow}>
                                                                <div className={styles.fieldColumn}>
                                                                    <label htmlFor="city">{check.townCity}</label>
                                                                    <input
                                                                        className={styles.inputField}
                                                                        type="text"
                                                                        placeholder={check.townCity}
                                                                        name="city"
                                                                        value={selectedAddress?.city || ""}
                                                                        onChange={(e) => { onUpdateShippingAddress(e, 'city'); }}
                                                                        onBlur={triggerFocusOut}
                                                                    />
                                                                    {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.city && (
                                                                        <span className={styles.errorMessage}>
                                                                            {selectedAddress?.errors.city}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {token && (
                                                                <>
                                                                    <div className={styles.savecancelBtn}>
                                                                        <div className={styles.fieldsRow}>
                                                                            <div className={styles.newAddCover}>
                                                                                <button
                                                                                    type="button"
                                                                                    className={styles.newAddBtn}
                                                                                    onClick={savedAddress}
                                                                                >
                                                                                    {co.save}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.fieldsRow}>
                                                                            <div className={styles.newAddCover}>
                                                                                <button
                                                                                    type="button"
                                                                                    className={styles.newAddBtn}
                                                                                    onClick={onCancel}
                                                                                >
                                                                                    {check.cancel}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )
                            })
                        }
                    </>
                )}


                <div
                    className={styles.editcontent}
                    style={{ display: "editshow" ? "block" : "none" }}
                >

                    {(!selectedAddress?.isNewAddress) && (
                        <div className={styles.newAddCover}>
                            <button
                                type="button"
                                className={styles.newAddBtn}
                                onClick={addNewAddress}
                            >
                                {check.addTo}
                            </button>
                        </div>
                    )}

                    {(!token || enableEditableMode.status) && selectedAddress?.isNewAddress && (
                        <div className={styles.shippingAdd}>
                            {token &&
                                <label>
                                    <strong>{check.addTo}</strong>
                                </label>
                            }
                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="First_Name">{check.fName}*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        value={firstName}
                                        placeholder={check.fName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFirstName(value)
                                            handleErrorChange(e, 'firstName');
                                        }}
                                        name="First_Name"
                                        onBlur={triggerFocusOut}
                                    />
                                    {(isSubmit || userAddressSubmit) && errors.firstName && (
                                        <span className={styles.errorMessage}>
                                            {errors.firstName}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="Last_Name">{check.lName}*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        value={lastName}
                                        placeholder={check.lName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLastName(value)
                                            handleErrorChange(e, 'lastName');
                                        }}
                                        name="Last_Name"
                                        onBlur={triggerFocusOut}
                                    />
                                    {(isSubmit || userAddressSubmit) && errors.lastName && (
                                        <span className={styles.errorMessage}>
                                            {errors.lastName}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.fieldColumn}>
                                <label htmlFor="Street_Name_and_Number">
                                    {check.street}*
                                </label>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    placeholder={check.street}
                                    name="Street_Name_and_Number"
                                    value={selectedAddress?.address_1 || ""}
                                    onChange={(e) => { onUpdateShippingAddress(e, 'address_1'); }}
                                    onBlur={triggerFocusOut}
                                />
                                {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.address_1 && (
                                    <span className={styles.errorMessage}>
                                        {selectedAddress?.errors.address_1}
                                    </span>
                                )}
                                {/* {errors.streetval && (
                                <span className={styles.errorMessage}>
                                    {errors.streetval}
                                </span>
                            )} */}
                                {/* {suggestions.length > 0 && (
                                <ul className={styles.addresssdrop}>
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.tekst}
                                            onClick={() =>
                                                handleSelectSuggestion(suggestion)
                                            }
                                        >
                                            {suggestion.tekst}
                                        </li>
                                    ))}
                                </ul>
                            )} */}
                                <Suggestions styles={styles} handleSelectSuggestion={handleShippingSelectSuggestion} suggestions={suggestions} />
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
                                        value={selectedAddress?.address_2 || ""}
                                        onChange={(e) => { onUpdateShippingAddress(e, 'address_2'); }}
                                        onBlur={triggerFocusOut}
                                    />
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
                                        value={selectedAddress?.postcode || ""}
                                        onChange={(e) => { onUpdateShippingAddress(e, 'postcode'); }}
                                        onBlur={triggerFocusOut}
                                    />
                                    {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.postcode && (
                                        <span className={styles.errorMessage}>
                                            {selectedAddress?.errors.postcode}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.fieldColumn}>
                                    <label>{check.cPhone}* </label>
                                    <Telephone
                                        onlyValue={true}
                                        value={selectedAddress?.phone || ""}
                                        onChange={(e) => {
                                            onUpdateShippingAddress({
                                                target: {
                                                    value: e
                                                }
                                            }, 'phone');
                                        }}
                                        onBlur={triggerFocusOut}
                                    />
                                    {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.phone && (
                                        <span className={styles.errorMessage}>
                                            {selectedAddress?.errors.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="city">{check.townCity}</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder={check.townCity}
                                        name="city"
                                        value={selectedAddress?.city || ""}
                                        onChange={(e) => { onUpdateShippingAddress(e, 'city'); }}
                                        onBlur={triggerFocusOut}
                                    />
                                    {(isSubmit || userAddressSubmit) && selectedAddress?.errors?.city && (
                                        <span className={styles.errorMessage}>
                                            {selectedAddress?.errors.city}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {token && (
                                <>
                                    <div className={styles.cancelbtn}>
                                        <div className={styles.fieldsRow}>
                                            <div className={styles.newAddCover}>
                                                <button
                                                    type="button"
                                                    className={styles.newAddBtn}
                                                    onClick={() => {
                                                        savedAddress("true")
                                                    }}
                                                >
                                                    {co.save}
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.fieldsRow}>
                                            <div className={styles.newAddCover}>
                                                <button
                                                    type="button"
                                                    className={styles.newAddBtn}
                                                    onClick={onCancel}
                                                >
                                                    {check.cancel}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/*  */}
                    <div className={`${styles.sendaddress} ${styles.useBilling}`}>
                        <input
                            type="checkbox"
                            checked={showBillingAddress}
                            onChange={(e) => { setShowBillingAddress(e.target.checked); }}
                        />
                        <label htmlFor="Send_to_another_address">
                            {check.useSameAddressForBilling}
                        </label>
                    </div>
                    {/*  */}
                    {/* billing information */}

                    {!showBillingAddress && (
                        <div
                            className={styles.shippingAdd}
                            style={{ display: "checkbox" ? "flex" : "none" }}
                        >
                            <label>
                                <strong>{check.billingAdd}</strong>
                            </label>

                            {/*  */}

                            <div className={styles.fieldColumn}>
                                <label htmlFor="Street_Name_and_Number">
                                    {check.street}*
                                </label>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    placeholder={check.street}
                                    name="Street_Name_and_Number"
                                    value={billingAddress?.address_1 ? billingAddress.address_1 : ""}
                                    onChange={(e) => { onUpdateBillingAddress(e, 'address_1'); }}
                                />
                                {(isSubmit || userAddressSubmit) && billingAddress?.errors?.address_1 && (
                                    <span className={styles.errorMessage}>
                                        {billingAddress?.errors.address_1}
                                    </span>
                                )}
                                <Suggestions styles={styles} handleSelectSuggestion={handleBillingSelectSuggestion} suggestions={billingSuggestions} />
                                {/* {errors.streetval && (
                                <span className={styles.errorMessage}>
                                    {errors.streetval}
                                </span>
                            )} */}
                                {/* {suggestions.length > 0 && (
                                <ul className={styles.addresssdrop}>
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.tekst}
                                            onClick={() =>
                                                handleSelectSuggestion(suggestion)
                                            }
                                        >
                                            {suggestion.tekst}
                                        </li>
                                    ))}
                                </ul>
                            )} */}
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
                                        onChange={() => { }}
                                    />
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
                                        value={billingAddress?.postcode ? billingAddress.postcode : ""}
                                        onChange={(e) => { onUpdateBillingAddress(e, 'postcode'); }}
                                    />
                                    {(isSubmit || userAddressSubmit) && billingAddress?.errors?.postcode && (
                                        <span className={styles.errorMessage}>
                                            {billingAddress?.errors.postcode}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.fieldColumn}>
                                    <label>{check.cPhone}*</label>
                                    <Telephone
                                        onlyValue={true}
                                        value={billingAddress?.phone ? billingAddress.phone : ""}
                                        onChange={(e) => {
                                            onUpdateBillingAddress({
                                                target: {
                                                    value: e
                                                }
                                            }, 'phone');
                                        }}
                                    />
                                    {(isSubmit || userAddressSubmit) && billingAddress?.errors?.phone && (
                                        <span className={styles.errorMessage}>
                                            {billingAddress?.errors.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="city">{check.townCity}</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder={check.townCity}
                                        name="city"
                                        value={billingAddress?.city ? billingAddress.city : ""}
                                        onChange={(e) => { onUpdateBillingAddress(e, 'city'); }}
                                    />
                                    {(isSubmit || userAddressSubmit) && billingAddress?.errors?.city && (
                                        <span className={styles.errorMessage}>
                                            {billingAddress?.errors.city}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* for mobile version only */}
                <div className={styles.newAddressbtn}>
                    <div className={styles.sendaddress}>
                        <input
                            type="checkbox"
                            checked={showBillingAddress}
                            onChange={(e) => { setShowBillingAddress(e.target.checked); }}
                        />
                        <label htmlFor="Send_to_another_address">
                            {check.useSameAddressForBilling}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserAddress;
