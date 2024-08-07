import React, { useState } from "react";
import styles from "./managecookies.module.css";
import Link from "next/link";
import { commonTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const ManageCookies = () => {
  const cmt = commonTranslation[lang];
 const [showsetting , setShowSetting] = useState(false);
  const accordionData = [
    {
      title: "Functional",
      content: `The technical storage or access is absolutely necessary for the legitimate purpose of enabling the use of a specific service that the subscriber or user has expressly requested, or solely for the purpose of carrying out the transmission of a communication over an electronic communication network`,
    },
    {
      title: "Settings",
      content: `Technical storage or access is necessary for a lawful purpose to store settings that have not been requested by the subscriber or user.`,
    },
    {
      title: "Statistics",
      content: `The technical storage or access used exclusively for anonymous statistical purposes. Absent a subpoena, voluntary compliance by your ISP, or additional records from a third party, information stored or retrieved only for this purpose typically cannot be used to identify you.`,
    },
    {
      title: "Marketing",
      content: `The technical storage or access is required to create user profiles to send advertisements or to track the user on a website or across multiple websites for similar marketing purposes.`,
    },
  ];

  const [openAccordionIndex, setOpenAccordionIndex] = useState();

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? -1 : index);
  };
  const toggleSettings = () => {
    setShowSetting(!showsetting);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <p className={styles.manageCookies}>{cmt.manageconsent}</p>
        <div className={styles.scrollConatiner}>
          <div>
            <p className={styles.provide}>
              {cmt.toProvide}
            </p>
          </div>
          {showsetting && (
          <div className={styles.saveSetting}>
            {accordionData.map((item, index) => (
              <div key={index} className={styles.container}>
                <button
                  className={`W-Body-Large-Regular ${styles.accordion}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                  <div>
                      {index === 0 ? (
                        <span className={styles.alwaysActive}>{cmt.alwaysActive}</span>
                      ) : (
                        <label className={styles.switch}>
                          <input type="checkbox" />
                          <span
                            className={`${styles.slider} ${styles.round}`}
                          ></span>
                        </label>
                      )}
                      <i
                        className={`fa-solid ${
                          openAccordionIndex === index
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        }`}
                      ></i>
                    </div>
                </button>
                {openAccordionIndex === index && (
                  <div>
                    <p className={`W-Body-Regular ${styles.content}`}>
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          )}

        </div>
        <div className={styles.settingbtn}>
          <button>{cmt.Accept}</button>
          <button className={styles.refuse}>{cmt.refuse}</button>
          <button onClick={toggleSettings} className={styles.refuse}>{cmt.saveSetting}</button>
        </div>
        <Link href="#">{cmt.personalData}</Link>
      </div>
    </>
  );
};
export default ManageCookies;
