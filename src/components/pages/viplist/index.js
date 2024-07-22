import React from "react";
import Header from "@/components/atoms/Header/Header";
import style from "./viplist.module.css";
import Image from "next/image";
import Link from "next/link";
import Telephone from "@/components/atoms/phonenumber/";

const Vip = ({ vipPageData }) => {
  const { content = "", featured_image = "" } = vipPageData || {};
  return (
    <>
      <main>
        <Header />
        <div className={style.heading}>
          <h1>Orange VIP list</h1>
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
                  <p>Sign up for the VIP list</p>
                  <p>
                    By signing up to our VIP list, you get access to the first
                    harvest a day before everyone else - so you can order with
                    peace of mind.
                  </p>
                </div>
                <div className={style.productimg}>
                  <Image
                    src={featured_image}
                    alt="viporange"
                    width={250}
                    height={250}
                  />
                </div>
              </div>
              <div className={style.formFeild}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    className={style.inputField}
                    type="text"
                    placeholder="Your Name"
                    name="name"
                  />
                </div>
                <div>
                  <label htmlFor="email">E-mailE-post</label>
                  <input
                    className={style.inputField}
                    type="text"
                    placeholder="Your e-mail"
                    name="email"
                  />
                </div>
                <div>
                  <label>Phone number</label>
                  <Telephone />
                </div>
              </div>
              <div>
                <p className={style.msgInfo}>
                  I would like to receive emails and SMS/calls from Fresh.land
                  with marketing about Fresh.land and their{" "}
                  <Link href="#">product offerings</Link> , events, contests and
                  their{" "}
                  <Link href="#">
                    Less Waste Friendships initiative with partners
                  </Link>{" "}
                  . I accept that my data is processed for this purpose.
                </p>
              </div>
              <p className={style.msgInfo}>
                You can always withdraw your consent, see how to do it{" "}
                <Link href="#">here</Link>. You can read in our
                <Link href="#"> privacy policy </Link> how we process
                information about you.
              </p>
              <div>
                <button className={style.submit}>Submit</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Vip;
