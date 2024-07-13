import registerStyles from "./RegisterUser.module.css";
import Link from "next/link";
import Image from 'next/image';
import { useState } from "react";
import { homepageTranslation } from '@/locales';
import { commonTranslation } from '@/locales';
import klaviyoservice from '@/services/klaviyo'
import { toast } from 'react-toastify';

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const Register = () => {
  const cmt = commonTranslation[lang];
  const hpt = homepageTranslation[lang];
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    // return true;
    const errors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
    // Add more validation rules for other fields if needed

    setErrors(errors);
    return isValid;
  };

  const registerform = async (event) => {
    event.preventDefault();
    validate();
    await klaviyoservice.createProfile(email, firstName);
    toast.success("Your profile is created.", { autoClose: toastTimer });
  }


  return (
    <div className={registerStyles.registerBox}>
      <div className={registerStyles.gridContainer}>
        <div className={registerStyles.registerWrapper}>
          <Image
            src="/Images/rimage.png"
            alt="rimage"
            width={573}
            height={811}
            className={registerStyles.imgWrapper}
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
                    placeholder="Harsh"
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
                    placeholder="harshrathi@gmail.com"
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
                <div className={registerStyles.checkboxContainer}>
                  <input
                    type="checkbox"
                    className={registerStyles.checkbox}
                    id="terms"
                  />
                  <label htmlFor="terms" className={registerStyles.checkboxLabel}>
                    {hpt.iAgree}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={registerStyles.gridItem}>
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
        </div>
      </div>
    </div>
  );
};

export default Register;
