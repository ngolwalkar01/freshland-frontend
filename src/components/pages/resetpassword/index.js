"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/atoms/Header/Header";
import style from "./reset.module.css";
import AccountAPI from "@/services/account";
import toast from "@/helper/toast";
import { useSearchParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout';
import { serviceTranslation, myaccountTranslation, errorTranslation } from '@/locales';
import { getStrongPasswordRegex } from "@/helper";
import { applyLoader } from "@/helper/loader";
import OverLayLoader from '@/components/atoms/overLayLoader';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const Reset = () => {
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const login = searchParams.get('login');
  const [routeData, setRouteData] = useState(null);
  const service = serviceTranslation[lang];
  const errormsg = errorTranslation[lang];
  const [olloading, setOlloading] = useState(false);
  useEffect(() => {
    if (!key || !login) {
      router.push('/');
    } else {
      setRouteData({ key, login });
    }
    setloading(false);
  }, [key, login, router]);


  const [currentpasswordData, setCurrentPasswordData] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [confirmPasswordData, setConfirmPasswordData] = useState("");
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIssubmit] = useState(false);

  const handleCurrentPassword = (e) => {
    setCurrentPasswordData(e.target.value);
  };
  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleConfirmInput = (e) => {
    setConfirmPasswordData(e.target.value);
  };
  const confirmShowPassowrd = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentpasswordData, showCurrentPassword, confirmPasswordData, showConfirmPassword])

  const resetData = () => {
    setCurrentPasswordData("");
    setShowCurrentPassword(false);
    setConfirmPasswordData("");
    setConfirmPassword(false);
    setErrors({});
    setIssubmit(false);
  }

  const validate = () => {
    const errors = {};
    let isValid = true;
    const strongPasswordRegex = getStrongPasswordRegex();
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]{8,}$/;

    if (!(currentpasswordData && currentpasswordData.trim())) {
      errors.currentpasswordData = errormsg.passwordRequired;
      isValid = false;
    } else if (!strongPasswordRegex.test(currentpasswordData)) {
      errors.currentpasswordData = errormsg.passwordMinLength;
      isValid = false;
    }
    if (!(confirmPasswordData && confirmPasswordData.trim())) {
      errors.confirmPasswordData = errormsg.confirmPasswordRequired;
      isValid = false;
    }
    if (currentpasswordData && confirmPasswordData && currentpasswordData !== confirmPasswordData) {
      errors.confirmPasswordData = errormsg.passwordsMustMatch;
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const resetPass = async () => {
    try {
      const { key, login } = routeData;
      const obj = {
        "key": key,
        "login": login,
        "password": currentpasswordData,
        "confirm_password": confirmPasswordData
      }
      await AccountAPI.resetPassword(obj);
      toast.success(errormsg.resetPasswordmsg)
	  router.push("/login");
      resetData();
    } catch (error) {
      toast.error(error?.data?.message ? error?.data?.message : service.somethingWentWrong)
    }
  }

  const resetPassword = async () => {
    setIssubmit(true);
    if (validate()) {
      await applyLoader(
        setOlloading,
        resetPass,
        []
      )
    }
  }

  return (
    <Layout>
      {loading ? <></> : (
        <main>
          {olloading && <OverLayLoader />}
          <Header />
          <div className={style.resetPassword}>
            <p>{errormsg.enterNewPassword}</p>
            <form className={style.formConatainer}>
              <div>
                <label htmlFor="NewPassword">{errormsg.newPassword}</label>
                <div className={style.inputConatiner}>
                  <input
                    value={currentpasswordData}
                    onChange={handleCurrentPassword}
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    className={style.inputFeild}
                  />
                  <span
                    className={style.showPasswordButton}
                    onClick={handleShowCurrentPassword}
                    type="button"
                  >
                    <i
                      className={`fa-regular ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                    />
                  </span>
                  {isSubmit && errors?.currentpasswordData && <div className={style.errorClass}>{errors?.currentpasswordData}</div>}
                </div>
              </div>
              <div className={style.inputConatiner}>
                <label htmlFor="ConfirmPassword">{errormsg.confirmNewPassword}</label>
                <input
                  value={confirmPasswordData}
                  onChange={handleConfirmInput}
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={style.inputFeild}
                />
                <span
                  className={style.showPasswordButton}
                  onClick={confirmShowPassowrd}
                  type="button"
                >
                  <i
                    className={`fa-regular ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                  />
                </span>
                {isSubmit && errors?.confirmPasswordData && <div className={style.errorClass}>{errors?.confirmPasswordData}</div>}
              </div>
            </form>
            <button onClick={resetPassword} className={style.btnSave}>{errormsg.save}</button>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Reset;
