import React, { useState } from 'react';
import styles from './PopupStyles.module.css';
import klaviyoservice from '@/services/klaviyo/apiIndex'
import toastNotifications from '@/helper/toast';
import { errorTranslation, zipCodeCheckerTranslation, commonTranslation } from "@/locales";
import { setKlaviyoEmail } from '@/components/service/klaviyoTrack';

const lang = process.env.NEXT_PUBLIC_LANG || "se";

function Popup({ setShowPopup }) {
    const errormsg = errorTranslation[lang];
    const zipLabelsLang = zipCodeCheckerTranslation[lang];
    const commonLang = commonTranslation[lang];

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [errors, setErrors] = useState({});

    const closePopup = () => {
        setShowPopup(false);
    };

    const validate = () => {
        let errors = {};
        const emailRegex = /\S+@\S+\.\S+/;

        if (!firstName)
            errors.firstName = errormsg.nameRequired;

        if (!postalCode)
            errors.postalCode = errormsg.postcodeRequired;

        if (!email) {
            errors.email = errormsg.emailRequired;
        } else if (!emailRegex.test(email)) {
            errors.email = errormsg.emailInvalid;
        }

        setErrors(errors);
        return !Object.values(errors).some(x => x !== '');
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            await klaviyoservice.createProfile({
                email, firstName, "properties": {
                    "PostalCode": postalCode
                }
            });
            setKlaviyoEmail(email);
            toastNotifications.success(zipLabelsLang.subscribeSuccessMsg);
            closePopup();
        }
    }

    return (
        <div id="zip-registration-popup" className={styles.zipRegistrationPopup}>
            {JSON.stringify(errors)}
            <div className={styles.zipRegistrationPopupContent}>
                <span className={styles.close} onClick={closePopup}>&times;</span>
                <h2 className={styles.zipRegistrationPopupHeading}>{zipLabelsLang.wtList}!</h2>
                <form id="waitingListForm">
                    <input type="text" id="name" name="name" placeholder={zipLabelsLang.name} className={styles.inputField} value={firstName} onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                    {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
                    <input type="text" id="zip" name="zip" placeholder={zipLabelsLang.postalCode} className={styles.inputField} value={postalCode} onChange={(e) => {
                        setPostalCode(e.target.value);
                    }} />
                    {errors.postalCode && <span className={styles.errorMessage}>{errors.postalCode}</span>}
                    <input type="email" id="email" name="email" placeholder={commonLang.email} className={styles.inputField} value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    <button type="submit" className={styles.submitBtn} onClick={onSubmit}>{zipLabelsLang.joinList}</button>
                </form>
                <p onClick={closePopup} className={styles.noThanks}>{zipLabelsLang.noThanks}</p>
            </div>
        </div>
    );
}

export default Popup;
