import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { checkoutTranslation, cartTranslation, commonTranslation } from "@/locales";
import Telephone from "@/components/atoms/Telephone/Telephone";
import { getUserAddresses, setUserAddressesAsync, saveUserAddresses } from '@/components/service/cart';

const lang = process.env.NEXT_PUBLIC_LANG || "dk";
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const INTIAL_ADDRESS = {
    address_1: "",
    address_2: "",
    city: "",
    postcode: "",
    country: "",
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
        cartData
    } = userAddressProps;

    const check = checkoutTranslation[lang];
    const ct = cartTranslation[lang];
    const co = commonTranslation[lang];

    const [suggestions, setSuggestions] = useState([]);
    const [billingSuggestions, setBillingSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddressAdded, setNewAddressAdded] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    const cart_shipping_address = (token && userAddresses
        && userAddresses.length > 0)
        ? null : cartData?.shipping_address;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getSavedAddress = useCallback(async () => {
        return await getUserAddresses();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setIntialAddress = () => {
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
            isNewAddress,
            phone
        }
        setUserAddresses([{ ...obj }]);
        setSelectedAddress({ ...obj });
        setSelectedAddressIndex(0);
        setEditableMode({ index: 0, status: true });
    }

    const checkIfUserHaveAddress = useCallback(async () => {
        if (token) {
            let userAddress = await getSavedAddress();
            if (userAddress && userAddress.length > 0) {
                const selectedIndex = userAddress && userAddress.length > 0 && userAddress.findIndex(x => x.selected);
                setUserAddresses(userAddress);
                setSelectedAddressIndex(selectedIndex);
                setShowSaveButton(userAddress.length > 0);
                return;
            }
        }

        setIntialAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, getSavedAddress, setUserAddresses, setSelectedAddressIndex, setShowSaveButton, setEditableMode])

    useEffect(() => {
        if (!showBillingAddress && selectedAddressIndex > -1 && userAddresses && userAddresses.length > 0)
            setBillingAddress(userAddresses[selectedAddressIndex]);
    }, [showBillingAddress, selectedAddressIndex, userAddresses, setBillingAddress])

    useEffect(() => {
        checkIfUserHaveAddress();
    }, [checkIfUserHaveAddress])

    useEffect(() => {
        if (newAddressAdded) {
            const newAdd = userAddresses[userAddresses.length - 1];
            setSelectedAddress(newAdd);
            setNewAddressAdded(false);
        }
    }, [userAddresses, newAddressAdded]);

    const validateAddress = () => {
        const addressErrors = {};
        for (const key in selectedAddress) {
            if (address.hasOwnProperty(key)) {
                switch (key) {
                    case 'address_1':
                        if (!address[key]) {
                            addressErrors[key] = 'Street Name and Number is required';
                        }
                        break;
                    case 'city':
                        if (!address[key]) {
                            addressErrors[key] = 'City is required';
                        }
                        break;
                    case 'postcode':
                        if (!address[key]) {
                            addressErrors[key] = 'Postcode is required';
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

    const editAddress = (address, index) => {
        const prevAddress = { ...enableEditableMode };
        if (prevAddress.index === -1 || index === prevAddress.index) {
            setEditableMode({ index, status: !prevAddress.status });
        } else {
            setEditableMode({ index, status: true });
        }
        setSelectedAddressIndex(index);
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
            index = userAddresses.length;
            setUserAddresses([...userAddresses, newAdd]);
            setNewAddressAdded(true);
        }
        setSelectedAddressIndex(index);
        setEditableMode({ index, status: true });
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

    const fetchData1 = async (firstName, lastName, userAddresses, selectedAddressIndex) => {
        console.log('API called')
        await setCustomerDetail(firstName, lastName, userAddresses, selectedAddressIndex);
        await updateLocalStorageCartData();
    }

    // Disable linting for this line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchResults = useCallback(debounce(fetchData1, 3000), []);

    useEffect(() => {
        if (selectedAddress && userAddresses.length > 0 && selectedAddressIndex > -1) {
            debouncedFetchResults(firstName, lastName, userAddresses, selectedAddressIndex);
        }
        // Disable linting for the dependencies warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAddress, debouncedFetchResults])

    const onUpdateShippingAddress = async (e, column) => {
        let userAdd = [...userAddresses];
        userAdd[selectedAddressIndex][column] = e.target.value;
        setUserAddresses(userAdd);
        setSelectedAddress({ ...userAdd[selectedAddressIndex] });
    }

    const handleShippingSuggestion = (e) => {
        handleChange(e, setSuggestions, onUpdateShippingAddress, 'address_1');
    }

    const onUpdateBillingAddress = (e, column) => {
        const newBillingAddress = billingAddress ? { ...billingAddress } : {};
        newBillingAddress[column] = e.target.value;
        setBillingAddress(newBillingAddress);
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
        setBillingAddress(newBillingAddress);
        setBillingSuggestions([]);
    };

    const updateUserAddress = async (i) => {
        await setUserAddressesAsync(i)
        await checkIfUserHaveAddress();
        await updateLocalStorageCartData();
    }

    const savedAddress = async () => {
        await saveUserAddresses(userAddresses);
        await checkIfUserHaveAddress();
    }

    return (
        <>
            <div className={styles.fieldColumn}>
                <div className={styles.shippingAdd}>
                    <label>
                        <strong>SHIPPING ADDRESS</strong>
                    </label>
                </div>
                {token && (
                    <>
                        {
                            userAddresses && userAddresses.length > 0 && userAddresses.filter(x => !x.isNewAddress).map((x, i) => {
                                return (
                                    <>
                                        {(x.address_1 || firstName || lastName) ? (
                                            <div key={i} className={styles.addresscontainer}>
                                                <div className={styles.address}>
                                                    <p className="M-Body-Medium">{firstName} {lastName}</p>
                                                    <p className="M-Caption">
                                                        {x.address_1}
                                                    </p>
                                                </div>
                                                <input type="radio" id="user_address" checked={x.selected} name="user_address" value="user_address" onChange={() => updateUserAddress(i)} />
                                                <p onClick={() => { editAddress(x, i); }}>
                                                    Edit
                                                </p>
                                            </div>
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
                    {(!token || enableEditableMode.status) && (
                        <div className={styles.shippingAdd}>
                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="First_Name">{check.fName}*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        name="First_Name"
                                    />
                                    {errors.firstName && (
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
                                        placeholder="Last Name"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        name="Last_Name"
                                    />
                                    {errors.lastName && (
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
                                    placeholder="Street Name and Number"
                                    name="Street_Name_and_Number"
                                    value={selectedAddress?.address_1 || ""}
                                    onChange={(e) => { onUpdateShippingAddress(e, 'address_1'); }}
                                />
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
                                        Apartment, Suite, Unit, Etc. (optional)
                                    </label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="Apartment,suite"
                                        name="address"
                                        value={""}
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>

                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="Zip">Postcode/Zip*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="Zip code"
                                        name="Zip code"
                                        value={selectedAddress?.postcode || ""}
                                        onChange={(e) => { onUpdateShippingAddress(e, 'postcode'); }}
                                    />
                                </div>
                                <div className={styles.fieldColumn}>
                                    <label>{check.cPhone}*</label>
                                    <Telephone
                                        value={selectedAddress?.phone || ""}
                                        onChange={(e) => {
                                            onUpdateShippingAddress({
                                                target: {
                                                    value: e
                                                }
                                            }, 'phone');
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="city">Town/City*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={selectedAddress?.city || ""}
                                        onChange={(e) => { onUpdateShippingAddress(e, 'city'); }}
                                    />
                                </div>
                            </div>
                            {token && showSaveButton && (
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
                            )}
                        </div>
                    )}

                    {/*  */}
                    <div className={styles.sendaddress}>
                        <input
                            type="checkbox"
                            checked={showBillingAddress}
                            onChange={(e) => { setShowBillingAddress(e.target.checked); }}
                        />
                        <label htmlFor="Send_to_another_address">
                            Use same address for billing
                        </label>
                    </div>
                    {/*  */}
                    {/* billing information */}

                    {!showBillingAddress && (
                        <div
                            className={styles.shippingAdd}
                            style={{ display: "checkbox" ? "block" : "none" }}
                        >
                            <label>
                                <strong>BILLING ADDRESS</strong>
                            </label>

                            {/*  */}

                            <div className={styles.fieldColumn}>
                                <label htmlFor="Street_Name_and_Number">
                                    {check.street}*
                                </label>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="Street Name and Number"
                                    name="Street_Name_and_Number"
                                    value={billingAddress?.address_1 ? billingAddress.address_1 : ""}
                                    onChange={(e) => { onUpdateBillingAddress(e, 'address_1'); }}
                                />
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
                                        Apartment, Suite, Unit, Etc. (optional)
                                    </label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="Apartment,suite"
                                        name="address"
                                        value={""}
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>

                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="Zip">Postcode/Zip*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="Zip code"
                                        name="Zip code"
                                        value={billingAddress?.postcode ? billingAddress.postcode : ""}
                                        onChange={(e) => { onUpdateBillingAddress(e, 'postcode'); }}
                                    />
                                </div>
                                <div className={styles.fieldColumn}>
                                    <label>{check.cPhone}*</label>
                                    <Telephone
                                        value={billingAddress?.phone ? billingAddress.phone : ""}
                                        onChange={(e) => { onUpdateBillingAddress(e, 'phone'); }}
                                    />
                                </div>
                            </div>
                            <div className={styles.fieldsRow}>
                                <div className={styles.fieldColumn}>
                                    <label htmlFor="city">Town/City*</label>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={billingAddress?.city ? billingAddress.city : ""}
                                        onChange={(e) => { onUpdateBillingAddress(e, 'city'); }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {(!selectedAddress?.isNewAddress) && showSaveButton && (
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
            </div>
        </>
    );
}

export default UserAddress;
