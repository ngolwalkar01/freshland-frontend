import React, { useState } from "react";
import Header from "@/components/atoms/Header/Header";
import style from "./forgot.module.css";
import AccountAPI from "@/services/account";
import toast from "@/helper/toast";
import { loginTranslation, serviceTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const log = loginTranslation[lang];
  const service = serviceTranslation[lang];

  const validate = () => {
    let isValid = true;
    const errors = {}
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  }
  const forgotPassword = async () => {
    if (validate()) {
      try {
        await AccountAPI.forgotPassword({ email });
        toast.success(service.resetPassword)
        setEmail("");
      } catch (error) {
        toast.error(error?.data?.message ? error?.data?.message : service.somethingWentWrong)
      }
    }
  }

  return (
    <>
      <main>
        <Header />
        <div className={style.forgotPassword}>
          <p>
           {log.lostPasswordPrompt}
          </p>
          <form>
            <label htmlFor="userlogin">{log.email}
            </label>
            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); }} name="userlogin" id="userlogin" className={style.inputFeild} />
            {errors?.email && <div style={{ color: 'red' }}>{errors?.email}</div>}
          </form>
          <button onClick={forgotPassword} className={style.forgotBtn}>{log.resetPassword}</button>
        </div>
      </main>
    </>
  );
};

export default Forgot;
