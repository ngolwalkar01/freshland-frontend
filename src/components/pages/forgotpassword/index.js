import React, { useState } from "react";
import Header from "@/components/atoms/Header/Header";
import style from "./forgot.module.css";
import AccountAPI from "@/services/account";
import toast from "@/helper/toast";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

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
        toast.success("Reset password link has been sent to your email account.")
        setEmail("");
      } catch (error) {
        toast.error(error?.data?.message ? error?.data?.message : "Something went wrong!")
      }
    }
  }

  return (
    <>
      <main>
        <Header />
        <div className={style.forgotPassword}>
          <p>
            Lost your password? Please enter your username or email address. You
            will receive a link via e-mail to create a new password.
            forgot
          </p>
          <form>
            <label htmlFor="userlogin">EMAIL
            </label>
            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); }} name="userlogin" id="userlogin" className={style.inputFeild} />
            {errors?.email && <div style={{ color: 'red' }}>{errors?.email}</div>}
          </form>
          <button onClick={forgotPassword} className={style.forgotBtn}>Reset Password</button>
        </div>
      </main>
    </>
  );
};

export default Forgot;
