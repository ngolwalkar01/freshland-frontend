import React, { useEffect, useState } from "react";
import Header from "@/components/atoms/Header/Header";
import style from "./viplist.module.css";
import Image from "next/image";
import Link from "next/link";
import Telephone from "@/components/atoms/Telephone/Telephone";
import klaviyoService from '@/services/klaviyo/apiIndex';
import toast from "@/helper/toast";
import { commonTranslation, serviceTranslation, errorTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Vip = ({ vipPageData }) => {
  const cmt = commonTranslation[lang];
  const service = serviceTranslation[lang];
  const errormsg = errorTranslation[lang];
  const [vipData, setVipData] = useState(null);
  const [errors, setErrors] = useState({});

  const { title, content = "", featured_image = "", klaviyo_list_id: list_id } = vipPageData || {};

  useEffect(() => {
    if (list_id) {
      onUpdateVipData({ target: { value: list_id } }, 'list_id');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list_id])

  const onUpdateVipData = (e, column) => {
    const newVipData = vipData ? { ...vipData } : {};
    newVipData[column] = e.target.value;
    setVipData(newVipData);
  }

  const resetForm = () => {
    setErrors({});
    setVipData({ phone_number: "46" });
  }

  const validate = () => {
    const errors = {};
    let isValid = true;
    const { name, email, phone_number } = vipData || {};

    if (!(name && name.trim())) {
      errors.name = errormsg.firstNameRequired;
      isValid = false;
    }

    if (!(email && email.trim())) {
      errors.email = errormsg.emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = errormsg.emailInvalid;
      isValid = false;
    }

    if (!(phone_number && phone_number.trim())) {
      errors.phone_number = errormsg.phoneNumberRequired;
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  const addPlusPrefix = (number) => {
    if (number && number[0] !== '+') {
      return '+' + number;
    }
    return number;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const obj = { ...vipData, phone_number: addPlusPrefix(vipData.phone_number) }
        const data = await klaviyoService.linkProfileToList(obj);
        resetForm();
        toast.success(service.profileLinkedToList);
      } catch (error) {
        toast.error((error?.data?.message ? error.data.message : (errorMessage ? errorMessage : service.somethingWentWrong)));
      }
    }
  }

  return (
    <>
      <main>
        <Header />
        <div className={style.vipmain}>
          <div className={style.heading}>
            <h1>{title}</h1>
          </div>
          <section className={style.viplistConatiner}>
            <div>
              <form className={style.container}>
                <div className={style.juicy} dangerouslySetInnerHTML={{ __html: content }} ></div>
                {/* <div className={style.juicy}>
                <h4>Sweet and juicy citrus fruits! </h4>
                <p>
                  Sun-ripened oranges 🍊 clementines, grapefruits and other
                  citrus fruits 🍋 fresh from the tree, are simply the best. It
                  was citrus fruits, more specifically oranges, that marked the
                  beginning of Fresh.Land when, a few years ago, we helped
                  Arthur sell his delicious oranges.
                </p>
                <p>
                  Today Arthur has retired, but fortunately we have many other
                  passionate farmers around Spain and Portugal whose products we
                  can enjoy.
                </p>
                <p>
                  The citrus fruits will be available both in individual boxes
                  and in some of our mixed boxes.
                </p>
                <p>
                  We expect the citrus season to start around October or
                  November, but of course it depends on the weather.
                </p>
              </div> */}
                <div className={style.juicy}>
                  <div className={style.signUpvip}>
                    <p>{cmt.signUpVIP}</p>
                    <p>
                     {cmt.vipDescription}
                    </p>
                  </div>
                  <div className={style.productimg}>
                    {featured_image ? <Image
                      src={featured_image}
                      alt="viporange"
                      width={250}
                      height={250}
                    /> : null}
                  </div>
                </div>
                <div className={style.formFeild}>
                  <div>
                    <label htmlFor="name">{cmt.firstName}</label>
                    <input
                      className={style.inputField}
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={vipData?.name ? vipData.name : ""}
                      onChange={(e) => { onUpdateVipData(e, 'name'); }}
                    />
                    {errors?.name && (
                      <span className={style.errorMessage}>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">{cmt.email}</label>
                    <input
                      className={style.inputField}
                      type="text"
                      placeholder="Your e-mail"
                      name="email"
                      value={vipData?.email ? vipData.email : ""}
                      onChange={(e) => { onUpdateVipData(e, 'email'); }}
                    />
                    {errors?.email && (
                      <span className={style.errorMessage}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label>Phone number</label>
                    <Telephone
                      value={vipData?.phone_number ? vipData.phone_number : ""}
                      onChange={(e) => { onUpdateVipData({ target: { value: e } }, 'phone_number'); }}
                    />
                    {errors?.phone_number && (
                      <span className={style.errorMessage}>
                        {errors.phone_number}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className={style.msgInfo}>
                  {cmt.marketingConsent}{" "}
                    <Link href="#">{cmt.productoffer}</Link>,{cmt.event} 
                    {" "}
                    <Link href="#">
                      {cmt.lessWaste}
                    </Link>{" "}
                    . {cmt.acceptDataProcessing}.
                  </p>
                </div>
                <p className={style.msgInfo}>
                {cmt.withdrawConsent} <Link  href="#">{cmt.here}</Link> 
                 {cmt.privacyPolicyInfo} <Link href="#"> {cmt.privacypolicy} </Link>
                 {cmt.weProcess}
                  {/* <Link href="#">here</Link>. You can read in our
                  <Link href="#"> privacy policy </Link> how we process
                  information about you. */}
                </p>
                <div>
                  <button onClick={submit} className={style.submit}>Submit</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Vip;
