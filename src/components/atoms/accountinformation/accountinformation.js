import React, { useEffect, useState } from "react";
import styles from "./accountinformation.module.css";
import Link from "next/link";
import Image from "next/image";
import { myaccountTranslation } from "@/locales";
import AccountAPI from "@/services/account";
import { toast } from "react-toastify";
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

const lang = process.env.NEXT_PUBLIC_LANG || "dk";

function Accountinformation({ isUserLoggedIn }) {
  const token = isUserLoggedIn();
  const mat = myaccountTranslation[lang];

  const [passwordData, setPasswordData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordData, setConfirmPasswordData] = useState("");
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const [currentpasswordData, setCurrentPasswordData] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const [profile, setUserProfile] = useState();

  const handleInput = (e) => {
    setPasswordData(e.target.value);
  };

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmInput = (e) => {
    setConfirmPasswordData(e.target.value);
  };
  const confirmShowPassowrd = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  const handleCurrentPassword = (e) => {
    setCurrentPasswordData(e.target.value);
  };
  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const validate = () => {
    // return true;
    const errors = {};
    let isValid = true;
    const { first_name, last_name, email, display_name } = profile;
    if (!first_name.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    if (!last_name.trim()) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!display_name.trim()) {
      errors.displayName = "Display Name is required";
      isValid = false;
    }

    if (!passwordData.trim()) {
      errors.passwordData = "password is required";
      isValid = false;
    } else if (passwordData.length < 6) {
      errors.passwordData = "password should be at least 6 char";
      isValid = false;
    }

    if (!currentpasswordData.trim()) {
      errors.currentpasswordData = "current password is required";
      isValid = false;
    }

    if (confirmPasswordData !== passwordData) {
      errors.confirmPasswordData = "password not matched";
      isValid = false;
    }

    // Add more validation rules for other fields if needed

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setPasswordData("")
    setConfirmPasswordData("")
    setConfirmPassword("")
  }

  const submitform = async (event) => {
    event.preventDefault();
    if (validate()) {
      const { first_name, last_name, display_name } = profile
      const obj = {
        "customer_info": {
          first_name,
          last_name,
          display_name,
          "old_password": currentpasswordData,
          "new_password": passwordData,
          "confirm_password": confirmPasswordData
        }
      }
      const data = await AccountAPI.saveUpdateCustomerAddress(token, obj);
      resetForm();
      toast.success("Your account information is updated.", { autoClose: toastTimer });
    }
  };

  const updateUserProfile = (e, column) => {
    setUserProfile({ ...profile, [column]: e.target.value });
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const userData = await AccountAPI.getCustomerProfile(token);
      setUserProfile(userData);
    };

    getUserProfile();
  }, [token]);

  return (
    <>
      <section className={styles.accountinfo}>
        <form className={styles.formcheckout}>
          <div className={styles.wrapper}>
            <main className={styles.leftContainer}>
              <div className={styles.fieldsRow}>
                <div className={styles.fieldColumn}>
                  <label>{mat.firstName}</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={profile?.first_name}
                    placeholder="First Name"
                    onChange={(e) => updateUserProfile(e, "first_name")}
                  />
                  {errors?.firstName && (
                    <span className={styles.errorMessage}>
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className={styles.fieldColumn}>
                  <label>{mat.lastName}</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={profile?.last_name}
                    placeholder="Last Name"
                    onChange={(e) => updateUserProfile(e, "last_name")}
                  />
                  {errors?.lastName && (
                    <span className={styles.errorMessage}>
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.fieldsRow}>
                <div className={styles.saveColumn}>
                  <label>{mat.showName}</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={profile?.display_name}
                    onChange={(e) => updateUserProfile(e, "display_name")}
                  />
                  <p className={styles.reviews}>{mat.thisIsHowYour}</p>
                  {errors?.displayName && (
                    <span className={styles.errorMessage}>
                      {errors.displayName}
                    </span>
                  )}
                </div>
                <div className={styles.fieldColumn}>
                  <label>{mat.emailAddress}</label>
                  <input
                    className={styles.inputField}
                    type="email"
                    value={profile?.email}
                    placeholder="Email"
                    onChange={(e) => updateUserProfile(e, "email")}
                    disabled
                  />
                  {errors?.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                  )}
                </div>
              </div>
              <div className={styles.passwordchange}>
                <p className="M-Body-Medium">{mat.passwordChange}</p>
                <div className={styles.fieldColumn}>
                  <label>{mat.currentPassword}</label>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.inputField}
                      value={currentpasswordData}
                      onChange={handleCurrentPassword}
                      type={showCurrentPassword ? "text" : "password"}
                      required
                    />
                    <span
                      className={styles.showcurrentpasswordbtn}
                      onClick={handleShowCurrentPassword}
                      type="button"
                    >
                      <i
                        className={`fa-regular ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                      />
                    </span>
                  </div>
                  {errors?.currentpasswordData && (
                    <span className={styles.errorMessage}>
                      {errors.currentpasswordData}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.fieldsRow}>
                <div className={styles.fieldColumn}>
                  <label>{mat.newPassword}</label>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.inputField}
                      value={passwordData}
                      onChange={handleInput}
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <span
                      className={styles.showPasswordButton}
                      onClick={handleShowPassowrd}
                      type="button"
                    >
                      <i
                        className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                      />
                    </span>
                  </div>
                  {errors?.passwordData && (
                    <span className={styles.errorMessage}>
                      {errors.passwordData}
                    </span>
                  )}
                </div>
                <div className={styles.fieldColumn}>
                  <label>{mat.confirmNewPassword}</label>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.inputField}
                      value={confirmPasswordData}
                      onChange={handleConfirmInput}
                      type={showConfirmPassword ? "text" : "password"}
                      required
                    />
                    <span
                      className={styles.showPasswordButton}
                      onClick={confirmShowPassowrd}
                      type="button"
                    >
                      <i
                        className={`fa-regular ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                      />
                    </span>
                  </div>{" "}
                  {errors?.confirmPasswordData && (
                    <span className={styles.errorMessage}>
                      {errors.confirmPasswordData}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.fieldsRow}>
                <button type="submit" onClick={submitform}>
                  {mat.saveChanges}
                </button>
              </div>
            </main>
          </div>
        </form>
        {/* <hr></hr> */}
        {/* <div className={styles.loginaccount}>
          <p className="M-Body-Medium">{mat.socialLoginAccounts}</p>
          <p className="M-Body-Medium">
            {mat.yourAccountIsLinked}{" "}
            <span>
              <Link href="#">{mat.addMore}</Link>
            </span>
          </p>
        </div>
        <div className={styles.logininfo}>
          <div className={styles.logindetail}>
            <p className="M-Caption-Bold">{mat.provider}</p>
            <Image
              src="/Images/google.png"
              width={30}
              height={30}
              alt="google"
            ></Image>
          </div>
          <div className={styles.logindetail}>
            <p className="M-Caption-Bold">{mat.account}</p>
            <p className="M-Caption">harshrathi1@gmail.com</p>
          </div>
          <div className={styles.logindetail}>
            <p className="M-Caption-Bold">{mat.lastLogin}</p>
            <p className="M-Caption">06/03/2024 @ 11:20</p>
          </div>
          <div className={styles.unlinkbtn}>
            <Link href="#" className="M-Caption-Bold">
              {mat.unlink}
            </Link>
          </div>
        </div> */}
      </section>
    </>
  );
}

export default Accountinformation;
