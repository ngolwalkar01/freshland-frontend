import React, { useState } from 'react';
import styles from './index.module.css';
import { checkZipCode } from '@/components/service/cart';
import Popup from './popup';
import { applyLoader } from '@/helper/loader';
import OverLayLoader from '../overLayLoader';
import { errorTranslation, zipCodeCheckerTranslation } from "@/locales";

const lang = process.env.NEXT_PUBLIC_LANG || "se";

function ZipCodeChecker() {
    const errormsg = errorTranslation[lang];
    const zipLabelsLang = zipCodeCheckerTranslation[lang];

    const [zipCode, setZipCode] = useState('');
    const [error, isError] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [loader, setLoader] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        isError(!zipCode);
        if (zipCode) {
            const data = await applyLoader(
                setLoader,
                checkZipCode,
                [zipCode]
            );
            if (!data?.status)
                setShowWarning(true)
        }
    }

    return (
        <>
            {loader && <OverLayLoader />}
            {showPopup && <Popup setShowPopup={setShowPopup} />}
            <div className={styles.zipcodeContainer}>
                <div className={styles.zipcodeWrapper}>
                    <div className={styles.zipcodeHeader}>
                        <h3 className={styles.headerText}>{zipLabelsLang.plsChkZipBfOd}</h3>
                        <h3 className={styles.subheaderText}>({zipLabelsLang.woutGaps})</h3>
                    </div>
                    <div className={styles.zipcodeCheck}>
                        <form className={styles.formWrapper}>
                            <div className={styles.formControlBox}>
                                <div>
                                    <input className={styles.textField} placeholder={zipLabelsLang.enterPostalCode} type="text"
                                        onChange={(e) => { setZipCode(e.target.value) }} value={zipCode} name="zipCode" />
                                </div>
                                <button className={styles.submitButton} type="submit" onClick={onSubmit}>
                                    {zipLabelsLang.verify}
                                </button>
                            </div>
                            {showWarning && (
                                <div className={styles.formControlBox}>
                                    <span>{zipLabelsLang.signUpWtList},</span>
                                    <span className={styles.pointer} onClick={() => {
                                        setShowPopup(true);
                                    }}>{zipLabelsLang.here}</span>
                                    <span>{zipLabelsLang.notifyDeliverArea}</span>
                                </div>
                            )}
                            <div>
                                {error && !zipCode && <p className={styles.errorMessage}>{errormsg.postcodeRequired}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ZipCodeChecker;
