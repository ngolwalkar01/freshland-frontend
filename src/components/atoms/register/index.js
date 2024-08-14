import registerStyles from "./RegisterUser.module.css";
import Link from "next/link";
import Image from 'next/image';
import { useState } from "react";
import { homepageTranslation, serviceTranslation, errorTranslation } from '@/locales';
import { commonTranslation } from '@/locales';
import klaviyoservice from '@/services/klaviyo/apiIndex'
import { toast } from 'react-toastify';
import { setKlaviyoEmail } from "@/components/service/klaviyoTrack";

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const service = serviceTranslation[lang];
const errormsg = errorTranslation[lang];

const Register = () => {
  const cmt = commonTranslation[lang];
  const hpt = homepageTranslation[lang];
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    // return true;
    const errors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = errormsg.firstNameRequired;
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = errormsg.lastNameRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = errormsg.emailInvalid;
      isValid = false;
    }


    if (!isChecked) {
      errors.isChecked = errormsg.agreeToTerms;
      isValid = false;
    }
    // Add more validation rules for other fields if needed

    setErrors(errors);
    return isValid;
  };

  const reset = () => {
    setFirstName("");
    setEmail("");
    setIsChecked(false);
    setErrors({})
  }

  const registerform = async (event) => {
    event.preventDefault();
    if (validate()) {
      await klaviyoservice.createProfile({ email, firstName });
      setKlaviyoEmail(email);
      toast.success(service.profileCreated, { autoClose: toastTimer });
      reset();
    }
  }


  return (
    <div className={registerStyles.registerBox}>
      <div className={registerStyles.gridContainer}>
        <div className={registerStyles.registerWrapper}>
          <Image
            className={registerStyles.desktopimg}
            src="/Images/newsletterphoto.jpg"
            alt="rimage"
            media="(min-width: 640px)"
            fill
          />
          <Image
            className={registerStyles.responsiveimg}
            src="/Images/newsletterphoto.jpg"
            alt="Harvesting Image"
            media="(max-width: 639px)"
            fill

          />
          <div className={registerStyles.innerWrapper}>
            <h2 className={`W-H2 ${registerStyles.heading}`}>{hpt.subscribeNewsletter}</h2>
            <p className={registerStyles.text}>{hpt.getNotified}</p>
            <form className={registerStyles.formWrapper}>
              <div className={registerStyles.formControlBox}>
                <div>
                  <label className={registerStyles.formLabel}>{cmt.firstName}</label>
                  <input
                    type="text"
                    className={registerStyles.textField}
                    name="text"
                    placeholder={cmt.firstName}
                    value={firstName}
                    onInput={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <span className={registerStyles.errorMessage}>
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div>
                  <label className={registerStyles.formLabel}>{hpt.email}</label>
                  <input
                    type="email"
                    className={registerStyles.textField}
                    name="email"
                    placeholder={hpt.email}
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className={registerStyles.errorMessage}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <button className={registerStyles.registerButton} type="submit" onClick={registerform}>
                  {hpt.register}
                </button>

              </div>
              <div className={registerStyles.checkboxContainer}>
                <input
                  type="checkbox"
                  className={registerStyles.checkbox}
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  id="terms"
                />
                <label htmlFor="terms" className={registerStyles.checkboxLabel}>
                  {hpt.iAgree}
                </label>

              </div>
              {errors.isChecked && (
                <span className={registerStyles.errorMessage}>
                  {errors.isChecked}
                </span>
              )}
            </form>
          </div>
        </div>
        {/* <div className={registerStyles.gridItem}>
          <div className={registerStyles.contactWrapper}>
            <h1 className={`W-H3 ${registerStyles.contactHead}`}>{hpt.contactUs}</h1>
            <ul className={registerStyles.contactList}>
              <li className={registerStyles.numberInfo}>
                <div>
                  <h3 className={`W-H3 ${registerStyles.phoneNumber}`}>
                    <Link href="tel:+53790707">{hpt.phoneNo}</Link>
                  </h3>
                  <p>{hpt.mondayFriday}</p>
                  <p>{hpt.saturday0915}</p>
                  <p>{hpt.sundayClosed}</p>
                </div>
              </li>
              <li className={registerStyles.emailInfo}>
                <div>
                  <h3 className={`W-H3 ${registerStyles.email}`}>
                    <Link href="mailto:info@fresh.land.com">{hpt.infoEmail}</Link></h3>
                  <p>{hpt.weEndeavor}</p>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
